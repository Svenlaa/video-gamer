import { createSSGHelpers } from '@trpc/react/ssg'
import Footer from '../components/footer'
import GameThumbnail from '../components/game/GameThumbnail'
import Header from '../components/header'
import Hero from '../components/Hero'
import { appRouter } from '../server/router'
import { trpc } from '../utils/trpc'
import { createContextInner } from '../server/router/context'
import superjson from 'superjson'
import Head from 'next/head'

const GamesPage = () => {
  const gameQuery = trpc.useQuery(['game.getAll'])

  if (!gameQuery.isSuccess) return <Header />

  const files = gameQuery.data.map((f) => f.slug)
  if (!files)
    return (
      <>
        <Hero img="/assets/pagebg.jpg">
          <h1 className="text-center text-5xl font-extrabold uppercase">
            Videogames
          </h1>
        </Hero>
        <p>No files</p>
        <Footer />
      </>
    )

  return (
    <>
      <Head>
        <title>Games | Videogamer</title>
      </Head>
      <Hero img="/assets/pagebg.jpg">
        <h1 className="text-center text-5xl font-extrabold uppercase">
          Videogames
        </h1>
      </Hero>
      <div className="container mx-auto px-4">
        <div className="grid grid-flow-row grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {gameQuery.data.map((game) => (
            <GameThumbnail game={game} key={game.id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps = async () => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson // optional - adds superjson serialization
  })

  await ssg.fetchQuery('game.getAll')

  return {
    props: {
      trpcState: ssg.dehydrate()
    }
  }
}

export default GamesPage

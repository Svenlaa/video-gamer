import { createSSGHelpers } from '@trpc/react/ssg'
import Footer from '../components/footer'
import GameThumbnail from '../components/game/GameThumbnail'
import Header from '../components/header'
import Hero from '../components/Hero'
import { appRouter } from '../server/router'
import { trpc } from '../utils/trpc'
import { createContextInner } from '../server/router/context'
import superjson from 'superjson'

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
      <Hero img="/assets/pagebg.jpg">
        <h1 className="text-center text-5xl font-extrabold uppercase">
          Videogames
        </h1>
      </Hero>
      <div className="container mx-auto">
        <div className="grid grid-flow-row grid-cols-7 p-4">
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

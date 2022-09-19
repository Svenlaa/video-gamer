import { createSSGHelpers } from '@trpc/react/ssg'
import Footer from '../components/footer'
import GameThumbnail from '../components/game/GameThumbnail'
import Header from '../components/header'
import Hero from '../components/Hero'
import { appRouter } from '../server/router'
import { trpc } from '../utils/trpc'
import { createContextInner } from '../server/router/context'
import superjson from 'superjson'
import { useSession } from 'next-auth/react'

const GamesPage = () => {
  const { data: session } = useSession()
  const gameQuery = trpc.useQuery(['game.getAll'])

  if (!gameQuery.isSuccess) return <Header />

  const isAdmin = session?.user?.role.includes('admin')

  const games = gameQuery.data

  if (isAdmin && (!games.length || games[0]?.slug !== 'add'))
    //@ts-ignore
    games.unshift({
      coverImg: 'plus.png',
      id: 'add',
      slug: 'add',
      title: 'add'
    })

  if (!games)
    return (
      <>
        <Hero img="/assets/pagebg.jpg" title="Games | Videogamer">
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
      <Hero img="/assets/pagebg.jpg" title="Games | Videogamer">
        <h1 className="text-center text-5xl font-extrabold uppercase">
          Videogames
        </h1>
      </Hero>
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-flow-row grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {games.map((game) => (
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

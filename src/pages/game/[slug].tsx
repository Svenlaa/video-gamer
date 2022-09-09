import Footer from '../../components/footer'
import Hero from '../../components/Hero'
import Game from '../../components/sidebar/game'
import Card from '../../components/ui/Card'
import getImageUrl from '../../utils/getImageUrl'
import { trpc } from '../../utils/trpc'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { appRouter } from '../../server/router/index'
import { createContextInner } from '../../server/router/context'
import { prisma } from '../../server/db/client'
import Image from 'next/image'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'

const GamePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { slug } = props

  const gameQuery = trpc.useQuery(['game.getOne', slug])
  const recQuery = trpc.useQuery(['game.getRecent'])

  if (!gameQuery.isSuccess || !recQuery.isSuccess)
    return <Hero title={'Game | Videogamer'} />

  const { data: game } = gameQuery
  const { data: rec } = recQuery

  return (
    <>
      <Hero img="/assets/pagebg.jpg" title={`${game.title} | Videogamer`}>
        <h1 className="text-center text-5xl font-extrabold">{game.title}</h1>
      </Hero>
      <main className="container mx-auto flex flex-row gap-4">
        <div className="flex w-3/4 flex-col">
          <Card bgColor="white ">
            <div className="flew-row relative mx-auto flex aspect-game w-60">
              <Image
                src={getImageUrl(game.coverImg)}
                alt={game.title + ' cover'}
                layout="fill"
              />
            </div>
          </Card>
        </div>
        <div className="w-1/4">
          <div>
            <h2 className="mb-2 text-xl font-semibold uppercase">
              Recent Releases
            </h2>
            <ul>
              {rec.map((g) => (
                <Game
                  key={g.id}
                  title={g.title}
                  slug={g.slug}
                  imgUrl={g.coverImg}
                  releaseDate={g.releaseDate.toLocaleDateString()}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson // optional - adds superjson serialization
  })

  const slug = context.params?.slug as string

  await ssg.prefetchQuery('game.getOne', slug)
  await ssg.prefetchQuery('game.getRecent')

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const games = await prisma.game.findMany({
    select: {
      slug: true
    }
  })
  return {
    paths: games.map((game) => ({
      params: {
        slug: game.slug
      }
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: 'blocking'
  }
}

export default GamePage

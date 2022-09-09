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
import { FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
// @ts-ignore
import StarRatingComponent from 'react-star-rating-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVimeoV } from '@fortawesome/free-brands-svg-icons'
import SubmitBtn from '../../components/form/submit'

const GamePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { slug } = props

  const [message, setMessage] = useState('')
  const [stars, setStars] = useState(0)

  const gameQuery = trpc.useQuery(['game.getOne', slug])
  const recQuery = trpc.useQuery(['game.getRecent'])
  const session = useSession()
  const user = session.data?.user

  if (!gameQuery.isSuccess || !recQuery.isSuccess)
    return <Hero title={'Game | Videogamer'} />

  const { data: game } = gameQuery
  const { data: rec } = recQuery

  const onForm = (e: FormEvent) => {
    e.preventDefault()
    if (!stars || !message) return
    console.log(stars, message)
  }

  return (
    <>
      <Hero img="/assets/pagebg.jpg" title={`${game.title} | Videogamer`}>
        <h1 className="text-center text-5xl font-extrabold">{game.title}</h1>
      </Hero>
      <main className="container mx-auto flex flex-row gap-4">
        <div className="flex w-3/4 flex-col gap-4">
          <Card bgColor="white ">
            <div className="flew-row relative mx-auto flex aspect-game w-60">
              <Image
                src={getImageUrl(game.coverImg)}
                alt={game.title + ' cover'}
                layout="fill"
              />
            </div>
          </Card>
          <Card bgColor="ocean">
            <ul></ul>
            {user && (
              <div>
                <h3 className="text-lg font-bold uppercase">Add a review</h3>
                <form onSubmit={onForm}>
                  <div className="py-2">
                    Your rating:
                    <StarRatingComponent
                      className="mx-2 align-middle text-2xl leading-none text-white"
                      value={stars}
                      renderStarIcon={() => <FontAwesomeIcon icon={faVimeoV} />}
                      emptyStarColor="lightgray"
                      onStarClick={(e: any) => setStars(e.nextvalue)}
                    />
                  </div>
                  <textarea
                    className="w-full rounded-sm bg-white/10 p-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your review"
                    rows={5}
                  />
                  <SubmitBtn text="sumbit now" />
                </form>
              </div>
            )}
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

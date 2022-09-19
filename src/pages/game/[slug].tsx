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
import { faStar } from '@fortawesome/free-solid-svg-icons'
import SubmitBtn from '../../components/form/submit'
import Review from '../../components/game/Review'
import Sidebar from '../../components/sidebar/Sidebar'

const GamePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { slug } = props
  const session = useSession()
  const user = session.data?.user

  const [message, setMessage] = useState('')
  const [stars, setStars] = useState(0)

  const utils = trpc.useContext()

  const gameQuery = trpc.useQuery(['game.getOne', slug])
  const getReviewsQuery = trpc.useQuery(['review.getForGame', slug])
  const mutateReview = trpc.useMutation(['review.create'])
  const userReviewQuery = trpc.useQuery([
    'review.getSpecificReview',
    { gameSlug: slug }
  ])

  if (!gameQuery.isSuccess || !getReviewsQuery.isSuccess)
    return <Hero title={'Game | Videogamer'} />

  const { data: game } = gameQuery
  const { data: reviews } = getReviewsQuery
  const { data: userReview } = user ? userReviewQuery : { data: null }

  const onForm = (e: FormEvent) => {
    e.preventDefault()
    if (!stars || !message || !user?.name) return

    mutateReview.mutate(
      { gameSlug: slug, message, stars, username: user.name },
      {
        onSuccess(input) {
          utils.invalidateQueries(['review.getForGame'])
          utils.invalidateQueries([
            'review.getSpecificReview',
            { gameSlug: input.gameSlug, username: input.authorName }
          ])
        }
      }
    )
    setStars(0)
    setMessage('')
  }

  const mutateDelete = trpc.useMutation('review.deleteReview')

  const onDelete = (id: string) => {
    mutateDelete.mutate(
      { id },
      {
        onSuccess(input) {
          utils.invalidateQueries(['review.getForGame'])
          utils.invalidateQueries([
            'review.getSpecificReview',
            { gameSlug: input.gameSlug, username: input.authorName }
          ])
        }
      }
    )
  }

  return (
    <>
      <Hero img="/assets/pagebg.jpg" title={`${game.title} | Videogamer`}>
        <h1 className="text-center text-5xl font-extrabold">{game.title}</h1>
      </Hero>
      <main className="container mx-auto flex h-full flex-row gap-4">
        <div className="mb-4 flex w-full flex-col gap-4 pt-20 md:w-3/4">
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
            {user && !userReview && (
              <div>
                <h3 className="text-lg font-bold uppercase">Add a review</h3>
                <form onSubmit={onForm}>
                  <div className="py-2">
                    Your rating:
                    <StarRatingComponent
                      className="mx-2 align-middle text-2xl leading-none text-white"
                      value={stars}
                      name="star"
                      renderStarIcon={() => <FontAwesomeIcon icon={faStar} />}
                      emptyStarColor="lightgray"
                      onStarClick={(e: any) => {
                        setStars(e)
                      }}
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
            <ul className="flex flex-col gap-4">
              {userReview && (
                <Review
                  key={userReview.id}
                  review={userReview}
                  your
                  onDelete={onDelete}
                />
              )}
              {reviews?.map(
                // Displays all reviews for this game, EXCEPT yours
                (review) =>
                  review.authorName !== user?.name && (
                    <Review key={review.id} review={review} your={false} />
                  )
              )}
            </ul>
          </Card>
        </div>
        <Sidebar />
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
  await ssg.prefetchQuery('review.getForGame', slug)
  await ssg.prefetchQuery('game.getRecent') // used in Sidebar
  await ssg.prefetchQuery('category.getAll') // used in Sidebar

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug
    },
    revalidate: 60
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

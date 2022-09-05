import Image from 'next/image'
import { useRouter } from 'next/router'
import Footer from '../../components/footer'
import Hero from '../../components/Hero'
import Game from '../../components/sidebar/game'
import Card from '../../components/ui/Card'
import getImageUrl from '../../utils/getImageUrl'
import { trpc } from '../../utils/trpc'

const GamePage = () => {
  const router = useRouter()
  const { id } = router.query
  const q = trpc.useQuery(['game.getOne', id as string], { enabled: !!id })
  const recQuery = trpc.useQuery(['game.getRecent'])
  if (!q.isSuccess || !q.data || !recQuery.isSuccess || !recQuery.data)
    return <Hero />
  const game = q.data
  const rec = recQuery.data
  console.log(rec)
  return (
    <>
      <Hero img="/assets/pagebg.jpg">
        <h1 className="text-center text-5xl font-extrabold">{game.title}</h1>
      </Hero>
      <main className="container mx-auto flex flex-row gap-4">
        <div className="flex w-3/4 flex-col">
          <Card bgColor="white ">
            <div className="flew-row relative mx-auto flex h-96 w-60">
              <Image
                src={getImageUrl(q.data.coverImg)}
                alt={q.data.title + ' cover'}
                layout="fill"
              />
            </div>
          </Card>
        </div>
        <div className="w-1/4 text-center">
          <div>
            <h2 className="text-lg font-semibold uppercase ">
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

export default GamePage

import Image from 'next/image'
import { useRouter } from 'next/router'
import Footer from '../../components/footer'
import Hero from '../../components/Hero'
import Card from '../../components/ui/Card'
import { gameRouter } from '../../server/router/game'
import getImageUrl from '../../utils/getImageUrl'
import { trpc } from '../../utils/trpc'

const GamePage = () => {
  const router = useRouter()
  const { id } = router.query
  const q = trpc.useQuery(['game.getOne', id as string], { enabled: !!id })
  if (!q.isSuccess || !q.data) return <Hero />
  const game = q.data
  return (
    <>
      <Hero img="/assets/pagebg.jpg">
        <h1 className="text-center text-5xl font-extrabold">{game.title}</h1>
      </Hero>
      <main className="container mx-auto flex flex-row gap-4">
        <div className="flex w-2/3 flex-col">
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
        <div className="w-1/3 text-center">
          This side bar should be implemented
        </div>
      </main>
      <Footer />
    </>
  )
}

export default GamePage

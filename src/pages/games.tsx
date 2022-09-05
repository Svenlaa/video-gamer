import Footer from '../components/footer'
import GameThumbnail from '../components/game/GameThumbnail'
import Header from '../components/header'
import Hero from '../components/Hero'
import { trpc } from '../utils/trpc'

const GamesPage = () => {
  const q = trpc.useQuery(['file.listObjects', { Bucket: 'videogamer-2' }])
  const gameQuery = trpc.useQuery(['game.getAll'])
  const mutation = trpc.useMutation(['game.create'])

  const go = () => {
    mutation.mutate({
      title: 'Mario Kart 8 Deluxe',
      coverImg: 'MK8.jpg',
      slug: 'mario_kart_8_deluxe'
    })
  }

  if (!gameQuery.isSuccess || !q.isSuccess) return <Header />
  console.log(gameQuery.data)
  const files = q.data.Contents?.map((f) => f.Key) as []
  console.log(files)
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
        <button onClick={go}>GO</button>
      </div>
      <Footer />
    </>
  )
}

export default GamesPage

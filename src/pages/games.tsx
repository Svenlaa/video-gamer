import Footer from '../components/footer'
import GameThumbnail from '../components/game/GameThumbnail'
import Header from '../components/header'
import Hero from '../components/Hero'
import { trpc } from '../utils/trpc'

const GamesPage = () => {
  const q = trpc.useQuery(['file.listObjects', { Bucket: 'videogamer-2' }])
  if (!q.isSuccess) return <Header />
  const files = q.data.Contents?.map((f) => f.Key) as []
  if (!files)
    return (
      <>
        <Hero />
        <p>No files</p>
        <Footer />
      </>
    )

  return (
    <>
      <Hero />
      <div className="container mx-auto">
        <div className="grid grid-flow-row grid-cols-7 p-4">
          {files.map((f: string) => (
            <GameThumbnail
              src={`http://localhost:9000/videogamer-2/${f}`}
              key={f}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default GamesPage

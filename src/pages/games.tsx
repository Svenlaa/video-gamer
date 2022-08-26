import Image from 'next/image'
import Footer from '../components/footer'
import Header from '../components/header'
import { trpc } from '../utils/trpc'

const GamesPage = () => {
  const q = trpc.useQuery(['file.listObjects', { Bucket: 'videogamer-2' }])
  if (!q.isSuccess) return <Header />
  const files = q.data.Contents?.map((f) => f.Key) as []
  if (!files)
    return (
      <>
        <Header />
        <p>No files</p>
        <Footer />
      </>
    )

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-flow-row grid-cols-7 p-4">
          {files.map((f: string) => (
            <div>
              <Image
                src={`http://localhost:9000/videogamer-2/${f}`}
                width="200"
                height="323.25"
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default GamesPage

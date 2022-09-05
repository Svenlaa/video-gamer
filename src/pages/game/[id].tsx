import { useRouter } from 'next/router'
import Footer from '../../components/footer'
import Hero from '../../components/Hero'
import { trpc } from '../../utils/trpc'

const GamePage = () => {
  const router = useRouter()
  const { id } = router.query
  const q = trpc.useQuery(['game.getOne', id as string], { enabled: !!id })
  if (!q.isSuccess || !q.data) return <Hero />
  return (
    <>
      <Hero />
      <div className=" container mx-auto">
        <span>title: {q.data.title}</span>
        <br />
        <span>id: {q.data.id}</span>
        <br />
        <span>coverImg: {q.data.coverImg}</span>
        <br />
        <span>slug: {q.data.slug}</span>
        <br />
      </div>
      <Footer />
    </>
  )
}

export default GamePage

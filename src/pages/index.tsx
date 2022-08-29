import { NextPage } from 'next'
import Hero from '../components/Hero'

const HomePage: NextPage = () => {
  return (
    <>
      <Hero />
      <main className="container mx-auto">
        <h1>Homepage!</h1>
      </main>
    </>
  )
}

export default HomePage

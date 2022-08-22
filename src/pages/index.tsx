import { NextPage } from 'next'
import Header from '../components/header'

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <h1>Homepage!</h1>
      </main>
    </>
  )
}

export default HomePage

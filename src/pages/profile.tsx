import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Footer from '../components/footer'
import Hero from '../components/Hero'

const ProfilePage: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Hero title="Profile | Videogamer" />
      <div className="container mx-auto">
        {session && (
          <p>
            Welcome back{' '}
            <span className="text-green-500">{session.user?.name}</span>!
          </p>
        )}
        {!session && <p>Access Denied</p>}
      </div>
      <Footer />
    </>
  )
}
export default ProfilePage

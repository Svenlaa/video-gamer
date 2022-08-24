import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Header from '../components/header'

const ProfilePage: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Header />
      <div className="container mx-auto">
        {session && (
          <p>
            Welkom terug{' '}
            <span className="text-green-500">{session.user?.email}</span>!
          </p>
        )}
        {!session && <p>Access Denied</p>}
      </div>
    </>
  )
}
export default ProfilePage

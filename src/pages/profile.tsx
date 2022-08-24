import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Header from '../components/header'

const ProfilePage: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Header />
      <div className="container mx-auto">
        {session && (
          <p>
            Welcome back{' '}
            <span className="text-green-500">{session.user?.email}</span>!
          </p>
        )}
        {!session && <p>Access Denied</p>}
      </div>
    </>
  )
}
export default ProfilePage

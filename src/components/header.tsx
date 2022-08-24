import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const { status } = useSession()

  return (
    <header className="mb-4 backdrop-blur-md backdrop-brightness-90">
      <div className="container mx-auto h-20 px-4">
        <nav className="flex items-center justify-between text-xl">
          <Link href="/" passHref>
            <a className="p-2">
              <Image
                src="/logo.png"
                height={64}
                width={64}
                title="Go to homepage"
                alt="logo"
              />
            </a>
          </Link>
          <ul className="flex gap-4">
            <li>
              <Link href="/games" passHref>
                <a>GAMES</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>SVENLAA</a>
              </Link>
            </li>
            {status === 'unauthenticated' && (
              <li>
                <Link href="/login">
                  <a className="border-b-2 border-rose-500 bg-white p-2 text-rose-500">
                    👤 LOG IN
                  </a>
                </Link>
                <Link href="/register">
                  <a className="border-b-2 border-r-2 border-white bg-rose-500 p-2 text-white">
                    👥 REGISTER
                  </a>
                </Link>
              </li>
            )}
            {status === 'authenticated' && (
              <li>
                <Link href="/profile">
                  <a className="border-b-2 border-rose-500 bg-white p-2 text-rose-500">
                    👤 PROFILE
                  </a>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  type="button"
                >
                  <span className="border-b-2 border-r-2 border-white bg-rose-500 p-2 text-white">
                    🔓 LOG OUT
                  </span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

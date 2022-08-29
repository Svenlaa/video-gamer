import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const { status } = useSession()

  return (
    <header className="absolute z-20 w-full backdrop-blur-lg">
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
            {status === 'unauthenticated' && (
              <li>
                <Link href="/login">
                  <a className="border-b-2 border-ruby bg-white py-3 px-3 text-ruby">
                    👤&nbsp;LOG&nbsp;IN
                  </a>
                </Link>
                <Link href="/register">
                  <a className="border-b-2 border-r-2 border-white bg-ruby py-3 px-3 text-white">
                    👥&nbsp;REGISTER
                  </a>
                </Link>
              </li>
            )}
            {status === 'authenticated' && (
              <li>
                <Link href="/profile">
                  <a className="border-b-2 border-ruby bg-white py-3 px-3 text-ruby">
                    👤 PROFILE
                  </a>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  type="button"
                >
                  <span className="border-b-2 border-r-2 border-white bg-ruby py-3 px-3 text-white">
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

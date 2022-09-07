import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faFacebookSquare,
  faVimeoV
} from '@fortawesome/free-brands-svg-icons'
import {
  faUser,
  faUsers,
  faRss,
  faLocationDot,
  faPhone,
  faArrowRightFromBracket,
  faCircleUser
} from '@fortawesome/free-solid-svg-icons'

const HeaderLink = ({
  link,
  text,
  icon
}: {
  link: string
  text?: string
  icon?: JSX.Element
}) => {
  return (
    <li className="relative border-b-2 border-b-gray-500 p-2 pl-6 after:absolute after:-right-2.5 after:-top-0.5 after:h-[46px] after:w-0.5 after:rotate-[25deg] after:bg-gray-500">
      <Link href={link}>
        <a className="duration-200 hover:text-rose-500">
          {icon}
          {text}
        </a>
      </Link>
    </li>
  )
}

const Header = () => {
  const { status } = useSession()

  return (
    <header className="absolute z-20 -ml-1 w-full backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <ul className="mb-1.5 flex flex-row">
          <li className="relative border-b-2 border-b-gray-500 p-2 pr-6 before:absolute before:-top-0.5 before:-left-2.5 before:h-[46px] before:w-0.5 before:rotate-[-25deg] before:bg-gray-500">
            <FontAwesomeIcon icon={faPhone} className="inline h-4" />{' '}
            +31649120354
          </li>
          <li className="relative flex-grow border-b-2 border-b-gray-500 p-2 pr-6 before:absolute before:-top-0.5 before:-left-2.5 before:h-[46px] before:w-0.5 before:rotate-[-25deg] before:bg-gray-500">
            <FontAwesomeIcon icon={faLocationDot} className="inline h-4" />{' '}
            London, UK
          </li>
          <HeaderLink
            icon={<FontAwesomeIcon icon={faVimeoV} />}
            link="https://vimeo.com"
          />
          <HeaderLink
            icon={<FontAwesomeIcon icon={faTwitter} />}
            link="https://twitter.com"
          />
          <HeaderLink
            icon={<FontAwesomeIcon icon={faFacebookSquare} />}
            link="https://facebook.com"
          />
          <HeaderLink
            icon={<FontAwesomeIcon icon={faRss} />}
            link="https://rss.com"
          />
        </ul>
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
                  <a className="whitespace-nowrap border-b-2 border-ruby bg-white p-3 text-ruby">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> LOG IN
                  </a>
                </Link>
                <Link href="/register">
                  <a className="whitespace-nowrap border-b-2 border-r-2 border-white bg-ruby p-3 text-white">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="mr-1 inline h-4"
                    />{' '}
                    REGISTER
                  </a>
                </Link>
              </li>
            )}
            {status === 'authenticated' && (
              <li>
                <Link href="/profile">
                  <a className="whitespace-nowrap border-b-2 border-ruby bg-white p-3 text-ruby">
                    <FontAwesomeIcon icon={faCircleUser} className="mr-1 " />
                    PROFILE
                  </a>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  type="button"
                >
                  <span className="whitespace-nowrap border-b-2 border-r-2 border-white bg-ruby py-3 px-3 text-white">
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="mr-1 inline h-4"
                    />{' '}
                    LOG OUT
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

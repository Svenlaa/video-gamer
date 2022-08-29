import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const HeaderLink = ({
  link,
  text,
  icon,
  alt
}: {
  link: string
  text?: string
  icon?: string
  alt?: string
}) => {
  return (
    <li className="relative border-b-2 border-b-gray-500 p-2 pl-6 after:absolute after:-right-2.5 after:-top-0.5 after:h-[46px] after:w-0.5 after:rotate-[25deg] after:bg-gray-500">
      <Link href={link}>
        <a>
          {icon && <img src={icon} alt={alt} className="inline w-5 invert" />}
          {text && text}
        </a>
      </Link>
    </li>
  )
}

const Header = () => {
  const { status } = useSession()

  return (
    <header className="absolute z-20 w-full backdrop-blur-lg">
      <div className="container mx-auto h-fit px-4">
        <ul className="mb-1.5 flex flex-row">
          <li className="relative border-b-2 border-b-gray-500 p-2 pr-6 before:absolute before:-top-0.5 before:-left-2.5 before:h-[46px] before:w-0.5 before:rotate-[-25deg] before:bg-gray-500">
            <img
              src="/assets/streamline/phone-telephone.SVG"
              className="inline w-5 invert"
            />{' '}
            +31649120354
          </li>
          <li className="relative flex-grow border-b-2 border-b-gray-500 p-2 pr-6 before:absolute before:-top-0.5 before:-left-2.5 before:h-[46px] before:w-0.5 before:rotate-[-25deg] before:bg-gray-500">
            <img
              src="/assets/streamline/travel-map-location-pin.SVG"
              className="inline w-5 invert"
            />{' '}
            London, UK
          </li>
          <HeaderLink
            icon="/assets/streamline/computer-logo-twitter.SVG"
            link="https://twitter.com"
            alt="Twitter logo"
          />
          <HeaderLink
            icon="/assets/streamline/computer-logo-facebook.SVG"
            link="https://facebook.com"
            alt="Facebook logo"
          />
          <HeaderLink
            icon="/assets/streamline/programming-rss.SVG"
            link="https://rss.com"
            alt="RSS logo"
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
                  <a className="border-b-2 border-ruby bg-white p-3 text-ruby">
                    <img
                      src="/assets/streamline/interface-user-lock.SVG"
                      className="mr-2 ml-1 inline h-5"
                    />
                    LOG IN
                  </a>
                </Link>
                <Link href="/register">
                  <a className="border-b-2 border-r-2 border-white bg-ruby p-3 text-white">
                    <img
                      src="/assets/streamline/interface-user-multiple.SVG"
                      className="mr-2 ml-1 inline h-5 invert"
                    />
                    REGISTER
                  </a>
                </Link>
              </li>
            )}
            {status === 'authenticated' && (
              <li>
                <Link href="/profile">
                  <a className="whitespace-nowrap border-b-2 border-ruby bg-white p-3 text-ruby">
                    <img
                      src="/assets/streamline/interface-user-single.SVG"
                      className="mr-2 ml-1 inline h-5"
                    />
                    PROFILE
                  </a>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  type="button"
                >
                  <span className="whitespace-nowrap border-b-2 border-r-2 border-white bg-ruby py-3 px-3 text-white">
                    <img
                      src="/assets/streamline/interface-logout.SVG"
                      className="mr-2 ml-1 inline h-5 invert"
                    />
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

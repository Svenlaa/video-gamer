import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'
import Header from '../components/header'
import Card from '../components/ui/Card'

const LoginPage = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const rememberRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userRef.current || !passwordRef.current || !rememberRef.current) return
    if (!userRef.current.value || !passwordRef.current.value) return
    signIn('credentials', {
      email: userRef.current.value,
      password: passwordRef.current.value
    })
  }

  return (
    <>
      <Header />
      <main className="container mx-auto">
        <Card>
          <div className="mx-auto max-w-screen-sm rounded-md bg-indigo-900 p-12">
            <form onSubmit={handleSubmit} className="pb-2">
              <label htmlFor="email" className="block pb-2">
                Email
                <br />
                <input
                  className="w-full rounded bg-white/10 p-1 text-2xl text-white"
                  type="email"
                  id="email"
                  ref={userRef}
                  placeholder="Email"
                />
              </label>

              <label htmlFor="password" className="block pt-2">
                Password
                <br />
                <input
                  className="w-full rounded bg-white/10 p-1 text-2xl text-white"
                  type="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="Password"
                />
              </label>

              <div className="py-3">
                <label htmlFor="remember-me" className="text-white">
                  <input type="checkbox" id="remember-me" ref={rememberRef} />{' '}
                  Remember me
                </label>
                <Link href="/reset-password">
                  <a className="float-right text-rose-500">Reset Password</a>
                </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-300 p-4 text-rose-500 transition-colors duration-200 ease-in-out hover:bg-rose-500 hover:text-white"
              >
                Log In
              </button>
            </form>
            <Link href="/register">
              <a>
                Do not have an account yet?{' '}
                <span className="text-rose-500">Sign Up</span>
              </a>
            </Link>
            <br />
          </div>
        </Card>
      </main>
    </>
  )
}

export default LoginPage

import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../components/header'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter something')
      return
    }
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (res?.ok) router.push('/profile')
    if (res?.error) setError(res.error)
  }

  return (
    <>
      <Head>
        <title>Login | Videogamer</title>
      </Head>
      <Header />
      <main className="container mx-auto">
        {error && (
          <div className="mx-auto mb-6 max-w-screen-sm rounded-md bg-red-800 px-12 py-6 text-gray-200">
            {error}
          </div>
        )}
        <div className="mx-auto max-w-[545px] rounded-lg bg-primary py-[60px] px-20">
          <h3 className="mb-8 block text-center text-2xl font-bold">LOG IN</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              autoComplete="email"
              className="mb-4 w-full rounded bg-white/10 py-2 px-4 text-base leading-loose text-white"
              placeholder="User Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              autoComplete="password"
              className="mb-4 w-full rounded bg-white/10 py-2 px-4 text-base leading-loose text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-gray-300 p-4 text-rose-500 transition-colors duration-200 ease-in-out hover:bg-rose-500 hover:text-white"
            >
              Log In
            </button>
          </form>
          <div className="block w-full">
            <Link href="/register" className="w-full text-center">
              <a className="w-full text-center">
                Do not have an account yet?{' '}
                <span className="text-rose-500">Sign Up</span>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Footer from '../components/footer'
import Input from '../components/form/input'
import SubmitBtn from '../components/form/submit'
import Hero from '../components/Hero'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return setError('Please enter something')

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
      <Hero img="/assets/pagebg.jpg" title="Login | Videogamer">
        <h1 className="text-center text-5xl font-extrabold uppercase">
          Login for gaming
        </h1>
      </Hero>
      <main className="container mx-auto my-24">
        {error && (
          <div className="mx-auto mb-6 max-w-screen-sm rounded-md bg-red-800 px-12 py-6 text-gray-200">
            {error}
          </div>
        )}
        <div className="mx-auto max-w-[545px] rounded-lg bg-ocean py-[60px] px-20">
          <h3 className="mb-8 block text-center text-2xl font-bold">LOG IN</h3>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              required
              placeholder="User Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-3 flex flex-row justify-between">
              <label className="leading-4">
                <input type="checkbox" className="mr-2 h-4 w-4" /> Remember Me
              </label>
              <Link href="/reset-password">
                <a className="underline transition-all duration-200 ease-in hover:text-ruby">
                  Forgot Password?
                </a>
              </Link>
            </div>
            <SubmitBtn text="LOG IN" />
          </form>
          <span className="my-4 block w-full text-center">
            Do not have an account yet?
            <Link href="/register">
              <a className="ml-2 font-bold text-ruby">Sign Up</a>
            </Link>
          </span>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default LoginPage

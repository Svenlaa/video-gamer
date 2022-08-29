import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Footer from '../components/footer'
import Input from '../components/form/input'
import SubmitBtn from '../components/form/submit'
import Hero from '../components/Hero'
import { trpc } from '../utils/trpc'

const RegisterPage = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordi, setPasswordi] = useState('')

  const { mutate } = trpc.useMutation('auth.register')

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password || !email || !passwordi)
      return setErrorMsg('Please enter thanks')

    if (password !== passwordi)
      return setErrorMsg("Passwords ain't matching are they?")

    mutate(
      { email, password },
      {
        onSuccess: async () => {
          await signIn('credentials', {
            redirect: false,
            email,
            password
          })
          router.push('/profile')
        },
        onError(error) {
          setErrorMsg(error.message)
        }
      }
    )
  }

  return (
    <>
      <Head>
        <title>Register | Videogamer</title>
      </Head>
      <Hero img="/assets/pagebg.jpg">
        <h1 className="text-center text-5xl font-extrabold uppercase">
          Registration Page
        </h1>
      </Hero>
      <main className="container mx-auto my-24 px-4">
        {errorMsg && (
          <div className="mx-auto my-4 max-w-[545px] rounded-lg bg-red-800 py-6 px-20 text-gray-300">
            {errorMsg}
          </div>
        )}
        <div className="mx-auto max-w-[545px] rounded-lg bg-ocean py-[60px] px-20">
          <h3 className="mb-8 block text-center text-2xl font-bold">
            REGISTER
          </h3>
          <form onSubmit={handleRegister}>
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
            <Input
              type="password"
              required
              placeholder="Repeat Password"
              value={passwordi}
              onChange={(e) => setPasswordi(e.target.value)}
            />
            <SubmitBtn text="SIGN UP" />
          </form>
          <span className="my-4 block w-full text-center">
            Already have an account?
            <Link href="/login">
              <a className="ml-2 font-bold text-ruby">Log In</a>
            </Link>
          </span>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default RegisterPage

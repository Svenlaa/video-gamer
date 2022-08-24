import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Header from '../components/header'
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
        onSuccess: async (profile) => {
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
      <Header />
      <main className="container mx-auto px-4">
        {errorMsg && (
          <div className="mx-auto my-4 max-w-[545px] rounded-lg bg-red-800 py-6 px-20 text-gray-300">
            {errorMsg}
          </div>
        )}
        <div className="mx-auto max-w-[545px] rounded-lg bg-primary py-[60px] px-20">
          <h3 className="mb-8 block text-center text-2xl font-bold">
            REGISTER
          </h3>
          <form onSubmit={handleRegister}>
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
            <input
              type="password"
              required
              autoComplete="password"
              className="mb-4 w-full rounded bg-white/10 py-2 px-4 text-base leading-loose text-white"
              placeholder="Repeat Password"
              value={passwordi}
              onChange={(e) => setPasswordi(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-gray-300 p-4 text-rose-500 transition-colors duration-200 ease-in-out hover:bg-rose-500 hover:text-white"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default RegisterPage

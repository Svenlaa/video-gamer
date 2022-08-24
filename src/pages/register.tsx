import { signIn } from 'next-auth/react'
import { FormEvent, useRef, useState } from 'react'
import Header from '../components/header'
import { trpc } from '../utils/trpc'

const RegisterPage = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const { mutate } = trpc.useMutation('auth.register')

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!passwordRef.current?.value || !userRef.current?.value) return
    mutate(
      {
        email: userRef.current.value,
        password: passwordRef.current.value
      },
      {
        onSuccess: async (profile) => {
          await signIn('credentials', {
            email: profile.email,
            password: passwordRef.current.value
          })
        },
        onError(error) {
          setErrorMsg(error.message)
        }
      }
    )
  }

  return (
    <>
      <Header />
      <main className="container mx-auto">
        {errorMsg && <p>{errorMsg}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            required
            autoComplete="email"
            ref={userRef}
            className="text-black"
          />
          <input
            type="password"
            required
            autoComplete="password"
            ref={passwordRef}
            className="text-black"
          />
          <button type="submit">Sign up!</button>
        </form>
      </main>
    </>
  )
}

export default RegisterPage

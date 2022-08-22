import { getPrismaClient } from '@prisma/client/runtime'
import { getProviders, signIn } from 'next-auth/react'
import { FormEvent, useRef, useState } from 'react'
import Header from '../components/header'
import { trpc } from '../utils/trpc'

const RegisterPage = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { mutate } = trpc.useMutation('auth.register', {
    onSuccess: () => {
      console.log('AWESOME!!!')
    }
  })
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!passwordRef.current?.value || !userRef.current?.value) return
    mutate({
      email: userRef.current.value,
      password: passwordRef.current.value
    })
  }

  return (
    <>
      <Header />
      <main className="container mx-auto">
        <form onSubmit={handleRegister}>
          <input type="email" required autoComplete="email" ref={userRef} />
          <input
            type="password"
            required
            autoComplete="password"
            ref={passwordRef}
          />
          <button type="submit">Sign up!</button>
        </form>
      </main>
    </>
  )
}

export default RegisterPage

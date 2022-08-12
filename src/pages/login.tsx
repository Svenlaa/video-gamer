import { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const LoginPage: NextPage = () => {
  return <button onClick={() => signIn()}>Sign in!</button>
}

export default LoginPage

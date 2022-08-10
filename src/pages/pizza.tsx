import Head from 'next/head'
import { useState } from 'react'

const TestPage = () => {
  const [pizzaAmount, setPizzaAmount] = useState(0)

  return (
    <>
      <Head>
        <title>Pizza Clickers!</title>
      </Head>
      <p>Amount of Pizzas: {pizzaAmount}</p>
      <button onClick={() => setPizzaAmount(pizzaAmount + 1)}>
        Order a Pizza!
      </button>
    </>
  )
}

export default TestPage

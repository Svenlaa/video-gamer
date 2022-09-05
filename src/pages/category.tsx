import Header from '../components/header'
import { trpc } from '../utils/trpc'

const CategoryPage = () => {
  // !Page for demonstration purposes
  //var error: pizza = `-` //? Error to ensure deletion before prod
  const q = trpc.useQuery(['category.getAll'])
  const categoryQuery = trpc.useQuery(['category.getAll'])

  if (!categoryQuery.isSuccess) return <Header />
  return <p>{JSON.stringify(q.data)}</p>
}

export default CategoryPage

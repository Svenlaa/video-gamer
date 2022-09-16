import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Hero from '../../components/Hero'
import { trpc } from '../../utils/trpc'

const AddGamePage = () => {
  const router = useRouter()
  const addMutation = trpc.useQuery(['file.getSignedUrl'])
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/login')
    }
  })
  const isAdmin = session?.user?.role.includes('admin')

  const [file, setFile] = useState<any>()
  const onFileChange = (e: any) => {
    setFile(e.currentTarget.files?.[0])
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(file)
  }

  return (
    <>
      <Hero title="Add game | Videogamer" />
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            onChange={onFileChange}
            accept="image/png, image/jpeg"
            multiple={false}
          />
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  )
}

export default AddGamePage

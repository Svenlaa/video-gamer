import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import ErrorModal from '../../components/form/errormodal'
import Input from '../../components/form/input'
import SubmitBtn from '../../components/form/submit'
import Hero from '../../components/Hero'
import { trpc } from '../../utils/trpc'

const AddGamePage = () => {
  const router = useRouter()
  const [file, setFile] = useState<any>()
  const [categoryName, setCategoryName] = useState('')
  const [title, setTitle] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [error, setError] = useState('')
  const { mutateAsync: createSigned } = trpc.useMutation('game.create')
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/login')
    }
  })
  const isAdmin = session?.user?.role.includes('admin')

  useEffect(() => {
    if (!session) return
    if (!isAdmin) router.replace('/games')
  }, [isAdmin, router, session])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isAdmin) {
      setError('You must be logged in as an admin')
      return
    }
    if (!file) {
      setError('No file is selected')
      return
    }
    const mut = (await createSigned({
      categoryName,
      title,
      releaseDate
    })) as any

    const data = { ...mut.fields, 'Content-Type': file.type, file }

    const formData = new FormData()
    for (const name in data) {
      formData.append(name, data[name])
    }

    await fetch(mut.url, {
      method: 'POST',
      body: formData
    })
  }

  return (
    <>
      <Hero title="Add game | Videogamer" />
      <main className="container mx-auto">
        <ErrorModal message={error} />
        <div className="mx-auto max-w-[545px] rounded-lg bg-ocean py-[60px] px-20">
          <h3 className="mb-8 block text-center text-2xl font-bold uppercase">
            Add Game
          </h3>
          <form onSubmit={onSubmit}>
            <input
              required
              type="file"
              className="text-white' mb-4 w-full rounded bg-white/10 py-2 px-4 text-base leading-10"
              onChange={(e) => setFile(e.currentTarget.files?.[0])}
              accept="image/png, image/jpeg"
              multiple={false}
            />
            <Input
              required
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
            <Input
              required
              placeholder="CategoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <SubmitBtn text="Submit" />
          </form>
        </div>
      </main>
    </>
  )
}

export default AddGamePage

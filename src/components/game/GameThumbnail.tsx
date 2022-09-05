import Image from 'next/image'
import Link from 'next/link'

const GameThumbnail = ({
  game
}: {
  game: {
    id: string
    title: string
    coverImg: string
    slug: string
  }
}) => {
  return (
    <Link href={`/game/${game.slug}`}>
      <a>
        <Image
          src={`http://localhost:9000/videogamer-2/${game.coverImg}`}
          width="200"
          height="323.25"
          className="rounded-md"
          alt={game.title + ' cover'}
        />
      </a>
    </Link>
  )
}

export default GameThumbnail

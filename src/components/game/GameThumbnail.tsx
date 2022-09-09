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
      <a className="relative aspect-game w-full overflow-hidden rounded-md">
        <Image
          src={`http://localhost:9000/videogamer-2/${game.coverImg}`}
          layout="fill"
          alt={game.title + ' cover'}
        />
      </a>
    </Link>
  )
}

export default GameThumbnail

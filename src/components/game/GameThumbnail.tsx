import Image from 'next/image'
import Link from 'next/link'
import getImageUrl from '../../utils/getImageUrl'

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
          src={getImageUrl(game.coverImg)}
          layout="fill"
          alt={game.title + ' cover'}
        />
      </a>
    </Link>
  )
}

export default GameThumbnail

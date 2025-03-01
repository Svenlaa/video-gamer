import Image from 'next/image'
import Link from 'next/link'
import getImageUrl from '../../utils/getImageUrl'

const Game = ({
  title,
  slug,
  imgUrl,
  releaseDate
}: {
  title: string
  slug: string
  imgUrl: string
  releaseDate: string
}) => {
  return (
    <li>
      <Link href={`/game/${slug}`}>
        <a className="flex flex-row gap-2 p-1 text-left hover:text-rose-500">
          <div className="relative row-span-3 aspect-game w-10 flex-shrink-0">
            <Image
              src={getImageUrl(imgUrl)}
              layout="fill"
              alt={title + 'cover'}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{title}</span>
            <span>{releaseDate}</span>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default Game

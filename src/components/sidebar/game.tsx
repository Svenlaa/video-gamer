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
    <Link href={`/game/${slug}`}>
      <a>
        <li className="flex flex-row gap-2 p-1 text-left hover:text-rose-500">
          <div className="relative row-span-3 h-16 w-10">
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
        </li>
      </a>
    </Link>
  )
}

export default Game

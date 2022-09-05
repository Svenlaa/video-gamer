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
        <li className="grid grid-cols-4 grid-rows-3 text-left hover:text-rose-500">
          <div className="relative row-span-3 h-16 w-12">
            <Image
              src={getImageUrl(imgUrl)}
              layout="fill"
              alt={title + 'cover'}
            />
          </div>
          <span className="col-span-3 font-semibold">{title}</span>
          <span>{releaseDate}</span>
        </li>
      </a>
    </Link>
  )
}

export default Game

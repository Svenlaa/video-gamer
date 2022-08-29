import Image from 'next/image'
import Header from '../header'

const GameThumbnail = ({ src }: { src: string }) => {
  return (
    <div>
      <Image src={src} width="200" height="323.25" className="rounded-md" />
    </div>
  )
}

export default GameThumbnail

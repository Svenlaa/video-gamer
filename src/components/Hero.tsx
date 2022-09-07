import Image from 'next/image'
import Header from './header'

const Hero = ({ img, children }: { img?: string; children?: JSX.Element }) => {
  if (!children || !img)
    return (
      <>
        <Header />
        <div className="pt-[135px]" />
      </>
    )
  return (
    <>
      <Header />
      <div className="relative -z-10 mb-4 h-[50vh] min-h-[10rem] w-full">
        <div className="absolute inset-0 -z-10">
          <Image
            quality={100}
            src={img}
            layout="fill"
            objectFit="cover"
            alt="Banner"
          />
        </div>
        <div className="z-10 flex h-[50vh] min-h-[10rem] flex-col justify-around pt-20">
          {children}
        </div>
      </div>
    </>
  )
}

export default Hero

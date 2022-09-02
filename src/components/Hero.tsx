import Image from 'next/image'
import Header from './header'

const Hero = ({ img, children }: { img?: string; children?: JSX.Element }) => {
  if (!children || !img)
    return (
      <>
        <Header />
        <div className="pt-[135px]"></div>
      </>
    )
  return (
    <>
      <Header />
      <div className="relative -z-10 mb-4 h-[50vh] min-h-[10rem] w-full">
        <Image
          quality={100}
          src={img}
          className="-z-10 w-full select-none"
          layout="fill"
          objectFit="cover"
          alt="Banner"
        />
        <div className="static z-10 flex h-[50vh] min-h-[10rem] flex-col justify-around pt-20">
          {children}
        </div>
      </div>
    </>
  )
}

export default Hero

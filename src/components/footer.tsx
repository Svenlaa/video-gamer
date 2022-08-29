const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="bottom-0 flex h-16 w-full flex-col justify-around bg-black text-center">
        <span>
          &copy;{new Date().getFullYear()}&nbsp;
          <a className="font-bold" href="https://github.com/Svenlaa">
            videogamer
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer

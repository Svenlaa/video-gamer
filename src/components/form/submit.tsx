const SubmitBtn = ({ text }: { text: string }) => {
  return (
    <div className="group relative inline-block w-full">
      <button
        type="submit"
        className="absolute w-full translate-x-1 translate-y-1 rounded-lg bg-ruby p-4 text-center text-xl font-bold text-gray-300 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-gray-300  group-hover:text-ruby"
      >
        {text}
      </button>
      <button
        type="submit"
        className="absolute w-full rounded-lg bg-gray-300 p-4 text-xl font-bold text-ruby transition-all duration-500 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:bg-ruby group-hover:text-white"
      >
        {text}
      </button>
    </div>
  )
}

export default SubmitBtn

const ErrorModal = ({ message = '' }) => {
  if (!message) return null
  return (
    <div className="mx-auto mb-6 max-w-screen-sm rounded-md bg-red-800 px-12 py-6 text-gray-200">
      {message}
    </div>
  )
}

export default ErrorModal

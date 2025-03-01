const Input = ({
  type = 'text',
  required = false,
  onChange = (e: any) => {},
  value = '',
  placeholder = ''
}) => {
  return (
    <input
      className="text-white' mb-4 w-full rounded bg-white/10 py-2 px-4 text-base leading-10"
      type={type}
      autoComplete={type}
      onChange={onChange}
      value={value}
      required={required}
      placeholder={placeholder}
    />
  )
}

export default Input

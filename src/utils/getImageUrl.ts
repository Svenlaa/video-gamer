const getImageUrl = (end: string) =>
  `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/videogamer-2/${end}`
export default getImageUrl

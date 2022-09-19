const getImageUrl = (end: string) =>
  `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/videogamer/${end}`
export default getImageUrl

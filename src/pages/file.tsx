import { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const FilePage: NextPage = () => {
  const buckets = trpc
    .useQuery(['file.listBuckets'])
    .data?.Buckets?.map((b) => b.Name)
  // const objects = trpc.useQuery([
  //   'file.listObjects',
  //   { Bucket: 'buckle-2' }
  // ]).data
  // const fileDate = trpc.useQuery([
  //   'file.getObject',
  //   { Key: 'test.txt', Bucket: 'buckle-2' }
  // ]).data
  console.log(buckets)

  return <p>Hello</p>
}

export default FilePage

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
// @ts-ignore
import StarRatingComponent from 'react-star-rating-component'

const Review = ({
  your = false,
  review,
  onDelete
}: {
  your: boolean
  review: {
    authorName: string
    content: string
    stars: number
    gameSlug: string
    id: string
    createdAt: Date
  }
  onDelete?: (id: string) => void
}) => {
  const [unsure, setUnsure] = useState(true)

  const onDoDelete = () => {
    if (unsure) return setUnsure(false)
    if (onDelete) onDelete(review.id)
  }

  return (
    <li className="flex flex-col gap-1">
      <div className="flex flex-row justify-between">
        <div className=" flex flex-row flex-wrap gap-4">
          <span className="font-bold">{review.authorName}</span>
          <span>
            Posted on{' '}
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'full',
              timeStyle: 'short'
            }).format(review.createdAt)}
          </span>
        </div>
        <div className="flex flex-shrink-0 flex-col justify-around">
          <StarRatingComponent
            className="mx-2 whitespace-nowrap align-middle text-2xl leading-none text-white"
            value={review.stars}
            name="star"
            renderStarIcon={() => <FontAwesomeIcon icon={faStar} />}
            editing={false}
            emptyStarColor="lightgray"
          />
        </div>
      </div>
      <div>{review.content}</div>
      {your && (
        <div className="font-thin">
          {unsure && (
            <button className="mx-2" onClick={onDoDelete}>
              Delete
            </button>
          )}
          {!unsure && (
            <button
              className="mx-2 font-normal text-red-400"
              onClick={onDoDelete}
            >
              Confirm Deletion
            </button>
          )}
        </div>
      )}
    </li>
  )
}

export default Review

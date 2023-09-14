import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const formattedDate = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })

  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}

// the prop name matches field key of the input parameter
// here we use destructuring shorthand to extract the value of `comment` key
// it's equivalent to the follwing
// const Comment = (obj) => {
//     const comment = obj.comment
//     ...
// }

const DELETE = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      postId
    }
  }
`

const Comment = ({ comment }) => {
  const { hasRole } = useAuth()

  const [mut] = useMutation(DELETE, {
    refetchQueries: [
      { query: CommentsQuery, variables: { postId: comment.postId } },
    ],
  })

  const mod = () => {
    if (confirm('Are you sure?')) {
      mut({ variables: { id: comment.id } })
    }
  }

  return (
    <div className="bg-gray-200 p-8 rounded-lg relative">
      <header className="flex justify-between">
        <h2 className="font-semibold text-gray-700">{comment.name}</h2>
        <time className="text-xs text-gray-500" dateTime={comment.createdAt}>
          {formattedDate(comment.createdAt)}
        </time>
      </header>

      <p className="text-sm mt-2">{comment.body}</p>

      {hasRole(['mod', 'admin']) && (
        <button
          type="button"
          onClick={mod}
          className="absolute bottom-2 right-2 bg-red-500 text-xs rounded text-white px-2 py-1"
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default Comment

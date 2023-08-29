import Comment from 'src/components/Comment'

export const QUERY = gql`
  query CommentsQuery($postId: Int!) {
    #                 ^^ $postId is passed in as a prop called "postId" when using the componnent
    #                     and is automatically made available by redwood
    comments(postId: $postId) {
      id
      name
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="text-center text-gray-500">No comments yet</div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ comments }) => {
  return (
    <div className="space-y-8">
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </div>
  )
}

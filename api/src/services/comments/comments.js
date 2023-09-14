import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const comments = ({ postId }) => {
  return db.comment.findMany({ where: { postId } })
}

export const comment = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment = ({ input }) => {
  return db.comment.create({
    data: input,
  })
}

export const deleteComment = ({ id }) => {
  requireAuth({ roles: ['mod', 'admin'] }) // check for roles in addition to gql checks

  return db.comment.delete({
    where: { id },
  })
}

// this allows us to return nested post data for a comment through GraphQL, for example:
// query CommentsQuery {
//   comments {
//     id
//     name
//     body
//     createdAt
//     post {
//       id
//       title
//       body
//       createdAt
//     }
//   }
// }
export const Comment = {
  post: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).post()
  },
}

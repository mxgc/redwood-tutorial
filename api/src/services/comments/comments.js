import { db } from 'src/lib/db'

// only return comments related to a single post
export const comments = ({ postId }) => {
  return db.comment.findMany({ where: { postId } })
}

export const comment = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment = ({ input }) => {
  //                          ^^ { input } matches `mut({ variables: { input } })`
  return db.comment.create({
    data: input,
  })
}

export const deleteComment = ({ id }) => {
  return db.comment.delete({ where: { id } })
}

// allows us to return nested post data for a comment through gal using syntax like this
// query CommentsQuery {
//   comments {
//     id
//     name
//     body
//     createdAt
//     post { <--- `db.comment.findUnique({ where: { id: root?.id } }).post()`
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

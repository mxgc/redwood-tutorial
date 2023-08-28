import { db } from 'src/lib/db'

// ! comments here returns all comments not merely comments associated with an article
export const comments = () => {
  return db.comment.findMany()
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

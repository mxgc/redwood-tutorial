import { db } from 'src/lib/db'

export const posts = () => {
  return db.post.findMany({ where: { userId: context.currentUser.id } })
}

export const post = ({ id }) => {
  // changed to `findFirst` from `findUnique` (requires unique indexes)
  return db.post.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}
// magic variable `context` contains the `currentUser` that's logged in (same as available on the web side from useAuth() hook)
export const createPost = ({ input }) => {
  return db.post.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updatePost = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

// first declare a variable with the same name as the model this service is for
//     `Post` for `post.js` service
// set it (`Post`) to an object containing keys that are the same as the fields that are going to be looked up
//     in this case `user`
// when gql invokes this function it passes a couple of arguments, one of which is `root` (the object that was resolved to start with)
//     in this case `root` is the `post` in our gql query
// post {   <- root
//   id
//   title
//   body
//   createdAt
//   user {
//     name
//   }
// }

export const Post = {
  user: (_obj, { root }) => {
    return db.post.findFirst({ where: { id: root.id } }).user()
    // or
    // return db.user.findFirst({where: {id: root.userId} })
  },
}

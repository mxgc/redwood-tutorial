import { db } from 'src/lib/db'

export const posts = () => {
  return db.post.findMany()
}

export const post = ({ id }) => {
  // switched to findFirst from findUnique
  // findUnique requires unique index on the table
  // findFirst does not
  return db.post.findFirst({
    where: { id },
  })
}

// add a user relation resolver
// a variable is declared with the same name as the model this service is for
// `Post` for the `posts` service
// set it to an object containing keys that are the same as the fields that're going to be looked up, in this case `user`
// when gql invokes this function it passes a couple of arguments
// on of which is `root` which is the object that was resolved to start with, in this case it's the `post` in our gql query
//
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
  },
}

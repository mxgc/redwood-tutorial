import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const adminPosts = () => {
  return db.post.findMany({ where: { userId: context.currentUser.id } })
}

export const adminPost = ({ id }) => {
  // switched to findFirst from findUnique
  // findUnique requires unique index on the table
  // findFirst does not
  return db.post.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createPost = ({ input }) => {
  return db.post.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

const verifyOwnership = async ({ id }) => {
  if (await adminPost({ id })) {
    return true
  } else {
    throw new ForbiddenError("You don't have access to this post")
  }
}

export const updatePost = async ({ id, input }) => {
  await verifyOwnership({ id })

  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = async ({ id }) => {
  await verifyOwnership({ id })

  return db.post.delete({
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

export const schema = gql`
  type Comment {
    id: Int!
    name: String!
    body: String!
    post: Post!
    postId: Int!
    createdAt: DateTime!
  }

  type Query {
    comments(postId: Int!): [Comment!]! @skipAuth
  }

  input CreateCommentInput {
    name: String!
    body: String!
    postId: Int!
  }

  input UpdateCommentInput {
    name: String
    body: String
    postId: Int
  }

  type Mutation {
    # createComment has an identically named service that performs the business logic
    # accepts a required var called input of type CreateCommentInput and returns a required Comment type
    # @skipAuth skips the authentication and authorization
    createComment(input: CreateCommentInput!): Comment! @skipAuth

    # do not allow users to update comments

    # allows admins and mods to delete comments
    deleteComment(id: Int!): Comment! @requireAuth
  }
`

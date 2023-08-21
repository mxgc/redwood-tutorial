import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

import { comments, createComment, deleteComment } from './comments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  // senario pre-seeds a database that's passed to the test
  // the test database is reset between each run of tests
  // when receiving `senario` as an argument, the `data` key gets unwrapped so that we can reference fields like `senario.comment.jane.name`
  scenario(
    'returns all comments for a single post from the db',
    async (scenario) => {
      mockCurrentUser({
        id: 1,
        email: 'mod@mod.com',
        roles: 'moderator',
        name: 'Fake User',
      })

      const got = await comments({
        postId: scenario.comment.jane.postId,
      }) // making a database call to the test database using Prisma

      const want = await db.post.findUnique({
        where: { id: scenario.comment.jane.postId },
        include: { comments: true }, // `include` defines which relations are included in the result
      })

      // expect(result.length).toEqual(Object.keys(scenario.comment).length)
      expect(got.length).toEqual(want.comments.length)
    }
  )

  // we pass an optional first argument to `senario()` which is the named senario to use
  // if it's omitted, the default senario is the `standard` senario
  scenario('postOnly', 'creates a new comment', async (senario) => {
    const comment = await createComment({
      input: {
        name: 'Billy Bob',
        body: 'What is your favorite tree bark?',
        post: {
          // the post is already seeded by the db, so we use `connect` rather than `create` or `createOrConnec`
          connect: { id: senario.post.bark.id },
        },
      },
    })

    expect(comment.name).toEqual('Billy Bob')
    expect(comment.body).toEqual('What is your favorite tree bark?')
    expect(comment.postId).toEqual(senario.post.bark.id)
    expect(comment.createdAt).not.toEqual(null)
  })

  scenario('allows a moderator to delete a comment', async (senario) => {
    mockCurrentUser({ roles: ['moderator'] })

    const comment = await deleteComment({
      id: senario.comment.jane.id,
    })

    expect(comment.id).toEqual(senario.comment.jane.id)

    const result = await comments({ postId: senario.comment.jane.postId })
    expect(result.length).toEqual(0)
  })

  scenario(
    'deos not allow a non-moderator to delete a comment',
    async (senario) => {
      mockCurrentUser({ roles: ['user'] })

      expect(() => {
        deleteComment({
          id: senario.comment.jane.id,
        })
      }).toThrow(ForbiddenError)
    }
  )

  scenario(
    'deos not allow a logged-out user to delete a comment',
    async (senario) => {
      mockCurrentUser(null)

      expect(() => {
        deleteComment({
          id: senario.comment.jane.id,
        })
      }).toThrow(AuthenticationError)
    }
  )
})

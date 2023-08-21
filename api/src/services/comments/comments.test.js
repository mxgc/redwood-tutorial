import { db } from 'src/lib/db'

import { comments, createComment } from './comments'

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
})

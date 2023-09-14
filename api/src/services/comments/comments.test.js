import { db } from 'src/lib/db'

import { comments, createComment } from './comments'
// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario(
    'returns all comments for a single post from the db',
    async (scenario) => {
      // returns result from test db that's reset between each runs
      // scenario contains all the fields returned from db (in addition to the ones specified in scenario file)
      // so `postId` is available even if not direclty specifed
      const result = await comments({ postId: scenario.comment.jane.postId })
      const post = await db.post.findUnique({
        where: { id: scenario.comment.jane.postId },
        include: { comments: true }, // include / select
      })

      // expect(result.length).toEqual(Object.keys(scenario.comment).length)
      expect(result.length).toEqual(post.comments.length)
    }
  )

  scenario('postOnly', 'creates a new comment', async (scenario) => {
    const comment = await createComment({
      input: {
        name: 'Billy Bob',
        body: 'What is your favorite tree bark?',
        post: {
          // prisma's connect syntax
          // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-an-existing-record
          connect: { id: scenario.post.bark.id },
        },
      },
    })

    expect(comment.name).toEqual('Billy Bob')
    expect(comment.body).toEqual('What is your favorite tree bark?')

    // the arg `scenario` contains the actuall database data after being inserted, so it not only contains fields defined in the scenario file but also other fields such as `id` and `createdAt`
    expect(comment.postId).toEqual(scenario.post.bark.id)

    expect(comment.createdAt).not.toEqual(null)
  })
})

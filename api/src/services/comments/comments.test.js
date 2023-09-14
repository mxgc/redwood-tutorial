import { comments, createComment } from './comments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario('returns all comments', async (scenario) => {
    // returns result from test db that's reset between each runs
    const result = await comments()

    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })

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

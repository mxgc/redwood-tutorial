import { comments, createComment } from './comments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  // senario spins up and seed a test db, then pass the data in the form an arg,
  // here named `scenario`
  scenario('returns all comments', async (scenario) => {
    const result = await comments()

    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })

  scenario('postOnly', 'creates a new comment', async (scenario) => {
    const input = {
      name: 'Billy Bob',
      body: 'What is your favorite tree bark?',
      post: {
        connect: { id: scenario.post.bark.id },
      },
    }

    const comment = await createComment({ input: input })

    expect(comment.name).toEqual(input.name)
    expect(comment.body).toEqual(input.body)
    expect(comment.postId).toEqual(scenario.post.bark.id)
    expect(comment.createComment).not.toEqual(null)
  })
})

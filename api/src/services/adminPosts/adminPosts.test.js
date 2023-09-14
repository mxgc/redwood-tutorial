import {
  adminPosts,
  adminPost,
  createPost,
  updatePost,
  deletePost,
} from './adminPosts'

describe('posts', () => {
  scenario('returns all posts', async (scenario) => {
    mockCurrentUser({ id: scenario.post.one.userId })

    const result = await adminPosts()

    expect(result.length).toEqual(1)
  })

  scenario('returns a single post', async (scenario) => {
    mockCurrentUser({ id: scenario.post.one.userId })

    const result = await adminPost({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })

  scenario('userOnly', 'creates a post', async (scenario) => {
    mockCurrentUser({ id: scenario.user.one.id })

    const result = await createPost({
      input: {
        title: 'String',
        body: 'String',
        // user: {
        //   connect: { id: scenario.user.one.id },
        // },
      },
    })

    expect(result.title).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a post', async (scenario) => {
    mockCurrentUser({ id: scenario.post.one.userId })

    const original = await adminPost({ id: scenario.post.one.id })
    const result = await updatePost({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a post', async (scenario) => {
    mockCurrentUser({ id: scenario.post.one.userId })

    const original = await deletePost({ id: scenario.post.one.id })
    const result = await adminPost({ id: original.id })

    expect(result).toEqual(null)
  })
})

import { posts, post } from './posts'

describe('posts', () => {
  scenario('returns all posts', async (scenario) => {
    mockCurrentUser({ id: scenario.post.one.userId })

    const result = await posts()

    expect(result.length).toEqual(Object.keys(scenario.post).length)
  })

  scenario('returns a single post', async (scenario) => {
    mockCurrentUser({ id: scenario.post.one.userId })

    const result = await post({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })
})

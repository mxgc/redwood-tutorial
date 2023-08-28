import { render, screen } from '@redwoodjs/testing/web'

import Comment from './Comment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Comment', () => {
  it('renders successfully', () => {
    const comment = {
      name: 'Rob Cameron',
      body: 'This is a comment!',
      createdAt: '2020-01-02T12:34:56Z',
    }
    render(<Comment comment={comment} />)

    expect(screen.getByText(comment.name)).toBeInTheDocument()
    expect(screen.getByText(comment.body)).toBeInTheDocument()

    const dateExpected = screen.getByText('2 January 2020')
    expect(dateExpected).toBeInTheDocument()
    expect(dateExpected.nodeName).toEqual('TIME')
    expect(dateExpected).toHaveAttribute('datetime', comment.createdAt)
  })
})

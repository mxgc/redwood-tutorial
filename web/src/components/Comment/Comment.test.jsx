import { render, screen, waitFor } from '@redwoodjs/testing/web'

import Comment from './Comment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const COMMENT = {
  name: 'Rob Cameron',
  body: 'This is the first comment!',
  createdAt: '2020-01-01T12:34:56Z',
}

describe('Comment', () => {
  it('renders successfully', () => {
    render(<Comment comment={COMMENT} />)

    expect(screen.getByText(COMMENT.name)).toBeInTheDocument()
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument()

    const dateExpected = screen.getByText('1 January 2020')
    expect(dateExpected).toBeInTheDocument()
    expect(dateExpected.nodeName).toEqual('TIME')
    expect(dateExpected).toHaveAttribute('datetime', COMMENT.createdAt)
  })

  it('does not render a delete button if user if logged out', async () => {
    render(<Comment comment={COMMENT} />)

    await waitFor(() => {
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })
  })

  it('renders a delete button if user is a moderator', async () => {
    mockCurrentUser({
      id: 1,
      email: 'mod@mod.com',
      roles: 'moderator',
    })

    render(<Comment comment={COMMENT} />)

    await waitFor(() => {
      // waitFor is needed because hasRole() executes some gql calls behind the scenes to figure out who the user is
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  })
})

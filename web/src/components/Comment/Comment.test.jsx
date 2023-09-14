import React from 'react'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import Comment from './Comment'

const COMMENT = {
  name: 'John Doe',
  body: 'This is my comment',
  createdAt: '2020-01-02T12:34:56Z',
}

describe('Comment', () => {
  it('renders successfully', () => {
    render(<Comment comment={COMMENT} />)

    expect(screen.getByText(COMMENT.name)).toBeInTheDocument()
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument()

    const dateExpected = screen.getByText('2 January 2020')
    expect(dateExpected).toBeInTheDocument()
    expect(dateExpected.nodeName).toEqual('TIME')
    expect(dateExpected).toHaveAttribute('datetime', COMMENT.createdAt)
  })

  it('does not render a delete button if user is logged out', async () => {
    render(<Comment comment={COMMENT} />)

    await waitFor(() => {
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })
  })

  it('renders a delete button if the user is a mod', async () => {
    mockCurrentUser({
      id: 1,
      email: 'mod@mod.com',
      roles: 'mod',
    })

    render(<Comment comment={COMMENT} />)

    // the test suite makes mocked gql calls, but they're still async and need to be waited for.
    await waitFor(() => {
      expect(screen.queryByText('Delete')).toBeInTheDocument()
    })
  })
})

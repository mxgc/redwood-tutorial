// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Comment from './Comment'

export const defaultView = () => {
  return (
    <Comment
      comment={{
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        createdAt: '2020-01-01T12:34:56Z',
        psotId: 1,
      }}
    />
  )
}

export const moderatorView = () => {
  // structure of the user should similar to getCurrentUser() in web/src/auth.js
  mockCurrentUser({
    id: 1,
    email: 'mod@mod.com',
    roles: 'moderator',
  })

  return (
    <Comment
      comment={{
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        createdAt: '2020-01-01T12:34:56Z',
        psotId: 1,
      }}
    />
  )
}

export default { component: Comment }

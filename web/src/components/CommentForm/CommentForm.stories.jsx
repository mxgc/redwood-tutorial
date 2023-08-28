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

import CommentForm from './CommentForm'

export default { component: CommentForm }

export const Primary = () => {
  // storybook can automatically mock queries but not mutations
  // but we can mock the request manually
  mockGraphQLMutation('CreateCommentMutation', (variables, { ctx }) => {
    //                                          ^^ same as passed into `mut`
    //                ^^ the name of the mutation to intercept
    const id = Math.floor(Math.random() * 1000)
    ctx.delay(1000) // ms

    // take a look at `mut` returned from useMutation for the content of `variables`
    return {
      createComment: {
        // ^^ name of the service to use, same as the one used in the gql statement
        id,
        name: variables.input.name,
        body: variables.input.body,
        createdAt: new Date().toISOString(),
      },
    }
  })

  return <CommentForm />
}

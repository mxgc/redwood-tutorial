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

export const Primary = () => {
  // the operation name `CreateCommentMutation` is same as the mutation name defined in CREATE gql statement in `CommentForm.jsx`
  // `variables` is the what we pass in from `onSubmit`
  mockGraphQLMutation('CreateCommentMutation', (variables, { ctx }) => {
    const id = Math.floor(Math.random() * 1000)
    ctx.delay(1000) // delay by 1000ms

    return {
      // `createComment` is the name as the service `createComment`
      createComment: {
        id,
        name: variables.input.name,
        body: variables.input.body,
        createdAt: new Date().toISOString(),
      },
    }
  })

  return <CommentForm />
}

export default { component: CommentForm }

import { useState } from 'react'

import {
  Label,
  Form,
  TextField,
  TextAreaField,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      name
      body
      createdAt
    }
  }
`

const CommentForm = ({ postId }) => {
  const [hasPosted, setHasPosted] = useState(false)

  const [mut, { loading, error }] = useMutation(CREATE, {
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }], // after `mut` is invoked, refetch the comments
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
  })

  const onSubmit = (input) => {
    console.log({ input })
    mut({ variables: { input: { postId, ...input } } })
  }

  return (
    <div className={hasPosted ? 'hidden' : ''}>
      <h3>Leave a Comment</h3>
      <Form className="mt-4 w-full" onSubmit={onSubmit}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />

        <Label name="name">Name</Label>
        <TextField
          name="name"
          className="block w-full p-1 border rounded text-xs"
          validation={{ required: true }}
        />

        <Label
          name="body"
          className="block mt-4 text-sm text-gray-600 uppercase"
        >
          Comment
        </Label>
        <TextAreaField
          name="body"
          className="block w-full p-1 border rounded h-24 text-xs"
          validation={{ required: true }}
        />

        {/* storybook can automatically mock Query but not Mutation */}
        <Submit
          disabled={loading}
          className="block mt-4 bg-blue-500 text-white text-xs font-semibold uppercase tracking-wide rounded px-3 py-2 disabled:opacity-50"
        >
          Submit
        </Submit>
      </Form>
    </div>
  )
}

export default CommentForm

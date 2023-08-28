import {
  TextField,
  Label,
  Form,
  TextAreaField,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

// const CREATE = gql`
//   mutation CreateCommentMutation($input: CreateCommentInput!) {
//            ^^ name of the mutation, must be unique across the whole app
//     createComment(input: $input) {         <--| what the call should return based on `schema.prisma`
//            ^^ name of the service to use      |
//       id                                      |
//       name                                    |
//       body                                    |
//       createdAt                               |
//     }                                      <--|
//   }
// `
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

const CommentForm = () => {
  const [mut, { loading, error }] = useMutation(CREATE)

  // input is an obj { name: "xxx", body: "xxx"}
  const onSubmit = (input) => {
    return mut({ variables: { input } })
  }

  return (
    <div>
      <h3 className="font-light text-lg text-gray-600">Leave a Comment</h3>

      <Form onSubmit={onSubmit} className="mt-4 w-full">
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />

        <Label name="name" className="block text-sm text-gray-600 uppercase">
          Name
        </Label>
        <TextField
          name="name"
          className="block w-full p-1 border rounded text-xs"
          validation={{ required: true }}
        />

        <Label name="body" className="block text-sm text-gray-600 uppercase">
          Comment
        </Label>
        <TextAreaField
          name="body"
          className="block w-full p-1 border rounded text-xs h-24"
          validation={{ required: true }}
        />

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

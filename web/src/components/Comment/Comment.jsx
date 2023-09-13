const formattedDate = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })

  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}

// the prop name matches field key of the input parameter
// here we use destructuring shorthand to extract the value of `comment` key
// it's equivalent to the follwing
// const Comment = (obj) => {
//     const comment = obj.comment
//     ...
// }

const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-200 p-8 rounded-lg">
      <header className="flex justify-between">
        <h2 className="font-semibold text-gray-700">{comment.name}</h2>
        <time className="text-xs text-gray-500" dateTime={comment.createdAt}>
          {formattedDate(comment.createdAt)}
        </time>
      </header>

      <p className="text-sm mt-2">{comment.body}</p>
    </div>
  )
}

export default Comment

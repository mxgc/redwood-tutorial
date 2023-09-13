import Article from 'src/components/Article'

export const QUERY = gql`
  query BlogPostsQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ articles }) => {
  console.log(articles)

  return (
    <div className="space-y-10">
      {articles.map((article) => (
        <Article key={article.id} article={article} summary={true} />
      ))}
    </div>
  )
}

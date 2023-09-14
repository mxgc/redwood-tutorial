import { render, screen, waitFor } from '@redwoodjs/testing'

import { standard } from 'src/components/CommentsCell/CommentsCell.mock'

import Article from './Article'

const ARTICLE = {
  id: 1,
  title: 'First post',
  body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`,
  createdAt: new Date().toISOString(),
  user: { name: 'John Doe' },
}

describe('Article', () => {
  it('renders a blog post', () => {
    render(<Article article={ARTICLE} summary={false} />)

    expect(screen.getByText(ARTICLE.title)).toBeInTheDocument()
    expect(screen.getByText(ARTICLE.body)).toBeInTheDocument()
  })

  it('renders a summary of blog post', () => {
    render(<Article article={ARTICLE} summary={true} />)

    expect(screen.getByText(ARTICLE.title)).toBeInTheDocument()
    expect(
      screen.getByText(
        'Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Str...'
      )
    ).toBeInTheDocument()
  })

  it('renders comments when displaying a full blog post', async () => {
    const comment = standard().comments[0]

    // the cell associated with Article compoment is mocked rather using actual graphql
    render(<Article article={ARTICLE} summary={false} />)

    // `waitFor` wait for things like gql queries to finish running before checking for what's rendered
    // since `Article` renders `CommentsCell` we need to wait for `Success` component of `CommentsCell` to be rendered
    await waitFor(() => {
      expect(screen.getByText(comment.body)).toBeInTheDocument()
    })
  })

  it('does not render comments when displaying a summary blog post', async () => {
    const comment = standard().comments[0]

    // the cell associated with Article compoment is mocked rather using actual graphql
    render(<Article article={ARTICLE} summary={true} />)

    await waitFor(() => {
      expect(screen.queryByText(comment.body)).not.toBeInTheDocument()
    })
  })
})

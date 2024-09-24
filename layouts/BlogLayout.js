import Container from '../components/Container'

export default function BlogLayout({ children, data }) {
  const postImage = data.properties['Cover Image'].files[0]
  const postImageUrl = postImage?.type === 'file' ? postImage.file.url : postImage?.external.url
  const title = data.properties['Content Title']?.title?.[0]?.text?.content || 'Untitled'

  return (
    <Container
      title={title}
      description={data.properties.Description.rich_text[0].plain_text}
      date={new Date(data.properties.Date.date.start)}
      type="article"
      image={postImageUrl}
    >
      <article className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
        {children}
      </article>
    </Container>
  )
}

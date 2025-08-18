import '../css/message.css';
interface MessageProps {
  content: string;
  author: boolean;
  authorName?: string;
}

export default function Message({ content, author, authorName }: MessageProps) {
  return (
    <div
      className={'message' + (author ? ' messageAuthor ' : ' messageForeign ')}
    >
      <div className="container">
        <div className="authorName">{author ? 'You ' : authorName}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
}

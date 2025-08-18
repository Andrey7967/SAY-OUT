import { MouseEventHandler } from 'react';
import '../css/buttonForDarkBlue.css';

interface ButtonForDarkProps {
  content: string;
  handleClick: MouseEventHandler;
}

export default function ButtonForDark({
  content,
  handleClick,
}: ButtonForDarkProps) {
  return (
    <div className="buttonForDark" onClick={handleClick}>
      {content}
    </div>
  );
}

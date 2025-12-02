import { MouseEventHandler } from 'react';
import '../css/buttonForDarkBlue.css';

export default function LoadingElement() {
  return (
    <div className=" top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3 p96" role="status">
          <span className="visually-hidden p96">Loading...</span>
        </div>
        <h5 className="text-muted p96">Loading...</h5>
      </div>
    </div>
  );
}

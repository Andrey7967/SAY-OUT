import { useState, useEffect, useRef } from 'react';
import '../css/Eyes.css';
interface EyeProps {
  eyeSize?: number;
  pupilSize?: number;
}

export default function FollowingEyes({
  eyeSize = 300,
  pupilSize = 100,
}: EyeProps) {
  const [leftPupilPosition, setLeftPupilPosition] = useState({ x: 0, y: 0 });
  const [rightPupilPosition, setRightPupilPosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!leftEyeRef.current || !rightEyeRef.current) return;

      const leftEyeRect = leftEyeRef.current.getBoundingClientRect();
      const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
      const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;
      const leftAngle = Math.atan2(
        e.clientY - leftEyeCenterY,
        e.clientX - leftEyeCenterX
      );
      const leftMaxDistance = (eyeSize - pupilSize) / 2 - 15;
      setLeftPupilPosition({
        x: leftMaxDistance * Math.cos(leftAngle),
        y: leftMaxDistance * Math.sin(leftAngle),
      });

      const rightEyeRect = rightEyeRef.current.getBoundingClientRect();
      const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
      const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;
      const rightAngle = Math.atan2(
        e.clientY - rightEyeCenterY,
        e.clientX - rightEyeCenterX
      );
      const rightMaxDistance = (eyeSize - pupilSize) / 2 - 15;
      setRightPupilPosition({
        x: rightMaxDistance * Math.cos(rightAngle),
        y: rightMaxDistance * Math.sin(rightAngle),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [eyeSize, pupilSize]);

  return (
    <div className="eyes-container">
      <div ref={leftEyeRef} className="eye">
        <div
          className="pupil"
          style={{
            transform: `translate(${leftPupilPosition.x}rem, ${leftPupilPosition.y}rem)`,
          }}
        />
      </div>
      <div ref={rightEyeRef} className="eye">
        <div
          className="pupil"
          style={{
            transform: `translate(${rightPupilPosition.x}rem, ${rightPupilPosition.y}rem)`,
          }}
        />
      </div>
    </div>
  );
}

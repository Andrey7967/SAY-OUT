import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
} from 'react';

interface InfoInputProps {
  placeholder: string;
  Change: ChangeEventHandler<HTMLInputElement>;
  message: string;
  type?: string;
  maxlength?: number;
  name?: string;
  value?: string;
  onMouseEnter?: MouseEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onMouseLeave?: MouseEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export default function InfoInput({
  placeholder,
  Change,
  message,
  type = 'text',
  maxlength,
  name = placeholder,
  onFocus,
  onMouseEnter,
  onBlur,
  onMouseLeave,
  value,
}: InfoInputProps) {
  return (
    <div>
      <input
        value={value}
        maxLength={maxlength}
        className="p96 tekturFont signUpInput"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={Change}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onBlur={onBlur}
      ></input>
      <div className="p48 seldomFont validMessage rebringText">{message}</div>
    </div>
  );
}

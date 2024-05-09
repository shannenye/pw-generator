import React from 'react';
import './Button.css';

export interface ButtonProps {
  text: string;
  click: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, click }) => (
  <button className="btn hover-style" onClick={click}>
    {text}
  </button>
);

export default Button;
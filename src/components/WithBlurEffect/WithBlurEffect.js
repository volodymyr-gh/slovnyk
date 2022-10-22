import React, { useEffect, useState } from 'react';
import './WithBlurEffect.css';

export const WithBlurEffect = ({ applyBlur, children }) => {
  const [isPeekMode, setPeekMode] = useState(false);
  const togglePeek = () => setPeekMode(currValue => !currValue);

  useEffect(() => {
    if (applyBlur) setPeekMode(false);
  }, [applyBlur]);

  return (
    <span
      className={(applyBlur && !isPeekMode) ? 'blur-effect' : null}
      onClick={togglePeek}
    >
      {children}
    </span>
  );
};

WithBlurEffect.defaultProps = {
  applyBlur: false
};

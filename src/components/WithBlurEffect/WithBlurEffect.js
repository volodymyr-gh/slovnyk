import React, { useEffect, useState } from 'react';
import './WithBlurEffect.css';

export const WithBlurEffect = ({ applyBlur, children }) => {
  const [isInPeekMode, setPeekMode] = useState(false);
  const togglePeekMode = () => setPeekMode(currValue => !currValue);

  useEffect(() => {
    if (applyBlur) setPeekMode(false);
  }, [applyBlur]);

  return (
    <span
      className={(applyBlur && !isInPeekMode) ? 'blur-effect' : null}
      onClick={togglePeekMode}
    >
      {children}
    </span>
  );
};

WithBlurEffect.defaultProps = {
  applyBlur: false
};

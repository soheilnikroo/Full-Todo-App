import React from 'react';

import classes from './style/NextButton.module.css';

interface NextButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  text: string;
  disabled: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, text, disabled }) => {
  return (
    <div className={classes['next-wrapper']}>
      <div
        role={'button'}
        onClick={!disabled ? onClick : undefined}
        className={
          classes[`${disabled ? 'next-button--disabled' : 'next-button'}`]
        }
      >
        <p className={classes['button-text']}>{text}</p>
      </div>
    </div>
  );
};

NextButton.defaultProps = {
  onClick: undefined,
};

export default NextButton;

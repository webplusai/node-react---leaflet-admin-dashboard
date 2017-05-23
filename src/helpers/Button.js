import React, { PropTypes } from 'react';
import cl from 'classnames';

function Button({ className, addClass, color, size, outline, flat, icon, afterIcon, disabled, submit, onClick, children }) {
  const buttonClass = className || cl('btn', `btn-${color}`, {
      [`btn-${size}`]: !!size,
      [addClass]: !!addClass,
      'btn-outline': outline,
      'btn-flat': flat
    });

  const buttonIcon = icon ? <i className={cl('fa', `fa-${icon}`)} /> : null;
  const buttonAfterIcon = afterIcon ? <i className={cl('fa', `fa-${afterIcon}`)} /> : null;

  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={buttonClass}
      disabled={disabled}
      onClick={(e) => {
        if (!submit) {
          e.preventDefault();
        }
        if (onClick) {
          onClick(e);
        }
      }}
    >

      {buttonIcon}
      {buttonIcon && children ? ' ' : null}
      {children}
      {buttonAfterIcon && children ? ' ' : null}
      {buttonAfterIcon}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  addClass: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  outline: PropTypes.bool,
  flat: PropTypes.bool,
  icon: PropTypes.string,
  afterIcon: PropTypes.string,
  submit: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onClick: PropTypes.func
};

export default Button;

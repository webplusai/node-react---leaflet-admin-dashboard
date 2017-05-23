import React, { PropTypes } from 'react';
import cl from 'classnames';
import { Link } from 'react-router';

function LinkTo({
  className, addClass,
  url, href,
  button,
  color, size, icon, buttonFix, xsButtonFix, buttonTopFix, outline, rounded, flat,
  active,
  pureLink,
  onClick,
  children
}) {
  const linkUrl = url || href;

  const buttonClass = className || cl({
      btn: button,
      [`btn-${color}`]: !!color,
      [`btn-${size}`]: !!size,
      [addClass]: !!addClass,
      'b-button-fix': (!!icon || buttonFix),
      'b-m-b-xs': xsButtonFix,
      'b-button-top-fix': buttonTopFix,
      'btn-outline': outline,
      'btn-rounded': rounded,
      'btn-flat': flat,
      active
    });

  const linkIcon = icon ? <i className={cl('fa', `fa-${icon}`)} /> : null;

  if (pureLink) {
    return (
      <a
        className={cl(buttonClass)}
        href={linkUrl}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {linkIcon}
        {linkIcon && children ? ' ' : null}
        {children}
      </a>
    );
  }
  return (
    <Link className={cl(buttonClass)} to={`/${linkUrl}`}>
      {linkIcon}
      {linkIcon && children ? ' ' : null}
      {children}
    </Link>
  );
}

LinkTo.propTypes = {
  className: PropTypes.string,
  addClass: PropTypes.string,
  url: PropTypes.string,
  href: PropTypes.string,
  button: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  buttonFix: PropTypes.bool,
  xsButtonFix: PropTypes.bool,
  buttonTopFix: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  flat: PropTypes.bool,
  active: PropTypes.bool,
  pureLink: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  onClick: PropTypes.func
};

export default LinkTo;

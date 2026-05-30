import React from 'react';
import PropTypes from 'prop-types';

function NoteActionButton({
  className,
  label,
  onClick,
  title,
  type,
  children,
}) {
  return (
    <button
      className={`action ${className}`}
      type={type}
      onClick={onClick}
      aria-label={label}
      title={title || label}
    >
      {children}
    </button>
  );
}

NoteActionButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired,
};

NoteActionButton.defaultProps = {
  className: '',
  onClick: undefined,
  title: '',
  type: 'button',
};

export default NoteActionButton;

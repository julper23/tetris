import PropTypes from 'prop-types';

function Cell({ filled }) {
  const cellClassName = `cell ${filled ? 'filled' : ''}`;
  
  return <div className={cellClassName}></div>;
}

Cell.propTypes = {
  filled: PropTypes.bool.isRequired,
};

export default Cell;
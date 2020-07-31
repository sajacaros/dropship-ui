import React from 'react';
import PropTypes from 'prop-types';

function Dependency({ dep }) {
  return <span>실행순서 : {dep}</span>;
}

Dependency.propTypes = {
  dep: PropTypes.string, //.isRequired,
};

export default Dependency;

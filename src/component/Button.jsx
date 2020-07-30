import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Button extends PureComponent {
  render() {
    const { children, onPress, disabled } = this.props;
    return (
      <button width="80px" disabled={disabled} onClick={onPress}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  onPress: () => {},
};

export default Button;

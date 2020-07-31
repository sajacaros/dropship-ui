import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from '../hoc/withStyles';

class Button extends PureComponent {
  render() {
    const { children, onPress, disabled } = this.props;
    return (
      <button disabled={disabled} onClick={onPress} {...css({ margin: '1px' })}>
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

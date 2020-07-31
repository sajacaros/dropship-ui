import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import withPending from '../hoc/withPending';
import './Refresh.css';

const ButtonWithPending = withPending(<Button disabled>pending</Button>)(Button);

function Refresh({ refresh, nowDate, isPending }) {
  return (
    <div className="info">
      <span className="info-item">{nowDate}</span>
      <ButtonWithPending isPending={isPending} onPress={() => refresh()}>
        refresh
      </ButtonWithPending>
    </div>
  );
}

Refresh.propType = {
  refresh: PropTypes.func.isRequired,
  nowDate: PropTypes.string,
};

export default Refresh;

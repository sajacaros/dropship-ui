import React from 'react';
import PropTypes from 'prop-types';
import { css } from '../hoc/withStyles';

function History({ histories }) {
  const results = histories
    .map(({ occuredDate, project, command, result }) => {
      return (
        occuredDate.toLocaleString() +
        ' ' +
        project +
        ' ' +
        command +
        ' ' +
        (result ? '성공' : '실패')
      );
    })
    .join('\n');
  return (
    <textarea
      {...css({ width: '100%' }, { height: '200px' }, { overflowY: 'scroll' })}
      readOnly
      value={results}
    />
  );
}

History.propTypes = {
  histories: PropTypes.arrayOf(
    PropTypes.shape({
      occuredDate: PropTypes.instanceOf(Date),
      project: PropTypes.string,
      command: PropTypes.string,
      result: PropTypes.bool,
    }),
  ),
};

export default History;

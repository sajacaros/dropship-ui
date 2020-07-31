import React from 'react';
import PropTypes from 'prop-types';
import './Status.css';
import Button from './Button';
import withPending from '../hoc/withPending';
import ModalProviderWithKey, {
  START_MODAL,
  STOP_MODAL,
  UPDATE_MODAL,
} from '../modal/ModalProviderWithKey';
import { Consumer as ModalConsumer } from '../modal/ModalContext';

const ButtonWithPending = withPending(<Button disabled>pending</Button>)(Button);

function Status({ project, status, pid = '-', uptime = '-', startF, stopF, updateF, isPending }) {
  return (
    <div className="status">
      <span className="item">{project}</span>
      <span className="item">{status}</span>
      <span className="item">{status === 'Down' ? '-' : pid}</span>
      <span className="item">{status === 'Down' ? '-' : uptime}</span>
      <span className="item">
        <ModalProviderWithKey>
          <ModalConsumer>
            {({ openModal }) => (
              <ButtonWithPending
                isPending={isPending}
                onPress={
                  status === 'Down'
                    ? () => openModal(START_MODAL, { project, startF })
                    : () => openModal(STOP_MODAL, { project, stopF })
                }
              >
                {status === 'Down' ? 'start' : 'stop'}
              </ButtonWithPending>
            )}
          </ModalConsumer>
        </ModalProviderWithKey>
        <ModalProviderWithKey>
          <ModalConsumer>
            {({ openModal }) => (
              <ButtonWithPending
                isPending={isPending}
                onPress={() => openModal(UPDATE_MODAL, { project, updateF })}
              >
                update
              </ButtonWithPending>
            )}
          </ModalConsumer>
        </ModalProviderWithKey>
      </span>
    </div>
  );
}

Status.propTypes = {
  project: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  uptime: PropTypes.string,
  pid: PropTypes.number,
  startF: PropTypes.func.isRequired,
  stopF: PropTypes.func.isRequired,
  updateF: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};

Status.defaultProps = {
  isPending: false,
};

export default Status;

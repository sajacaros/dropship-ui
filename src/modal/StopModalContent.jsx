import React from 'react';
import { Consumer } from './ModalContext';
import Button from '../component/Button';
import Text from '../component/Text';

export default function StopModalContent({ id, project, stopF }) {
  return (
    <Consumer>
      {({ closeModal }) => (
        <div>
          <div>
            <Text>{project}을 정말로 중지 하시겠습니까?</Text>
          </div>
          <Button
            primary
            onPress={() => {
              closeModal();
              stopF(project);
            }}
          >
            예
          </Button>
          <Button onPress={closeModal}>닫기</Button>
        </div>
      )}
    </Consumer>
  );
}

import React from 'react';
import { Consumer } from './ModalContext';
import Button from '../component/Button';
import Text from '../component/Text';

export default function StartModalContent({ id, project, startF }) {
  return (
    <Consumer>
      {({ closeModal }) => (
        <div>
          <div>
            <Text>{project}을 정말로 시작 하시겠습니까?</Text>
          </div>
          <Button
            primary
            onPress={() => {
              closeModal();
              startF(project);
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

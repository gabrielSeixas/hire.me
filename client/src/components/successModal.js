import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

const SuccessModal = (props) => (
  <div>
    { props.urls.isOpen &&
      <ModalContainer>
        <ModalDialog onClose={props.closeModal}>
          <h1>Url criada</h1>
          <a href={ props.urls.newUrl } >{ props.urls.newUrl } </a>
        </ModalDialog>
      </ModalContainer>
    }
  </div>
);

export default SuccessModal;
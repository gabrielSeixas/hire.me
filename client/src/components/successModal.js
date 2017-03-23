import React from 'react';
import Modal from 'react-modal';

const SuccessModal = (props) => (
  <Modal
    isOpen={props.urls.isOpen}
    onRequestClose={props.closeModal}
    contentLabel="Url adicionada com sucesso">
    <button onClick={props.closeModal}> Fechar </button>
    <h1>Url criada</h1>
    <a href={ props.urls.newUrl } >{ props.urls.newUrl } </a>
  </Modal>
);

export default SuccessModal;
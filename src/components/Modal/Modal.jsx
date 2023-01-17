import PropTypes from 'prop-types';

import { Overlay, Modal } from './Modal.styled';

export const AddModal = ({ largeImageURL, tags, onClose, id }) => {
  return (
    <Overlay onClick={onClose}>
      <Modal>
        <img src={largeImageURL} alt={tags} id={id} />
      </Modal>
    </Overlay>
  );
};

AddModal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, Modal } from './Modal.styled';

// export const AddModal = ({ largeImageURL, tags, onClose, id }) => {
export class AddModal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.props.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onKeyDown);
  }

  render() {
    const { largeImageURL, tags, onClose, id } = this.props;

    return (
      <Overlay onClick={onClose}>
        <Modal>
          <img src={largeImageURL} alt={tags} id={id} />
        </Modal>
      </Overlay>
    );
  }
}

// AddModal.propTypes = {
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
//   handleKeyDown: PropTypes.func.isRequired,
//   id: PropTypes.number.isRequired,
// };

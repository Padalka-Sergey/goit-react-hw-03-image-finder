import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { GalleryItem, Img } from './ImageGalleryItem.styled';
import { AddModal } from 'components/Modal/Modal';
import fetchAPI from 'services/fetch-api';

export class ImageGalleryItem extends Component {
  pageNorm;

  state = {
    responseData: [],
    error: null,
    isModalOpen: false,
    idImg: null,
  };

  static propTypes = {
    textForm: PropTypes.string.isRequired,
    onFetchTotal: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    statusFunc: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  };

  closeModal = evt => {
    const { tagName } = evt.target;
    if (tagName === 'IMG') {
      return;
    }
    this.setState({ isModalOpen: false });
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  openModal = evt => {
    const { tagName } = evt.target;
    const evtTarget = Number(evt.target.getAttribute('id'));

    if (tagName !== 'IMG') {
      return;
    }
    this.setState({ isModalOpen: true });
    this.setState({ idImg: evtTarget });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickImg);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickImg);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevText = prevProps.textForm;
    const nextText = this.props.textForm;
    const total = this.props.onFetchTotal;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevText !== nextText) {
      this.pageNorm = 1;
      this.props.statusFunc('pending');
      this.setState({ responseData: [] });
      fetchAPI
        .fetchApi(nextText, this.pageNorm)
        .then(responseDataFetch => {
          const { responseData } = this.state;
          this.setState({
            responseData: [...responseData, ...responseDataFetch.hits],
          });
          this.props.statusFunc('resolved');
          total(responseDataFetch.total);
          // let response = [...responseData, ...responseDataFetch.hits];
          // localStorage.setItem('data', JSON.stringify(response));
        })
        .catch(error => {
          this.setState({ error });
          this.props.statusFunc('rejected');
        });
    }

    if (prevPage !== nextPage) {
      if (this.pageNorm === 1) {
        this.pageNorm = 2;
      }
      this.props.statusFunc('pending');

      fetchAPI
        .fetchApi(nextText, this.pageNorm)
        .then(responseDataFetch => {
          const { responseData } = this.state;
          this.setState({
            responseData: [...responseData, ...responseDataFetch.hits],
          });
          this.props.statusFunc('resolved');
          total(responseDataFetch.total);
          // let response = [...responseData, ...responseDataFetch.hits];
          // localStorage.setItem('data', JSON.stringify(response));
          this.pageNorm += 1;
        })
        .catch(error => {
          this.setState({ error });
          this.props.statusFunc('rejected');
        });
    }
  }

  render() {
    const { responseData, error } = this.state;
    const { status } = this.props;
    const { isModalOpen } = this.state;
    // const data = localStorage.getItem('data');
    // const parsedData = JSON.parse(data);

    // if (status === 'idle')

    // if (status === 'pending') {
    //   return <Loader />;
    // }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          {responseData.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <GalleryItem key={id}>
                <Img
                  id={id}
                  src={webformatURL}
                  alt={tags}
                  onClick={this.openModal}
                />

                {isModalOpen && id === this.state.idImg && (
                  <AddModal
                    id={id}
                    tags={tags}
                    largeImageURL={largeImageURL}
                    onClose={this.closeModal}
                    onKeyDown={this.handleKeyDown}
                  />
                )}
              </GalleryItem>
            );
          })}
        </>
      );
    }
  }
}

// const prevPage = prevProps.page;
// const nextPage = this.props.page;

// const onPrevStateChangeLetter = prevProps.onStateChangeLetter;
// const onNextStateChangeLetter = this.props.onStateChangeLetter;

// if (onPrevStateChangeLetter !== onNextStateChangeLetter) {
//   this.props.pageChange();
// }
// if (prevText !== nextText) {
//   this.props.pageChange();
//   this.setState({ responseData: [] });
// }

//=================================================

// if (parsedData) {
//   return parsedData.map(({ id, webformatURL, tags }) => (
//     <GalleryItem key={id}>
//       <Img src={webformatURL} alt={tags} />
//     </GalleryItem>
//   ));
// }

//====================================================
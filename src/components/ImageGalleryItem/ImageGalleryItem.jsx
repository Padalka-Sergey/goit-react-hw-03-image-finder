import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { GalleryItem, Img } from './ImageGalleryItem.styled';
import { AddModal } from 'components/Modal/Modal';
import fetchAPI from 'services/fetch-api';

export class ImageGalleryItem extends PureComponent {
  pageNorm;
  response;

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

  openModal = evt => {
    const { tagName } = evt.target;
    const evtTarget = Number(evt.target.getAttribute('id'));

    if (tagName !== 'IMG') {
      return;
    }
    this.setState({ isModalOpen: true });
    this.setState({ idImg: evtTarget });
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  onResponseDataFetch = responseDataFetch => {
    return responseDataFetch.hits.map(
      ({ id, webformatURL, tags, largeImageURL }) => {
        return { id, webformatURL, tags, largeImageURL };
      }
    );
  };

  onFetchAPI = (total, nextText) => {
    fetchAPI
      .fetchApi(nextText, this.pageNorm)
      .then(responseDataFetch => {
        localStorage.setItem(
          'data',
          JSON.stringify(this.onResponseDataFetch(responseDataFetch))
        );
        this.setState({
          responseData: this.onResponseDataFetch(responseDataFetch),
        });
        total(responseDataFetch.total);
        this.props.statusFunc('resolved');
      })
      .catch(error => {
        this.setState({ error });
        this.props.statusFunc('rejected');
      });
  };

  componentDidMount() {
    console.log('dfbdsfnbsdhfbdsnb');

    const total = this.props.onFetchTotal;
    const nextText = this.props.textForm;
    localStorage.clear();
    this.pageNorm = 1;
    this.props.statusFunc('pending');

    this.onFetchAPI(total, nextText);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevText = prevProps.textForm;
    const nextText = this.props.textForm;
    const total = this.props.onFetchTotal;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevText !== nextText) {
      localStorage.removeItem('data');
      this.setState({ responseData: [] });
      this.props.statusFunc('pending');
      this.pageNorm = 1;

      this.onFetchAPI(total, nextText);
    }

    if (prevPage !== nextPage) {
      if (this.pageNorm === 1) {
        this.pageNorm = 2;
      }
      this.props.statusFunc('pending');

      fetchAPI
        .fetchApi(nextText, this.pageNorm)
        .then(responseDataFetch => {
          this.setState({
            responseData: this.onResponseDataFetch(responseDataFetch),
          });
          total(responseDataFetch.total);
          this.props.statusFunc('resolved');

          const data = localStorage.getItem('data');
          const parsedData = JSON.parse(data);
          this.response = [
            ...parsedData,
            ...this.onResponseDataFetch(responseDataFetch),
          ];
          localStorage.setItem('data', JSON.stringify(this.response));

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

    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);

    // if (status === 'idle')

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (parsedData) {
      return parsedData.map(({ id, webformatURL, tags, largeImageURL }) => (
        <GalleryItem key={id}>
          <Img id={id} alt={tags} src={webformatURL} onClick={this.openModal} />
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
      ));
    }

    if (status === 'resolved') {
      return (
        <>
          {responseData.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <GalleryItem key={id}>
                <Img
                  id={id}
                  alt={tags}
                  src={webformatURL}
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

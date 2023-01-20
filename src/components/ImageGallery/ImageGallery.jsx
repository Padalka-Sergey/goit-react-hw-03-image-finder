import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { TitleVisoutImg } from 'components/App/App.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    dataQty: null,
    status: 'idle',
    page: 1,
  };

  static propTypes = {
    textForm: PropTypes.string.isRequired,
  };

  onFetchTotal = data => {
    this.setState({ dataQty: data });
  };

  onStatusFunc = data => {
    this.setState({ status: data });
  };

  onClickBtn = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { textForm } = this.props;
    const { page, status, dataQty } = this.state;

    return (
      <>
        {textForm && (
          <ImageList>
            <ImageGalleryItem
              onFetchTotal={this.onFetchTotal}
              textForm={textForm}
              statusFunc={this.onStatusFunc}
              status={status}
              page={page}
            />
          </ImageList>
        )}
        {status === 'pending' && <Loader />}
        {dataQty === 0 && (
          <TitleVisoutImg>Картинки с именем {textForm} нет :(</TitleVisoutImg>
        )}
        {dataQty > 0 && status !== 'pending' && (
          <Button onClickBtn={this.onClickBtn} />
        )}
      </>
    );
  }
}

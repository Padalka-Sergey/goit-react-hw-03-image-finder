// import PropTypes from 'prop-types';
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

  onFetchTotal = data => {
    this.setState({ dataQty: data });
  };

  onState = data => {
    this.setState({ status: data });
  };

  onChangeStatePage = () => {
    this.setState({ page: 1 });
  };

  onClickBtn = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { textForm } = this.props;
    const { status, page, dataQty } = this.state;
    // console.log(this.state.page);
    return (
      <>
        <ImageList>
          <ImageGalleryItem
            // onStateChangeLetter={this.props.onStateChangeLetter}
            onFetchTotal={this.onFetchTotal}
            textForm={textForm}
            statusFunc={this.onState}
            onChangeStatePage={this.onChangeStatePage}
            status={status}
            page={page}
          />
        </ImageList>
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

// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onFilterHandler: PropTypes.func.isRequired,
// };

import React, { Component } from 'react';
import { AppContainer } from './App.styled';
import { SearchbarForm } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    textForm: '',
  };

  handleFormSubmit = textForm => {
    this.setState({ textForm });
  };

  render() {
    const { textForm } = this.state;
    return (
      <AppContainer>
        <SearchbarForm onSubmitProps={this.handleFormSubmit} />
        <ImageGallery textForm={textForm} />
      </AppContainer>
    );
  }
}

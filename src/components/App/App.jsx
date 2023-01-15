import React, { Component } from 'react';
import { AppContainer } from './App.styled';
import { SearchbarForm } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    textForm: '',
    // dataLetter: '',
  };

  handleFormSubmit = textForm => {
    this.setState({ textForm });
    // this.setState({ dataLetter: this.state.textForm });
  };

  // onStateFormLetter = dataLetter => {
  //   this.setState({ dataLetter });
  // };

  // onStateChangeLetter = () => {
  //   this.onStateFormLetter();
  // };

  render() {
    return (
      <AppContainer>
        <SearchbarForm
          onSubmitProps={this.handleFormSubmit}
          // onResetPage={this.onResetPage}
          // onStateFormLetter={this.onStateFormLetter}
        />
        <ImageGallery
          // onStateChangeLetter={this.state.dataLetter}
          textForm={this.state.textForm}

          // onFetchTotal={this.onFetchTotal}
        ></ImageGallery>
      </AppContainer>
    );
  }
}

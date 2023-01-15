import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Form, Btn, Input, Searhbar, BtnSpan } from './Searchbar.styled';

export class SearchbarForm extends Component {
  state = {
    textFormLetter: '',
  };

  // static propTypes = {
  //   onSubmitProps: PropTypes.func.isRequired,
  // };

  handleTextFormChange = event => {
    this.setState({ textFormLetter: event.currentTarget.value.toLowerCase() });
    // localStorage.removeItem('data');
    // setTimeout(() => {
    //   this.props.onStateFormLetter(this.state.textFormLetter);
    // }, 10);
  };

  handleSubmit = event => {
    const { textFormLetter } = this.state;
    event.preventDefault();
    // this.props.onResetPage (1);

    if (textFormLetter.trim() === '') {
      alert('Введите текст');
      return;
    }

    this.props.onSubmitProps(textFormLetter);
  };

  render() {
    const { textFormLetter } = this.state;
    return (
      <Searhbar>
        <Form onSubmit={this.handleSubmit}>
          <Btn type="submit">
            <BtnSpan>Search</BtnSpan>
          </Btn>
          <Input
            type="text"
            name="textForm"
            value={textFormLetter}
            onChange={this.handleTextFormChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Searhbar>
    );
  }
}

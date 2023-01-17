import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Btn, Input, Searhbar, BtnSpan } from './Searchbar.styled';

export class SearchbarForm extends Component {
  state = {
    textFormLetter: '',
  };

  static propTypes = {
    onSubmitProps: PropTypes.func.isRequired,
  };

  handleTextFormChange = event => {
    const evtValue = event.currentTarget.value.toLowerCase();
    this.setState({ textFormLetter: evtValue });
  };

  handleSubmit = event => {
    const { textFormLetter } = this.state;
    const { onSubmitProps } = this.props;

    event.preventDefault();

    if (textFormLetter.trim() === '') {
      alert('Введите текст');
      return;
    }

    onSubmitProps(textFormLetter);
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

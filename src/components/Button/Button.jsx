import PropTypes from 'prop-types';

import { Btn } from './Button.styled';

export const Button = ({ onClickBtn }) => {
  return (
    <Btn type="button" onClick={() => onClickBtn()}>
      Load more
    </Btn>
  );
};

Button.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
};

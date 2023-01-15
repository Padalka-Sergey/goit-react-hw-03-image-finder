// import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#2941c9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClassName=""
      visible={true}
    />
  );
};

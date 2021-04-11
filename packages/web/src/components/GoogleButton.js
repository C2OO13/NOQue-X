import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { checkAuth } from '../store/ducks';
import toast from 'react-hot-toast';

const GoogleButton = () => {
  const dispatch = useDispatch();
  const authEndPoint = `/api/auth/google`;

  const initOAuthWindow = () => {
    let url = process.env.NODE_ENV === 'development' ? 'localhost:5000' : window.location.host;

    window.open(
      `${window.location.protocol}//${url}${authEndPoint}`,
      '__blank',
      'width=500&height=800'
    );
    window.addEventListener('message', event => {
      if (event.data === 'success') {
        dispatch(checkAuth())
          .then(() => {
            toast.success('Login success');
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    });
  };

  return (
    <Button
      icon={<GoogleOutlined />}
      onClick={initOAuthWindow}
      shape="round"
      size="large"
      type="primary"
    >
      Login With Google
    </Button>
  );
};
export default GoogleButton;

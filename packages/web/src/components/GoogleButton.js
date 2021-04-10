import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { SERVER_URL } from '../config';
import { checkAuth } from '../store/ducks';
import toast from 'react-hot-toast';

const GoogleButton = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const authEndPoint = `/api/auth/google`;
  const authURL = SERVER_URL + authEndPoint;

  const succssEventListener = useCallback(() => {
    window.addEventListener('message', event => {
      if (event.origin === SERVER_URL && event.data===('success')) {
        dispatch(checkAuth())
          .then(() => toast.success('Logged In successfully!'))
          .catch(err => toast.error(err));
      }
    });
  }, [dispatch]);

  const initOAuth = () => {
    setIsLoading(true);
    window.open(authURL, '__blank', 'width=500&height=800');
    succssEventListener();
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('message', succssEventListener);
    };
  }, [succssEventListener]);

  return (
    <Button
      icon={<GoogleOutlined />}
      onClick={initOAuth}
      loading={isLoading}
      shape="round"
      size="large"
      type="primary"
    >
      Login With Google
    </Button>
  );
};
export default GoogleButton;

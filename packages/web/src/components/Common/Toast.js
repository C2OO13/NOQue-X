import theme from '../../config/theme';
import { Toaster } from 'react-hot-toast';
import { InfoCircleOutlined } from '@ant-design/icons';

const Toast = ({ styles, position, reverseOrder }) => {
  const stylesDefault = {
    // add default styles
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    fontSize: '14px',
    borderRadius: '10px',
    ...styles,
  };
  const toastOptionsDefault = {
    success: {
      style: {
        ...stylesDefault,
        backgroundColor: theme.colors.greenlight,
        color: theme.colors.green,
      },
      iconTheme: {
        primary: theme.colors.green,
        secondary: theme.colors.greenlight,
      },
      duration: 3500,
    },
    error: {
      style: {
        ...stylesDefault,
        backgroundColor: theme.colors.redlight,
        color: theme.colors.red,
      },
      iconTheme: {
        primary: theme.colors.red,
        secondary: theme.colors.redlight,
      },
      duration: 5500,
    },
    loading: {
      style: {
        ...stylesDefault,
        color: theme.colors.primary,
        backgroundColor: theme.colors.white,
      },
      iconTheme: {
        primary: theme.colors.primary,
        secondary: theme.colors.accent,
      },
    },
    blank: {
      icon: <InfoCircleOutlined />,
      style: {
        ...stylesDefault,
        color: theme.colors.yellow,
        backgroundColor: theme.colors.yellowlight,
      },
    },
  };
  return (
    <Toaster
      toastOptions={toastOptionsDefault}
      position={position ? position : 'bottom-right'}
      reverseOrder={reverseOrder}
    />
  );
};

export default Toast;

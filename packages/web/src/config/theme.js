const colors = {
  primary: '#586FFA',
  secondary: '#8B9AF4',
  light: '#A5B1FC',
  accent: '#E5E9FF',
  offwhite: '#EAEEFF',
  white: '#FBFBFF',
  black: '#24292E',
  gray: '#A5ADC6',
  green: '#2AE44F',
  greenlight: '#CEFDD7',
  yellow: '#FFD43B',
  yellowlight: '#FFFCE2',
  red: '#D73A49',
  redlight: '#FFDADA',
  cardBg: '#F7F8FF',
};

const size = {
  mobileS: '320px',
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopL: '1440px',
};
const shadows = {
  xsmall: `0px 5px 10px rgba(0, 0, 0, 0.05)`,
  small: `0 5px 10px rgba(0, 0, 0, 0.1)`,
  medium: `0px 10px 10px rgba(0, 0, 0, 0.2)`,
};
const theme = {
  colors,
  shadows,
  border: `2px solid ${colors.offwhite}`,
  space: {
    none: 0,
    small: 5,
    medium: 10,
    large: 15,
    xlarge: 30,
    huge: 40,
  },
  spacings: {
    top: 40,
    bottom: 40,
    left: 25,
    right: 25,
    my: '20px',
    mx: '20px',
  },
  media: {
    mobileS: `max-width: ${size.mobileS}`,
    mobile: `max-width: ${size.mobile}`,
    tablet: `max-width: ${size.tablet}`,
    minTablet: `min-width: ${size.tablet}`,
    desktop: `max-width: ${size.desktop}`,
    desktopL: `max-width: ${size.desktopL}`,
  },
};

export default theme;

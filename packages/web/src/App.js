import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import MainRouter from './routes/routes';
import GlobalStyles from './styles/globalStyles';
import { Router } from 'react-router';
import { history, store } from './store';
import theme from './config/theme';
import Toast from './components/Common/Toast';

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Toast />
        <GlobalStyles />
        <MainRouter />
      </Router>
    </ThemeProvider>
  </StoreProvider>
);

export default App;

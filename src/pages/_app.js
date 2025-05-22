import '../styles/globals.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store';
import { AuthContextProvider } from '../context/AuthContext';
import Header from '@/components/Header';


function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store';
import { AuthContextProvider } from '../context/AuthContext';
import Header from '../components/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Header />
        {isClient ? (
          <PersistGate loading={null} persistor={store.__persistor}>
            <Component {...props.pageProps} />
          </PersistGate>
        ) : (
          <Component {...props.pageProps} />
        )}
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;

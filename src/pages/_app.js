import '../styles/globals.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store';
import { AuthContextProvider } from '../context/AuthContext';


function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return(
    <Provider store={store}>
      <AuthContextProvider>
   <Component {...pageProps} />
   </AuthContextProvider>
   </Provider>
  )
}

export default MyApp;
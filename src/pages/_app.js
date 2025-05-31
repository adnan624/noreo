import '../styles/globals.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store';
import { AuthContextProvider } from '../context/AuthContext';
import Header from '../components/Header';
import CartNotification from '../components/CartNotification';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { hideCartNotification } from '../store/slices/cartSlice/cartSlice';

// Create a wrapper component to access Redux state
function AppWithNotification({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { notificationProductId, items: cartItems } = useSelector(state => state.cart);
  const [currentRoute, setCurrentRoute] = useState('');
  
  // Update current route when router changes
  useEffect(() => {
    setCurrentRoute(router.asPath);
  }, [router.asPath]);
  
  // Find the product that triggered the notification
  const notificationProduct = cartItems.find(item => item.uniqueId === notificationProductId);
  const showNotification = notificationProductId && notificationProduct;
  
  // Check if current page should show notifications
  const isHomePage = currentRoute === '/';
  const isProductsPage = currentRoute === '/products' || currentRoute.startsWith('/products?');
  const shouldShowNotification = (isHomePage || isProductsPage) && showNotification;



  return (
    <>
      <Header />
      <Component {...pageProps} />
      {shouldShowNotification && (
        <CartNotification
          product={notificationProduct}
          onClose={() => dispatch(hideCartNotification())}
          show={true}
        />
      )}
    </>
  );
}

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      <AuthContextProvider>
        {isClient ? (
          <PersistGate loading={null} persistor={store.__persistor}>
            <AppWithNotification Component={Component} pageProps={props.pageProps} />
          </PersistGate>
        ) : (
          <AppWithNotification Component={Component} pageProps={props.pageProps} />
        )}
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;
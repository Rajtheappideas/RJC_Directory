import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
            console.log(
                'Service Worker registered with scope:',
                registration.scope
            );
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}
root.render(
    <Auth0Provider
        domain="dev-6oo17yuvbu7m0pa0.us.auth0.com"
        clientId="CBc1isuUy4poM9NoR5jxgOIjUAKiTuun"
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </Auth0Provider>
);

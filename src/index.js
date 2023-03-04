import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { store } from 'redux/store';
import { Provider } from 'react-redux';
import 'modern-normalize/modern-normalize.css';
import 'index.css';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
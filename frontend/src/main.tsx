import { createRoot } from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import { Store } from './states/Store';
createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>
  <Provider store={Store}>
    <App />
  </Provider>

  // </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TrackerProvider } from './state/store.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrackerProvider>
      <App />
    </TrackerProvider>
  </StrictMode>,
);

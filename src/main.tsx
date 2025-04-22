
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './MatrixStyles.css';
import { MonitoringService } from './services/monitoring-service';

// Initialize monitoring services
MonitoringService.initialize();

// Set document title
document.title = "DEVONN.AI Moneyhub | AI-Powered Financial Platform";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

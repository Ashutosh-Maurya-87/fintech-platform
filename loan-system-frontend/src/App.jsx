import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './pages/Overview'; // Import the Overview cards component
import LoanForm from './features/application/LoanForm';
import LmsDashboard from './features/management/LmsDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Default index route rendering the summary cards Overview component */}
          <Route index element={<Overview />} />
          
          {/* Loan Origination Module Route */}
          <Route path="los" element={<LoanForm />} />
          
          {/* Loan Management Module Route */}
          <Route path="lms" element={<LmsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
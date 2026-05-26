import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";

import UploadPage from "./pages/UploadPage";
import SuspiciousRecordsPage from "./pages/SuspiciousRecordsPage";
import OrganizationsPage from "./pages/OrganizationsPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/uploads"
          element={<UploadPage />}
        />

        <Route
          path="/suspicious-records"
          element={<SuspiciousRecordsPage />}
        />
        <Route
          path="/organizations"
          element={<OrganizationsPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
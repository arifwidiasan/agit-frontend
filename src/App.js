import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import TambahKaryawan from "./pages/AddKaryawan";
import Detail from "./pages/Detail";
import UpdateKaryawan from "./pages/UpdateKaryawan";
import ListDeleted from "./pages/ListDeleted";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/list-deleted" element={<ListDeleted/>} />
        <Route path="/tambah-karyawan" element={<TambahKaryawan />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/update-karyawan/:id" element={<UpdateKaryawan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

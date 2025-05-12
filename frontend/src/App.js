import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Books from './pages/Books'
import Loans from './pages/Loans'
import ProtectedRoute from './proxy/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute> } />
        <Route path="/members" element={<ProtectedRoute roles ={['admin']}><Members /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
        <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
        <Route path='/unauthorized' element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;

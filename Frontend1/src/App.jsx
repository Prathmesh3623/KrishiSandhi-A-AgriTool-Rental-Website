import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Booking from './pages/Booking';



import AddTool from './pages/AddTool';   // ✅ updated
import BookTool from './pages/BookTool'; // ✅ updated
import AIRecommendation from './pages/AIRecommendation';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-tool" element={<AddTool />} />
          <Route path="/book-tool" element={<BookTool />} />
          <Route path="/ai-recommend" element={<AIRecommendation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
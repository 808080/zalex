import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Requests from './pages/Requests';

const App = () => {

  return <main>
    <Routes>
      <Route path="/" element={<Requests />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Requests />} />
    </Routes>
  </main>;
};

export default App;

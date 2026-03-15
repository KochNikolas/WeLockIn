import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryOverview from './views/CategoryOverview';
import ChallengeList from './views/ChallengeList';
import Home from './views/Home';
import { Settings, Profile } from './views/Misc';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="bg-zinc-950 text-zinc-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<CategoryOverview />} />
          <Route path="/category/:slug" element={<ChallengeList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;

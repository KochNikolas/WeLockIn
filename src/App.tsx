import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CategoryOverview from './views/CategoryOverview';
import ChallengeList from './views/ChallengeList';
import ChallengeDetail from './views/ChallengeDetail';
import ChallengeChat from './views/ChallengeChat';
import UserProfile from './views/UserProfile';
import Home from './views/Home';
import { Settings, Profile } from './views/Misc';
import Navbar from './components/Navbar';

const AppContent = () => {
  const location = useLocation();
  const isChat = location.pathname.includes('/chat');

  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<CategoryOverview />} />
        <Route path="/category/:slug" element={<ChallengeList />} />
        <Route path="/category/:slug/challenge/:challengeId" element={<ChallengeDetail />} />
        <Route path="/category/:slug/challenge/:challengeId/chat" element={<ChallengeChat />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!isChat && <Navbar />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

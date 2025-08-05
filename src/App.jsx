import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Quiz from "../Pages/Quiz";
import AttemptQuiz from "../Pages/AttemptQuiz";
import ProfileBar from "../components/ProfileBar";
import Dashboard from "../Pages/Dashboard";
import MyQuizzes from "../Pages/MyQuizzes";
import LiveModeQuiz from "../Pages/LiveModeQuiz";
import WaitingRoom from "../components/WaitingRoom";
import LiveQuiz from "../components/LiveQuiz";
import LandingPage from "../Pages/LandingPage";
import EditQuiz from "../Pages/EditQuiz";
import { useAuth } from '../context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="flex min-h-screen bg-[#1F1F1F]">
        {/* Left Sidebar - show only if logged in */}
        {user && (
          <div className="hidden md:block w-60 fixed left-0 top-0 bottom-0 z-10 bg-white shadow-md">
            <Navbar />
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 p-4 ${user ? 'md:ml-64 md:mr-64' : ''}`}>
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/about/QuizzifyMe" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/about/QuizzifyMe" />} />
            <Route path="/my-quizzes" element={user ? <MyQuizzes /> : <Navigate to="/about/QuizzifyMe" />} />
            <Route path="/live-mode" element={user ? <LiveModeQuiz /> : <Navigate to="/about/QuizzifyMe" />} />
            <Route path="/create-quiz" element={user ? <Quiz /> : <Navigate to="/about/QuizzifyMe" />} />
            <Route path="/quiz/waiting-room/:roomId" element={user ? <WaitingRoom /> : <Navigate to="/about/QuizzifyMe" />} />
            <Route path="/quiz/live-room/:roomId" element={user ? <LiveQuiz /> : <Navigate to="/about/QuizzifyMe" />} />
            <Route path="/edit-quiz/:quizId" element={user ? <EditQuiz /> : <Navigate to="/about/QuizzifyMe" />} />

            {/* Public Routes */}
            <Route path="/quiz/:username/:quizId" element={<AttemptQuiz />} />
            <Route path="/about/QuizzifyMe" element={<LandingPage />} />
          </Routes>
        </div>

        {/* Right Sidebar - show only if logged in */}
        {user && (
          <div className="hidden md:block w-64 fixed right-0 top-0 bottom-0 z-10 bg-white shadow-md">
            <ProfileBar />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

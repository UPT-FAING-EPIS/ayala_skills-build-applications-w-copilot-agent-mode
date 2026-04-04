import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navLinkClassName = ({ isActive }) =>
  `nav-link fw-semibold ${isActive ? 'active text-white' : 'text-white-50'}`;

function HomePage() {
  return (
    <main className="container py-4 py-lg-5">
      <section className="app-hero rounded-4 p-4 p-lg-5 mb-4">
        <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
        <h1 className="display-6 fw-bold mb-3">Frontend connected to the Django REST API.</h1>
        <p className="lead mb-0">
          Use the navigation menu to load activities, teams, users, workouts, and leaderboard data
          directly from the backend endpoints.
        </p>
      </section>

      <section className="row g-3">
        {[
          { title: 'Bootstrap tables', body: 'All resource views now share the same table layout.' },
          { title: 'Forms and filters', body: 'Each page has a Bootstrap search form above the table.' },
          { title: 'Modals and details', body: 'Buttons open a Bootstrap modal with record JSON.' },
        ].map((item) => (
          <div className="col-12 col-md-4" key={item.title}>
            <div className="card app-surface h-100">
              <div className="card-body">
                <h2 className="h5 fw-bold card-title">{item.title}</h2>
                <p className="card-text mb-0 text-muted">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function AppNavigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          OctoFit Tracker
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#octofitNav"
          aria-controls="octofitNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="octofitNav">
          <div className="navbar-nav ms-auto">
            <NavLink className={navLinkClassName} to="/activities">
              Activities
            </NavLink>
            <NavLink className={navLinkClassName} to="/teams">
              Teams
            </NavLink>
            <NavLink className={navLinkClassName} to="/users">
              Users
            </NavLink>
            <NavLink className={navLinkClassName} to="/workouts">
              Workouts
            </NavLink>
            <NavLink className={navLinkClassName} to="/leaderboard">
              Leaderboard
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-body-tertiary">
        <AppNavigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
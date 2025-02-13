import { Link } from 'react-router';

function LandingPage() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login/student">Login</Link>
          </li>
          <li>
            <Link to="/register/student">Register</Link>
          </li>
          <li>
            <Link to="/register">RBAC</Link>
          </li>
          <li>
            <Link to="/forgot-password">Forgot-password</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default LandingPage;

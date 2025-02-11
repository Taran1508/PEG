import { toast, ToastContainer } from 'react-toastify';
import './homePage.css';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem('token');
      let payload = '';
      let role = '';
      if (token) {
        payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('role', `${payload.role}`);
        role = localStorage.getItem('role');
        console.log(`/login/${role}`);
      }
      if (!token) {
        role = localStorage.getItem('role');
        console.log('mm' + role);
        alert(`Unauthorized! Please log in.`);
        window.location.href = `/login/${role}`;
        return;
      }
      const res = await fetch('http://localhost:5000/home', {
        headers: { Authorization: token },
      });
      const result = res.json();
      toast.success(result.message);
    };
    fetchToken();
  }, [navigate]);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
      });
      const res = await response.json();
      localStorage.removeItem('token');
      toast.success(res.message);
      setTimeout(() => {
        window.location.href = res.redirect;
      }, 3000);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 style={{ color: 'white' }}>Coming Soon!</h1>
      </div>
      <div>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
export default HomePage;

import { Link } from 'react-router-dom';
import './studentpage.css';
import { toast, ToastContainer } from 'react-toastify';
import logo from './Your paragraph text (4).png';

function JobseekerLogin() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];
  const optionList = ['google', 'github'];

  const handleLogin = async (provider) => {
    const userType = 'jobseeker';
    window.location.href = `http://localhost:5000/auth/${provider}?state=${encodeURIComponent(
      userType
    )}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Invalid email format');
      return;
    }
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      alert(
        'Password must be at least 8 characters and include one uppercase, one lowercase, and one special character'
      );
      return;
    }
    const data = {
      email: email,
      password: password,
      role: 'jobseeker',
    };
    console.log('Sending login data:', data);
    console.log('handleclick invoked');

    try {
      const response = await fetch('http://localhost:5000/login/jobseeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const res = await response.json();
      toast.success(res.message);
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      setTimeout(() => {
        window.location.href = res.redirect;
      }, 3000);
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <nav className="nav">
        <span className="logo">
          <img src={logo} alt="logo" className="logo" />
        </span>
        <ul className="navListL">
          {navList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </nav>

      <div className="LoginSub">Login into your Jobseeker Account</div>

      <div className="loginOptions">
        <div className="loginBoxes">
          <form method="POST" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email ID"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
            />
            <button className="loginButton" type="submit">
              Login to your Account &rarr;
            </button>
          </form>
        </div>

        <span className="or">/</span>

        <div className="optionBoxes">
          {optionList.map((item, index) => (
            <button
              key={index}
              className={index % 2 === 0 ? 'loginOptionReverse' : 'loginOption'}
              onClick={() => handleLogin(item)}
            >
              Sign In with {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="lforgotPassword">
        <Link to="/login/founder" className="login-Option">
          Login as Founder?
        </Link>
        <div className="lfp">
          <a href="www.google.com" className="other">
            Forgot Password?
          </a>
          <Link to="/register/jobseeker" className="others">
            New User? Create your Account!
          </Link>
        </div>
        <Link to="/login/company" className="login-OptionReverse">
          Login as Company?
        </Link>
      </div>

      <div className="footer">
        <span>Privacy Policy</span>
        <span>Copyright@PEG 2024</span>
      </div>
    </>
  );
}
export default JobseekerLogin;

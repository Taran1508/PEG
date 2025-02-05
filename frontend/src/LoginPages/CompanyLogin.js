import { Link } from 'react-router';
import './studentpage.css';

function CompanyLogin() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];
  const optionList = ['Google', 'Facebook', 'Apple'];
  // const roles = ["Student","Investor","Company"]

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
    };
    console.log('handleclick invoked');

    try {
      const response = await fetch('http://localhost:5000/login/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <nav>
        <span className="logo">UDBHAVX</span>
        <ul className="navList">
          {navList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <span className="signup">Sign In</span>
      </nav>

      <div className="LoginSub">Login into your Company Account</div>

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
            <a
              href="www.google.com"
              key={index}
              className={index % 2 === 0 ? 'loginOptionReverse' : 'loginOption'}
            >
              SignIn with {item}
            </a>
          ))}
        </div>
      </div>

      <div className="lforgotPassword">
        <Link to="/login/investor" className="login-Option">
          Login as Investor?
        </Link>
        <div className="lfp">
          <a href="www.google.com" className="other">
            Forgot Password?
          </a>
          <Link to="/register/company" className="others">
            New User? Create your Account!
          </Link>
        </div>
        <Link to="/login/student" className="login-OptionReverse">
          Login as Student?
        </Link>
      </div>

      <div className="footer">
        <span>Privacy Policy</span>
        <span>Copyright@PEG 2024</span>
      </div>
    </>
  );
}
export default CompanyLogin;

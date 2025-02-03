import { Link } from 'react-router-dom';
import './studentpage.css';

function StudentLogin() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];
  const optionList = ['Google', 'Facebook', 'Apple'];
  // const roles = ["Student","Investor","Company"]

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const password = formData.get('password');
    const data = {
      name: id,
      password: password,
    };
    console.log('handleclick invoked');

    try {
      const response = await fetch('http://localhost:5000/login/student', {
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
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <nav>
        <span className="logo">PEG</span>
        <ul className="navList">
          {navList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <span className="signup">Sign In</span>
      </nav>

      <div className="LoginSub">Login into your Student Account</div>

      <div className="loginOptions">
        <div className="loginBoxes">
          <form method="POST" onSubmit={handleSubmit}>
            <input type="text" name="id" placeholder="Enter your Login ID" />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
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
        <a href="www.google.com">Forgot Password?</a>
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
export default StudentLogin;

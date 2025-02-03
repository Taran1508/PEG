import { Link } from 'react-router';
import './studentRegister.css';

function InvestorRegister() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];
  // const roles = ["Student","Investor","Company"]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      num: formData.get('num'),
      linkedIn: formData.get('linkedIn'),
      password: formData.get('password'),
    };

    console.log('Handle Click Invoked');

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log('Response:', res);
    } catch (error) {
      console.log('Error:', error);
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

      <div className="LoginSub">Create your Investor Account</div>

      <div className="registerBox">
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter your Name" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter your Email" />
          <label htmlFor="num">Mobile No</label>
          <input
            type="telephone"
            name="num"
            placeholder="Enter your Mobile No"
          />
          <label htmlFor="linkedIn">LinkedIn</label>
          <input
            type="text"
            name="linkedIn"
            placeholder="Enter your Profile Link"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
          />
          <button type="submit" className="saveButton">
            Save
          </button>
        </form>
      </div>
      <div className="forgotPassword">
        <Link to="/register/company">Register as Company?</Link>
        <Link to="/register/student">Register as Student?</Link>
      </div>

      <div className="rfooter">
        <span>Privacy Policy</span>
        <span>Copyright@PEG 2024</span>
      </div>
    </>
  );
}
export default InvestorRegister;

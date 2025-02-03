import { Link } from 'react-router';
import './studentRegister.css';

function ComapanyRegister() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];
  // const roles = ["Student","Investor","Company"]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      companyName: formData.get('companyName'),
      regdno: formData.get('regdno'),
      gstin: formData.get('gstin'),
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

      <div className="LoginSub">Create your Company Account</div>

      <div className="registerBox">
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter your Name" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter your Email" />
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter your Company Name"
          />
          <label htmlFor="regdno">Registration Number</label>
          <input type="text" name="regdno" placeholder="Enter your Regd.no" />
          <label htmlFor="gstin">GSTIN.No</label>
          <input type="text" name="gstin" placeholder="Enter your GSTIN.No" />
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
        <Link to="/register/investor">Register as Investor?</Link>
        <Link to="/register/student">Register as Student?</Link>
      </div>
      <div className="rfooter">
        <span>Privacy Policy</span>
        <span>Copyright@PEG 2024</span>
      </div>
    </>
  );
}
export default ComapanyRegister;

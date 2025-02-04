import { Link } from 'react-router';
import './studentRegister.css';

function ComapanyRegister() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];
  // const roles = ["Student","Investor","Company"]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
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
      name: formData.get('name'),
      email: email,
      companyName: formData.get('companyName'),
      regdno: formData.get('regdno'),
      gstin: formData.get('gstin'),
      password: password,
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
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
          />
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter your Company Name"
            required
          />
          <label htmlFor="regdno">Registration Number</label>
          <input
            type="text"
            name="regdno"
            placeholder="Enter your Regd.no"
            required
          />
          <label htmlFor="gstin">GSTIN.No</label>
          <input
            type="text"
            name="gstin"
            placeholder="Enter your GSTIN.No"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            required
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

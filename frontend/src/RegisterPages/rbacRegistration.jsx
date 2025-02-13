import { toast, ToastContainer } from 'react-toastify';
import './studentRegister.css';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../LoginPages/Your paragraph text (4).png';

function RbacRegister() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const confirmPassword = formData.get('confirmPassword').trim();
    const role = formData.get('role').trim();

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
    if (confirmPassword !== password) {
      alert("Passwords doesn't Match");
      return;
    }

    const data = {
      name: formData.get('name'),
      email: email,
      num: formData.get('num'),
      role: role,
      password: password,
    };

    console.log('Handle Click Invoked');

    try {
      const response = await fetch(`http://localhost:5000/register/${role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      toast.success(res.message);

      setTimeout(() => {
        window.location.href = res.redirect;
      }, 3000);

      console.log('Response:', res);
    } catch (error) {
      console.log('Error:', error);
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

      <div className="LoginSub">Create your Account</div>

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
          <label htmlFor="role">Select your Role:</label>
          <select name="role">
            <option value="student">Student</option>
            <option value="investor">Investor</option>
            <option value="company">Company</option>
            <option value="jobseeker">Jobseeker</option>
            <option value="founder">Founder</option>
          </select>
          <label htmlFor="num">Mobile No</label>
          <input
            type="telephone"
            name="num"
            placeholder="Enter your Mobile No"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            name="confirmPassword"
            placeholder="Re-enter your Password"
            required
          />
          <button type="submit" className="saveButton">
            Save
          </button>
        </form>
      </div>
      <div className="rfooter">
        <span>Privacy Policy</span>
        <span>Copyright@PEG 2024</span>
      </div>
    </>
  );
}
export default RbacRegister;

import { toast, ToastContainer } from 'react-toastify';
import '../RegisterPages/studentRegister.css';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../LoginPages/Your paragraph text (4).png';

function ForgotPassword() {
  const navList = ['Product', 'Resources', 'Support', 'Pricing', 'Blog'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const role = formData.get('role').trim();

    const data = {
      email: email,
      role: role,
    };

    console.log('Handle Click Invoked');

    try {
      const response = await fetch(`http://localhost:5000/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      toast.success(res.message);

      //   setTimeout(() => {
      //     window.location.href = res.redirect;
      //   }, 3000);

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

      <div className="LoginSub">Reset your Account</div>

      <div className="registerBox">
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
          />
          <label htmlFor="role">Select your Role:</label>
          <select name="role" required>
            <option value="student">Student</option>
            <option value="investor">Investor</option>
            <option value="company">Company</option>
            <option value="jobseeker">Jobseeker</option>
            <option value="founder">Founder</option>
          </select>

          <button type="submit" className="saveButton">
            Send Reset-link
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
export default ForgotPassword;

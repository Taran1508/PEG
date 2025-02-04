import { Link } from 'react-router';
import './studentRegister.css';

function StudentRegister() {
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
      collegeName: formData.get('collegeName'),
      courseName: formData.get('courseName'),
      linkedIn: formData.get('linkedIn'),
      password: password,
    };

    console.log('Handle Click Invoked');

    try {
      const response = await fetch('http://localhost:5000/register/student', {
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

      <div className="LoginSub">Create your Student Account</div>

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
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            name="collegeName"
            placeholder="Enter your College Name"
            required
          />
          <label htmlFor="courseName">Course</label>
          <input
            type="text"
            name="courseName"
            placeholder="Enter your Course Name"
            required
          />
          <label htmlFor="linkedIn">LinkedIn</label>
          <input
            type="text"
            name="linkedIn"
            placeholder="Enter your Profile Link"
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
        <Link to="/register/company">Register as Company?</Link>
      </div>
      <div className="rfooter">
        <span>Privacy Policy</span>
        <span>Copyright@PEG 2024</span>
      </div>
    </>
  );
}
export default StudentRegister;

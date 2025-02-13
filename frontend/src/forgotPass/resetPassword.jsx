import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './forgot.css';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get('password').trim();
    const confirmPassword = formData.get('confirmPassword').trim();

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
      password: password,
    };
    console.log(data);

    console.log('Handle Click Invoked');

    try {
      const response = await fetch(
        `http://localhost:5000/reset-password/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      toast.success(res.message);
      setTimeout(() => {
        window.location.href = res.redirect;
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reset-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="forgotBox">
        <h1>Reset your Password</h1>
        <form className="formBox" onSubmit={handleResetPassword}>
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
          <button type="submit" className="saveB">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

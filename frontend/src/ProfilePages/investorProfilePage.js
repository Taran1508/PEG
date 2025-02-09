import { useEffect } from 'react';
import './profilePage.css';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import SessionTrack from '../Config/sessionTrack';

function InvestorProfilePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const token =
        localStorage.getItem('token') ||
        new URLSearchParams(window.location.search).get('token');

      if (token) {
        localStorage.setItem('token', token);
        window.history.replaceState({}, document.title, '/profile/investor');
      }

      if (!token) {
        alert('Unauthorized! Please log in.');
        navigate('/login/investor');
        return;
      }

      const res = await fetch('http://localhost:5000/profile/investor', {
        headers: { Authorization: token },
      });

      const result = res.json();
      toast.success(result.message);
    };
    fetchToken();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      investor_type: formData.get('investor_type'),
      investment_range: formData.get('investment_range'),
      preferred_startup_stages: formData.get('preferred_startup_stages'),
      industries_interested_in: formData.get('industries_interested_in'),
      portfolio: [
        {
          startup_name: formData.get('portfolio_startup_name'),
          website: formData.get('portfolio_website'),
        },
      ],
      mode_of_investment: formData.get('mode_of_investment'),
      availability_for_mentorship: formData.get('availability_for_mentorship'),
      social_links: {
        github: formData.get('github'),
        linkedin: formData.get('linkedin'),
        personal_website: formData.get('personal_website'),
        twitter: formData.get('twitter'),
        instagram: formData.get('instagram'),
        threads: formData.get('threads'),
      },
    };

    console.log('Sending login data:', data);
    console.log('handleclick invoked');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/profile/investor', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const res = await response.json();
      toast.success(res.message);
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
      <SessionTrack page="investor" />
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 className="heading">Complete your Investor Profile</h1>
      </div>
      <div className="profileFormBox">
        <div className="investorBox">
          <form
            method="POST"
            encType="multipart/form-data"
            className="profileForm"
            onSubmit={handleSubmit}
          >
            <label>
              Investor Type:
              <select name="investor_type" required>
                <option value="">Select Investor Type</option>
                <option value="Angel Investor">Angel Investor</option>
                <option value="Venture Capitalist">Venture Capitalist</option>
                <option value="Corporate VC">Corporate VC</option>
                <option value="Govt Fund">Govt Fund</option>
              </select>
            </label>

            <br />

            <label>
              Investment Range:
              <select name="investment_range" required>
                <option value="">Select Investment Range</option>
                <option value="₹5L - ₹50L">₹5L - ₹50L</option>
                <option value="₹50L - ₹2Cr">₹50L - ₹2Cr</option>
                <option value="₹2Cr+">₹2Cr+</option>
              </select>
            </label>

            <br />

            <fieldset>
              <legend>Preferred Startup Stages:</legend>
              <label>
                <input
                  type="checkbox"
                  name="preferred_startup_stages"
                  value="Idea"
                />{' '}
                Idea
              </label>
              <label>
                <input
                  type="checkbox"
                  name="preferred_startup_stages"
                  value="MVP"
                />{' '}
                MVP
              </label>
              <label>
                <input
                  type="checkbox"
                  name="preferred_startup_stages"
                  value="Growth"
                />{' '}
                Growth
              </label>
              <label>
                <input
                  type="checkbox"
                  name="preferred_startup_stages"
                  value="Scale-up"
                />{' '}
                Scale-up
              </label>
            </fieldset>

            <br />

            <label>
              Industries Interested In:
              <input
                type="text"
                name="industries_interested_in"
                placeholder="Enter industries"
              />
            </label>

            <br />

            <fieldset>
              <legend>Mode of Investment:</legend>
              <label>
                <input
                  type="checkbox"
                  name="mode_of_investment"
                  value="Equity"
                />{' '}
                Equity
              </label>
              <label>
                <input type="checkbox" name="mode_of_investment" value="Debt" />{' '}
                Debt
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mode_of_investment"
                  value="Convertible Note"
                />{' '}
                Convertible Note
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mode_of_investment"
                  value="Grants"
                />{' '}
                Grants
              </label>
            </fieldset>

            <br />

            <label>
              Availability for Mentorship:
              <input type="checkbox" name="availability_for_mentorship" />
            </label>

            <br />

            <div className="outerBoxInv">
              <fieldset className="fieldSetBoxInv">
                <legend>Portfolio:</legend>
                <label>Startup Name:</label> <br />
                <input type="text" name="portfolio_startup_name" />
                <br />
                <label>Website:</label>
                <br />
                <input type="url" name="portfolio_website" />
              </fieldset>

              <br />

              <fieldset className="fieldSetBoxInv">
                <legend>Social Links:</legend>
                <label>GitHub:</label>
                <br />
                <input type="url" name="github" />
                <br />
                <label>LinkedIn:</label>
                <br />
                <input type="url" name="linkedin" />
                <br />
                <label>Personal Website:</label>
                <br />
                <input type="url" name="personal_website" />
                <br />
                <label>Twitter:</label>
                <br /> <input type="url" name="twitter" />
                <br />
                <label>Instagram:</label>
                <br /> <input type="url" name="instagram" />
                <br />
                <label>Threads:</label>
                <br />
                <input type="url" name="threads" />
              </fieldset>
            </div>
            <br />

            <button type="submit" className="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default InvestorProfilePage;

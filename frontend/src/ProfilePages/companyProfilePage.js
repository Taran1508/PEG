import { useEffect } from 'react';
import './profilePage.css';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import SessionTrack from '../Config/sessionTrack';

function CompanyProfilePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const token =
        localStorage.getItem('token') ||
        new URLSearchParams(window.location.search).get('token');

      if (token) {
        localStorage.setItem('token', token);
        window.history.replaceState({}, document.title, '/profile/company');
      }

      if (!token) {
        alert('Unauthorized! Please log in.');
        navigate('/login/company');
        return;
      }

      const res = await fetch('http://localhost:5000/profile/company', {
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
      company_details: {
        website: formData.get('company_details.website'),
        industry: formData.get('company_details.industry'),
      },

      company_size: formData.get('company_size'),

      stage_of_company: formData.get('stage_of_company'),

      hiring_for: [formData.get('hiring_for')],

      funding_status: formData.get('funding_status'),

      looking_for: [formData.get('looking_for')],

      company_pitch_deck: formData.get('company_pitch_deck'),

      social_links: {
        github: formData.get('social_links.github'),
        linkedin: formData.get('social_links.linkedin'),
        personal_website: formData.get('social_links.personal_website'),
        twitter: formData.get('social_links.twitter'),
        instagram: formData.get('social_links.instagram'),
        threads: formData.get('social_links.threads'),
      },
    };

    console.log('Sending login data:', data);
    console.log('handleclick invoked');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/profile/company', {
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
      <SessionTrack page="company" />
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 className="heading">Complete your Company Profile</h1>
      </div>
      <div className="profileFormBox">
        <form
          method="POST"
          encType="multipart/form-data"
          className="profileForm"
          onSubmit={handleSubmit}
        >
          <label className="funding">Website:</label>
          <input
            type="text"
            name="company_details.website"
            className="fieldSetBoxComf"
            required
          />
          <label className="funding">Industry:</label>
          <input
            type="text"
            name="company_details.industry"
            className="fieldSetBoxComf"
            required
          />
          <label className="funding">Company Size:</label>
          <select name="company_size" className="fundingSelect" required>
            <option value="1-10">1-10</option>
            <option value="10-50">10-50</option>
            <option value="50-200">50-200</option>
            <option value="200+ employees">200+ employees</option>
          </select>
          <label className="funding">Stage of Company:</label>
          <select name="stage_of_company" className="fundingSelect" required>
            <option value="Idea Stage">Idea Stage</option>
            <option value="MVP">MVP</option>
            <option value="Early Traction">Early Traction</option>
            <option value="Growth">Growth</option>
          </select>
          <fieldset className="fieldSetBoxComf">
            <legend>Hiring For:</legend>
            <input type="checkbox" name="hiring_for" value="Interns" />
            <label>Interns</label>

            <input
              type="checkbox"
              name="hiring_for"
              value="Full-time Employees"
            />
            <label>Full-time Employees</label>

            <input type="checkbox" name="hiring_for" value="Freelancers" />
            <label>Freelancers</label>

            <input type="checkbox" name="hiring_for" value="Co-founders" />
            <label>Co-founders</label>
          </fieldset>
          <label className="funding">Funding Status:</label>
          <select name="funding_status" className="fundingSelect" required>
            <option value="Bootstrapped">Bootstrapped</option>
            <option value="Seed Funded">Seed Funded</option>
            <option value="Series A">Series A</option>
            <option value="Series B+">Series B+</option>
          </select>
          <fieldset className="fieldSetBoxComf">
            <legend>Looking For:</legend>
            <input type="checkbox" name="looking_for" value="Hiring" />
            <label>Hiring</label>

            <input type="checkbox" name="looking_for" value="Investors" />
            <label>Investors</label>

            <input type="checkbox" name="looking_for" value="Partnerships" />
            <label>Partnerships</label>

            <input
              type="checkbox"
              name="looking_for"
              value="Service Providers"
            />
            <label>Service Providers</label>
          </fieldset>
          <fieldset className="fieldSetBoxCom">
            <legend>Social Links:</legend>
            <label>Company Pitch Deck:</label>
            <br />
            <input type="file" name="company_pitch_deck" />
            <br />

            <label>GitHub:</label>
            <br />
            <input type="url" name="social_links.github" />
            <br />

            <label>LinkedIn:</label>
            <br />
            <input type="url" name="social_links.linkedin" />
            <br />

            <label>Personal Website:</label>
            <br />
            <input type="url" name="social_links.personal_website" />
            <br />

            <label>Twitter:</label>
            <br />
            <input type="url" name="social_links.twitter" />
            <br />

            <label>Instagram:</label>
            <br />
            <input type="url" name="social_links.instagram" />
            <br />

            <label>Threads:</label>
            <br />
            <input type="url" name="social_links.threads" />
          </fieldset>

          <button type="submit" className="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default CompanyProfilePage;

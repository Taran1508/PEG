import { useEffect } from 'react';
import './profilePage.css';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import SessionTrack from '../Config/sessionTrack';

function FounderProfilePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const token =
        localStorage.getItem('token') ||
        new URLSearchParams(window.location.search).get('token');

      if (token) {
        localStorage.setItem('token', token);
        window.history.replaceState({}, document.title, '/profile/founder');
      }

      if (!token) {
        alert('Unauthorized! Please log in.');
        navigate('/login/founder');
        return;
      }

      const res = await fetch('http://localhost:5000/profile/founder', {
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
      startup_stage: formData.get('startup_stage'),

      industry_domain: [formData.get('industry_domain')],

      looking_for: [formData.get('looking_for')],

      skills_expertise: [formData.get('skills_expertise')],

      problem_statement_overview: formData.get('problem_statement_overview'),

      business_model_overview: formData.get('business_model_overview'),

      pitch_deck: formData.get('pitch_deck'),

      funding_requirement: formData.get('funding_requirement'),

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
      const response = await fetch('http://localhost:5000/profile/founder', {
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
      <SessionTrack page="founder" />
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 className="heading">Complete your Founder Profile</h1>
      </div>
      <div className="profileFormBox">
        <div className="investorBox">
          <form
            method="POST"
            encType="multipart/form-data"
            className="profileForm"
            onSubmit={handleSubmit}
          >
            <label>Startup Stage:</label>
            <select name="startup_stage">
              <option value="Idea Stage">Idea Stage</option>
              <option value="MVP">MVP</option>
              <option value="Early Traction">Early Traction</option>
              <option value="Growth">Growth</option>
            </select>

            <fieldset>
              <legend>Industry Domain:</legend>
              <input type="checkbox" name="industry_domain" value="EdTech" />
              <label>EdTech</label>

              <input type="checkbox" name="industry_domain" value="FinTech" />
              <label>FinTech</label>

              <input type="checkbox" name="industry_domain" value="SaaS" />
              <label>SaaS</label>

              <input type="checkbox" name="industry_domain" value="AI" />
              <label>AI</label>

              <input type="checkbox" name="industry_domain" value="Other" />
              <label>Other</label>
            </fieldset>

            <fieldset>
              <legend>Looking For:</legend>
              <input type="checkbox" name="looking_for" value="Co-founder" />
              <label>Co-founder</label>

              <input type="checkbox" name="looking_for" value="Team Members" />
              <label>Team Members</label>

              <input type="checkbox" name="looking_for" value="Mentors" />
              <label>Mentors</label>

              <input type="checkbox" name="looking_for" value="Investors" />
              <label>Investors</label>

              <input type="checkbox" name="looking_for" value="Customers" />
              <label>Customers</label>
            </fieldset>

            <fieldset>
              <legend>Skills & Expertise:</legend>
              <input type="checkbox" name="skills_expertise" value="Product" />
              <label>Product</label>

              <input type="checkbox" name="skills_expertise" value="Tech" />
              <label>Tech</label>

              <input
                type="checkbox"
                name="skills_expertise"
                value="Marketing"
              />
              <label>Marketing</label>

              <input
                type="checkbox"
                name="skills_expertise"
                value="Business Development"
              />
              <label>Business Development</label>
            </fieldset>

            <label>Problem Statement Overview:</label>
            <textarea name="problem_statement_overview"></textarea>

            <label>Business Model Overview:</label>
            <textarea name="business_model_overview"></textarea>

            <label>Pitch Deck:</label>
            <input type="file" name="pitch_deck" />

            <label>Funding Requirement:</label>
            <select name="funding_requirement">
              <option value="Bootstrapped">Bootstrapped</option>
              <option value="Looking for Angel Investment">
                Looking for Angel Investment
              </option>
              <option value="VC funding">VC funding</option>
            </select>

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

export default FounderProfilePage;

import { useEffect } from 'react';
import './profilePage.css';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import SessionTrack from '../Config/sessionTrack';

function StudentProfilePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const token =
        localStorage.getItem('token') ||
        new URLSearchParams(window.location.search).get('token');

      if (token) {
        localStorage.setItem('token', token);
        window.history.replaceState({}, document.title, '/profile/student');
      }

      if (!token) {
        alert('Unauthorized! Please log in.');
        navigate('/login/student');
        return;
      }

      const res = await fetch('http://localhost:5000/profile/student', {
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
      education: {
        graduation: {
          college_university: formData.get(
            'education.graduation.college_university'
          ),
          degree: formData.get('education.graduation.degree'),
          year_of_study: formData.get('education.graduation.year_of_study'),
          branch: formData.get('education.graduation.branch'),
        },
        inter_diploma: {
          college_university: formData.get(
            'education.inter_diploma.college_university'
          ),
          diploma_or_inter: formData.get(
            'education.inter_diploma.diploma_or_inter'
          ),
          year_of_study: formData.get('education.inter_diploma.year_of_study'),
          major: formData.get('education.inter_diploma.major'),
        },
        schooling: {
          school: formData.get('education.schooling.school'),
          syllabus: formData.get('education.schooling.school'),
          year_of_study: formData.get('education.schooling.year_of_study'),
          address: formData.get('education.schooling.address'),
        },
      },
      skills_and_interests: {
        skills: formData.get('skills_and_interests.skills'),
        interests: formData.get('skills_and_interests.interests'),
      },
      portfolio: {
        github: formData.get('portfolio.github'),
        linkedIn: formData.get('portfolio.linkedIn'),
        personal_website: formData.get('portfolio.personal_website'),
      },
      looking_for: {
        internships: formData.get('looking_for.internships'),
        freelance_projects: formData.get('looking_for.freelance_projects'),
        startup: formData.get('looking_for.startup'),
        learning_teaching: formData.get('looking_for.learning_teaching'),
      },
      availability: formData.get('availability'),
    };

    console.log('Sending login data:', data);
    console.log('handleclick invoked');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/profile/student', {
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
      <SessionTrack page="student" />
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 className="heading">Complete your Student Profile</h1>
      </div>
      <div className="profileFormBox">
        <form
          method="POST"
          encType="multipart/form-data"
          className="profileForm"
          onSubmit={handleSubmit}
        >
          <h3>Education Details</h3>

          <div className="fieldSetOuterBox">
            <fieldset className="fieldSetBox">
              <legend>Graduation</legend>
              <label>College/University:</label> <br />
              <input
                type="text"
                name="education.graduation.college_university"
                required
              />
              <br />
              <label>Degree:</label>
              <br />
              <input type="text" name="education.graduation.degree" required />
              <br />
              <label>Year of Study:</label>
              <br />
              <input
                type="text"
                name="education.graduation.year_of_study"
                required
              />
              <br />
              <label>Branch:</label>
              <br />
              <input type="text" name="education.graduation.branch" required />
              <br />
            </fieldset>

            <fieldset className="fieldSetBox">
              <legend>Inter/Diploma</legend>
              <label>College/University:</label>
              <br />
              <input
                type="text"
                name="education.inter_diploma.college_university"
                required
              />
              <br />
              <label>Diploma/Inter:</label>
              <br />
              <input
                type="text"
                name="education.inter_diploma.diploma_or_inter"
                required
              />
              <br />
              <label>Year of Study:</label>
              <br />
              <input
                type="text"
                name="education.inter_diploma.year_of_study"
                required
              />
              <br />
              <label>Major:</label>
              <br />
              <input
                type="text"
                name="education.inter_diploma.major"
                required
              />
            </fieldset>

            <fieldset className="fieldSetBox">
              <legend>Schooling</legend>
              <label>School:</label>
              <br />
              <input type="text" name="education.schooling.school" required />
              <br />
              <label>Syllabus:</label>
              <br />
              <input type="text" name="education.schooling.syllabus" required />
              <br />
              <label>Year of Study:</label>
              <br />
              <input
                type="text"
                name="education.schooling.year_of_study"
                required
              />
              <br />
              <label>Address:</label>
              <br />
              <input type="text" name="education.schooling.address" required />
            </fieldset>
          </div>
          <div className="skillsOuterBox">
            <div className="skillsInnerBox">
              <h3>Skills & Interests</h3>
              <label>Skills:</label>
              <br />
              <input type="text" name="skills_and_interests.skills" required />
              <br />

              <label>Interests:</label>
              <br />
              <input
                type="text"
                name="skills_and_interests.interests"
                required
              />
              <br />
            </div>
            <div className="skillsInnerBox">
              <h3>Portfolio</h3>
              <label>GitHub:</label>
              <br />
              <input type="url" name="portfolio.github" required />
              <br />

              <label>LinkedIn:</label>
              <br />
              <input type="url" name="portfolio.linkedIn" required />
              <br />

              <label>Personal Website:</label>
              <br />
              <input type="url" name="portfolio.personal_website" />
              <br />
            </div>
          </div>
          <div className="finalOuterBox">
            <div className="finalInnerBox1">
              <h3>Looking For Opportunities</h3>
              <label>Internships:</label>
              <input type="checkbox" name="looking_for.internships" />
              <br />

              <label>Freelance Projects:</label>
              <input type="checkbox" name="looking_for.freelance_projects" />
              <br />

              <label>Startup:</label>
              <input type="checkbox" name="looking_for.startup" />
              <br />

              <label>Learning/Teaching:</label>
              <input type="checkbox" name="looking_for.learning_teaching" />
              <br />
            </div>
            <div className="finalInnerBox1">
              <div className="finalInnerBox2">
                <h3>Resume Upload (PDF format)</h3>
                <label>Resume (PDF):</label>
                <input type="file" name="resume.pdf_url" accept=".pdf" />
              </div>

              <div className="finalInnerBox2">
                <h3>Employment Availability</h3>
                <label>Availability:</label>
                <select name="availability" required>
                  <option value="Fulltime">Fulltime</option>
                  <option value="Parttime">Parttime</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default StudentProfilePage;

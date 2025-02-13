import { useEffect, useRef } from 'react';
import './profilePage.css';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import SessionTrack from '../Config/sessionTrack';

function JobseekerProfilePage() {
  const imageRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const token =
        localStorage.getItem('token') ||
        new URLSearchParams(window.location.search).get('token');

      if (token) {
        localStorage.setItem('token', token);
        window.history.replaceState({}, document.title, '/profile/jobseeker');
      }

      if (!token) {
        alert('Unauthorized! Please log in.');
        navigate('/login/jobseeker');
        return;
      }

      const res = await fetch('http://localhost:5000/profile/jobseeker', {
        headers: { Authorization: token },
      });

      const result = res.json();
      toast.success(result.message);
    };
    fetchToken();
  }, [navigate]);

  const handlePfp = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = event.target.pfp.files[0];

    if (!fileInput) {
      console.error('No file selected!');
      return;
    }

    if (fileInput) {
      const imageUrl = URL.createObjectURL(fileInput);
      imageRef.current.src = imageUrl;
    }

    formData.append('pfp', fileInput);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:5000/profile/student/pfp',
        {
          method: 'PATCH',
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const res = await response.json();
      //imageRef.current.src = `http://localhost:5000/${res.imageUrl}`;
      toast.success(res.message);
      // setTimeout(() => {
      //   window.location.href = res.redirect;
      // }, 3000);
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRes = async (event) => {
    const formData = new FormData();
    const fileInput = event.target.files[0];
    console.log('Selected File:', event.target.files[0]);
    if (!fileInput) {
      console.error('No file selected!');
      return;
    }
    formData.append('resume', fileInput);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:5000/profile/jobseeker/res',
        {
          method: 'PATCH',
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const res = await response.json();
      toast.success(res.message);
      // setTimeout(() => {
      //   window.location.href = res.redirect;
      // }, 3000);
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      professional_experience: {
        total_experience: formData.get(
          'professional_experience.total_experience'
        ),
        industry: formData.get('professional_experience.industry'),
        current_ctc: formData.get('professional_experience.current_ctc'),
        expected_ctc: formData.get('professional_experience.expected_ctc'),
        latest_work_experience: {
          role: formData.get(
            'professional_experience.latest_work_experience.role'
          ),
          experience_in_current_role: formData.get(
            'professional_experience.latest_work_experience.experience_in_current_role'
          ),
          skills_learned_in_role: [
            formData.get(
              'professional_experience.latest_work_experience.experience_in_current_role'
            ),
          ],
        },
      },
      skills_expertise: [formData.get('skills_expertise')],
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
      availability: {
        notice_period: formData.get('availability.notice_period'),
      },
    };

    console.log('Sending login data:', data);
    console.log('handleclick invoked');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/profile/jobseeker', {
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
      <SessionTrack page="jobseeker" />
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 className="heading">Complete your Jobseeker Profile</h1>
      </div>
      <div className="profileFormBox">
        <div className="profile-container">
          <div className="profile-pic-wrapper">
            <img
              ref={imageRef}
              src="default-avatar.jpg"
              alt="Profile"
              className="profile-pic"
            />
          </div>

          <form
            className="upload-form"
            encType="multipart/form-data"
            onSubmit={handlePfp}
          >
            <label className="custom-file-upload">
              <input type="file" name="pfp" accept="image/jpeg, image/jpg" />
              Choose File
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
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
            </fieldset>
          </div>
          <label>Total Experience:</label>
          <input type="text" name="professional_experience.total_experience" />

          <label>Industry:</label>
          <input type="text" name="professional_experience.industry" />

          <label>Current CTC:</label>
          <input type="text" name="professional_experience.current_ctc" />

          <label>Expected CTC:</label>
          <input type="text" name="professional_experience.expected_ctc" />

          <label>Role:</label>
          <input
            type="text"
            name="professional_experience.latest_work_experience.role"
          />

          <label>Experience in Current Role:</label>
          <input
            type="text"
            name="professional_experience.latest_work_experience.experience_in_current_role"
          />

          <label>Skills Learned in Role:</label>
          <input
            type="text"
            name="professional_experience.latest_work_experience.skills_learned_in_role"
          />

          <div className="skillsOuterBox">
            <div className="skillsInnerBox">
              <label>Skills:</label>
              <br />
              <input type="text" name="skills_expertise" required />
              <br />
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

                <div className="upload-form-res">
                  <label className="custom-file-uploadres">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf"
                      onChange={handleRes}
                    />
                    Choose File
                  </label>
                </div>
              </div>

              <div className="finalInnerBox2">
                <h3>Employment Availability</h3>
                <label>Availability:</label>
                <input type="text" name="availability.notice_period" />
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

export default JobseekerProfilePage;

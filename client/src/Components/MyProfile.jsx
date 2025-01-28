import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/MyProfile.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const [complaints, setComplaints] = useState([]);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [activeSubTab, setActiveSubTab] = useState('submitted'); // St
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    className: "custom-toast",
  };
  const [userInfo, setUserInfo] = useState({ 
    email: '', 
    name: '',
    id: '',
    room: '',
    address: '',
    phone: '',
    parent: '',
  
  });
  const [menuPosition, setMenuPosition] = useState({});
  const [formData, setFormData] = useState({
    workSerialNumber: '',
    workStatus: '',
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    id: '',
    room: '',
    address: ''
  });
  const navigate = useNavigate();

  const showTab = (tab) => {
    setActiveTab(tab);
  };
  const showSubTab = (subTab) => {
    setActiveSubTab(subTab);
  };
  const toggleMenu = (event, index) => {
    const subMenuWrap = document.querySelectorAll('.sub-menu-wrap')[index];
    const { top, left, height } = event.target.getBoundingClientRect();

    setMenuPosition({
      top: window.scrollY + top + height,
      left: left,
    });

    if (subMenuWrap) {
      subMenuWrap.classList.toggle('open-menu');
    }
  };


  

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      }).catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/Signup', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      const fetchComplaints = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/complaints?studentID=${userInfo.id}`, {
            credentials: 'include',
          });
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          // Sort complaints in descending order based on the date
          const sortedComplaints = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setComplaints(sortedComplaints);
        } catch (error) {
          console.error('Error fetching complaints:', error);
        }
      };

      fetchComplaints();
    }
  }, [userInfo]);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/complaints/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the state with the updated complaint
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== id)
      );
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const handleSubmit = async (e, satisfactionLevel) => {
    e.preventDefault();
    try {
      // Increment workSerialNumber automatically
      const newFormData = { ...formData, workSerialNumber: complaints.length + 1, workStatus: satisfactionLevel };
  
      // Send a POST request to the backend to add the review
      const response = await axios.post('http://localhost:3000/api/reviews/reviews', newFormData, { withCredentials: true });
  
      if (response.status === 201) {
        console.log('Review submitted successfully:', response.data);
        // Clear form fields after submission
        setFormData({
          workSerialNumber: '',
          workStatus: ''
        });
      } else {
        console.error('Failed to submit review:', response.data);
      }
      toast("Complaint has been submitted successfully!", toastOptions);

    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };



  const filteredComplaints = complaints.filter(complaint => {
    if (activeSubTab === 'submitted') {
      return complaint.status === 'submitted';
    } else if (activeSubTab === 'in-process') {
      return complaint.status === 'in process';
    } else if (activeSubTab === 'completed') {
      return complaint.status === 'completed';
    }
    return false;
  });



  


  return (
    <div>
      <header className={isHeaderSticky ? "sticky" : ""}>
        <div className="logoandsearch">
          <div className="snk-logo">
            <span>SNK</span>
            <div className="hallvoice">
              Hall <div className="voice">Voice</div>
            </div>
          </div>
        </div>
        <nav>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/aboutus">ABOUT US</Link></li>
            <li><Link to="/notice">NOTICE</Link></li>
            <li><Link to="/myprofile">MY PROFILE</Link></li>
            <li><a  className="logout-btn" onClick={handleLogout}><button>LogOut</button></a></li>
            
          </ul>
        </nav>
      </header>
      <img 
        src="image/onnn.jpg" 
        alt="Your Image" 
        style={{ 
          width: '100%', 
          height: '38vh', 
          objectFit: 'cover', 
          objectPosition: 'center' 
        }} 
      />
      <div className="header__wrapper">
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img src="image/onnn.jpg" alt="Mehreen Rahman" />
            </div>
            <h2>{userInfo.id || "Loading..."}</h2>
            <p>Resident</p>
            <p>{userInfo.email || "Loading..."}</p>
            <ul className="about">
              <li><span>06</span>Posts</li>
              <li><span>02</span>Notifications</li>
            </ul>
            <div className="content">
              <p>
                Hey there! 👋 I'm { userInfo.name}, a resident of SNK Hall. I follow all SNK Hall rules and respect teachers, workers, and seniors, and I love the juniors.
              </p>
            </div>
          </div>
          <div className="right__col">
            <nav>
            <ul className="tabs">
                <li className={activeTab === 'posts' ? 'active' : ''} onClick={() => showTab('posts')}>
                  <span>Posts</span>
                </li>
                <li className={activeTab === 'personal-info' ? 'active' : ''} onClick={() => showTab('personal-info')}>
                  <span>Personal Information</span>
                </li>
                <li className={activeTab === 'contact-details' ? 'active' : ''} onClick={() => showTab('contact-details')}>
                  <span>Contact Details</span>
                </li>
              </ul>
            </nav>
            {activeTab === 'posts' && (
              <div id="posts" className="tab-content">
                <h2>Posts</h2>
                <nav>
                  <ul className="sub-tabs">
                    <li className={activeSubTab === 'submitted' ? 'active' : ''} onClick={() => showSubTab('submitted')}>
                      <span>Submitted Issues</span>
                    </li>
                    <li className={activeSubTab === 'in-process' ? 'active' : ''} onClick={() => showSubTab('in-process')}>
                      <span>In Process Issues</span>
                    </li>
                    <li className={activeSubTab === 'completed' ? 'active' : ''} onClick={() => showSubTab('completed')}>
                      <span>Completed Issues</span>
                    </li>
                  </ul>
                </nav>
                

                {activeSubTab === 'submitted' && (
                    <div id="submitted" className="tab-content">
                <div className="container">
                  {filteredComplaints.length === 0 ? (
                    <p>No complaints found.</p>
                  ) : (
                    filteredComplaints.map((complaint, index) => ( 
                      <div key={complaint._id} className="complaint">
                        <div className="mondumatha">
                          <p className="date-time"><i className="far fa-calendar-alt"></i> {new Date(complaint.date).toLocaleString()}</p>
                          <p>Status: {complaint.status}</p>
                          <p>{complaint.complaint}</p>
                        </div>
                       
                        <div className="sub-menu-wrap" style={{ top: menuPosition.top, left: menuPosition.left }}>
                          <div className="sub-menu">
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'satisfied'); }}>Satisfied</p>
                           
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'neutral'); }}>Neutral</p>
                          
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'dissatisfied'); }}>Dissatisfied</p>
                          
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  </div>
                </div>)}


                {activeSubTab === 'in-process' && (
                    <div id="submitted" className="tab-content">
                <div className="container">
                  {filteredComplaints.length === 0 ? (
                    <p>No complaints found.</p>
                  ) : (
                    filteredComplaints.map((complaint, index) => ( 
                      <div key={complaint._id} className="complaint">
                        <div className="mondumatha">
                          <p className="date-time"><i className="far fa-calendar-alt"></i> {new Date(complaint.date).toLocaleString()}</p>
                          <p>Status: {complaint.status}</p>
                          <p>{complaint.complaint}</p>
                        </div>
                        <div className="mondu">
                        
                        <p className="satis" onClick={(event) => toggleMenu(event, index)}>Are you satisfied?</p>
                        </div>
                        <div className="sub-menu-wrap" style={{ top: menuPosition.top, left: menuPosition.left }}>
                          <div className="sub-menu">
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'satisfied'); }}>Satisfied</p>
                     
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'neutral'); }}>Neutral</p>
                   
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'dissatisfied'); }}>Dissatisfied</p>
                       
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  </div>
                </div>)}


                {activeSubTab === 'completed' && (
                    <div id="submitted" className="tab-content">
                <div className="container">
                  {filteredComplaints.length === 0 ? (
                    <p>No complaints found.</p>
                  ) : (
                    filteredComplaints.map((complaint, index) => ( 
                      <div key={complaint._id} className="complaint">
                        <div className="mondumatha">
                          <p className="date-time"><i className="far fa-calendar-alt"></i> {new Date(complaint.date).toLocaleString()}</p>
                          <p>Status: {complaint.status}</p>
                          <p>{complaint.complaint}</p>
                        </div>
                        
                        <div className="sub-menu-wrap" style={{ top: menuPosition.top, left: menuPosition.left }}>
                          <div className="sub-menu">
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'satisfied'); }}>Satisfied</p>
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'content'); }}>Content</p>
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'neutral'); }}>Neutral</p>
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'displeased'); }}>Displeased</p>
                            <p className="subb" onClick={(e) => { handleStatusUpdate(complaint._id, 'completed'); handleSubmit(e, 'frustrated'); }}>Frustrated</p>
                            <p className="subb" onClick={() => handleStatusUpdate(complaint._id, 'completed')}>Would you like to submit the complaint again?</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  </div>
                </div>)}
              </div>
            )}
            {activeTab === 'personal-info' && (
              <div id="personal-info" className="tab-content">
                <h2>Personal Information</h2>
                <div className="container">
                  <div className="info-item">
                    <span className="info-label">Name:</span> {userInfo.name}
                  </div>
                  <div className="info-item">
                    <span className="info-label">ID:</span> {userInfo.id}
                  </div>
                  <div className="info-item">
                    <span className="info-label">Room:</span> {userInfo.room}
                  </div>
                  <div className="info-item">
                    <span className="info-label">Present Address:</span> {userInfo.present}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'contact-details' && (
              <div id="contact-details" className="tab-content">
                <h2>Contact Details</h2>
                <div className="container">
                  <div className="contact-item">
                    <span className="contact-label">Email:</span> {userInfo.email}
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Phone Number:</span> {userInfo.phone}
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Parents' Phone Number:</span> {userInfo.parent}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="menu__item"><a className="menu__link" href="#">JOIN US ON:</a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-facebook"></i></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-twitter"></i></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-linkedin"></i></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><i className="fab fa-instagram"></i></a></li>
        </ul>
        <ul className="menu">
          <li className="menu__item"><a className="menu__link" href="#">ABOUT US: SNK Hall Voice is a dedicated application designed to swiftly and efficiently handle student grievances while maintaining a commitment to continual improvement. Emphasizing user-friendliness, its primary objective is to optimize the resolution of complaints within the Shamsunnahar Khan Hall at Chittagong University of Engineering and Technology.</a></li>
        </ul>
        <hr className="separator" />
        <div className="copyright">
          <p>&copy; 2024 Hall Complaint Project. All rights reserved.</p>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default MyProfile;

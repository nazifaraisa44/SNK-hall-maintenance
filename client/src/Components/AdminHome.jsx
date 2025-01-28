import React, { useState, useEffect } from 'react';
import './css/AdminHome.css';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminHome = () => {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    className: "custom-toast",
  };
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setIsHeaderSticky(window.scrollY > 0);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !text.trim()) {
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/announcements', { title, text });
      setTitle('');
      setText('');

      toast("Complaint has been submitted successfully!", toastOptions);
    } catch (error) {
      console.error('Error posting announcement:', error);
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

  return (
    <div>
      <header className={isHeaderSticky ? 'sticky' : ''}>
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
          <li><Link to="/adminhome">HOME</Link></li>
          <li><Link to="/report">REPORT</Link></li>
          <li><Link to="/userinfo">STUDENTS' INFORMATION</Link></li>
          <li><Link to="/usercomplaint">STUDENTS' COMPLAINT</Link></li>
  
          <li><a  className="logout-btn" onClick={handleLogout}><button>LogOut</button></a></li>
          </ul>
        </nav>
      </header>
      <div className="image-container">
        <img src="image/home.png" alt="Your Image" />
      </div>
      <div className="announcement-header">
        <i className="fa-solid fa-person-chalkboard fa-3x announcement-icon"></i>
        <h2 className="announcement-title">Do you have any announcements to make?</h2>
      </div>
      <div className="announcement-text">
        <div className="announcement-form">
          <input
            type="text"
            placeholder="Title"
            className="announcement-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="10"
            cols="50"
            placeholder="Write your announcement here..."
            className="announcement-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="post-btn" onClick={handleSubmit}>Post</button>
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

export default AdminHome;

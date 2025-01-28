import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserComplaint = () => {
  const navigate = useNavigate();

    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    useEffect(() => {
        // Add scroll event listener when component mounts
        window.addEventListener("scroll", handleScroll);
        // Clear event listener when component unmounts
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    const handleScroll = () => {
        // Toggle sticky class based on scroll position
        setIsHeaderSticky(window.scrollY > 0);
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

<header className={isHeaderSticky ? "sticky" : ""}>
        <div className="logoandsearch">
          <div className="snk-logo">
            <span>SNK</span>
            <div className="hallvoice">
              Hall <div className="voice"> Voice</div>
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
        <img src="image/new.png" alt="Your Image" />
      </div>

      <section id="types_of_complaints">
        <div className="row">
          <div className="box col-lg-3">
            <i className="complaint_icon fa-solid fa-arrows-down-to-people fa-4x"></i>
            <a href="submitted_complaints.html">
              <h2 className="complaints_class">
              <Link to="/submittedcom">Submitted Complaints</Link>
                </h2>
            </a>
          </div>
          <div className="box col-lg-3">
            <i className="complaint_icon fa-solid fa-list-check fa-4x"></i>
            <a href="in_process.html">
              <h2 className="complaints_class"><Link to="/inprocesscom">In Process</Link></h2>
            </a>
          </div>
          <div className="box col-lg-3">
            <i className="complaint_icon fa-solid fa-check-double fa-4x"></i>
            <a href="completed.html">
              <h2 className="complaints_class"><Link to="/completed">Completed </Link></h2>
            </a>
          </div>
          
        </div>
      </section>
      <div className="last" style={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="image/white.png" alt="Your Image" style={{ maxWidth: '50%', height: 'auto' }} />
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
        <p>&copy;A208 | All Rights Reserved</p>
      </footer>

    </div>
  )
}

export default UserComplaint
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const AboutUs = () => {
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const handleScroll = () => {
    // Toggle sticky class based on scroll position
    setIsHeaderSticky(window.scrollY > 0);
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);
    // Clear event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  




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
       <div className="containerrr">
        <h2>Shamshen Nahar Khan Hall</h2>
        
        <div className="rul">
          <div className="rule-image">
            <img src="image/onn.jpg" alt="Hall Complaint Project Image" />
          </div>
          <div className="rule-text">
            <h2>Residence Hall Director & Established</h2>
            <h3>Our Provost</h3>
            <p>Razia Sultana</p>
            <h4>Our Assistant Provost</h4>
            <p>Md. Mamunur Roshid, Nahida Sultana, Md. Din Islam</p>
            <p>Established since 2018</p>
            <h4>Roles and Responsibilities</h4>
            <p>
              Our residence hall director oversees the management and operation of the dormitory. They handle administrative tasks, organize events, and address any concerns raised by students.
            </p>
            <p>
              The assistant provosts assist the residence hall director in their duties and community development.
            </p>
          </div>
        </div>
        
        <h2>About us</h2>
        <p>
          Welcome to SNK Hall Voice, the platform for addressing hall complaints efficiently and effectively. We understand the importance of creating a supportive and conducive environment within shared living spaces, which is why we've developed this platform to streamline the complaint resolution process.
        </p>
        <p>
          At this project, we believe in fostering a community where every voice is heard and every concern is addressed promptly. Our team is dedicated to facilitating communication between residents and administrators, ensuring that issues are resolved in a timely manner and the quality of life within the halls is continually improved.
        </p>
        <p>
          With a commitment to transparency, accountability, and user satisfaction, [Project Name] aims to be the go-to solution for handling hall complaints. Whether it's a noise disturbance, maintenance issue, or any other concern, we're here to help you navigate the process and find resolution.
        </p>
        <p>
          Thank you for joining us on this journey to create a harmonious and supportive living environment for all residents. Together, we can make a positive difference in our community.
        </p>
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
    </div>
  )
}

export default AboutUs
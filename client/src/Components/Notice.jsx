import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Notice = () => {
  const navigate = useNavigate();
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
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



      const fetchAnnouncements = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/announcements');
          // Assuming the response data is an array of announcements
          const announcementsWithDate = response.data.map(announcement => ({
            ...announcement,
            date: new Date(announcement.date), // Add the current date
          }));
          // Sort the announcements based on date in descending order
          
        const sortedAnnouncements = announcementsWithDate.sort((a, b) => b.date - a.date);
        setAnnouncements(sortedAnnouncements);
        } catch (error) {
          console.error('Error fetching announcements:', error);
        }
      };
      
      useEffect(() => {
        // Fetch announcements when component mounts
        fetchAnnouncements();
      }, []);
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
     <h2>Essential Notice</h2>
      <div className="notice">
        {announcements.map((announcement, index) => (
          <div key={index} className="notice-content">
            {/* You can use your icon from the announcement or add a default icon */}
            <h5><i className="fas fa-exclamation-circle"></i>{announcement.title}</h5>
            
            <div className="notice-text">
              
              <p>{announcement.text}</p>
            </div>
            <p className="date-time"><i className="far fa-clock"></i> Announced on: {announcement.date.toLocaleDateString()}</p>
          </div>
        ))}
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
    </div>
  )
}

export default Notice
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    className: "custom-toast",
  };

  
  

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState([
    
    
    
    
    
    'image/on.jpg',
    
    
    'image/onn.jpg',
    'image/online.jpg',
   'image/pic8.jpeg',
    'image/pic5.jpeg',
    
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);
    // Clear event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Change background image every 5 seconds
    changeBackgroundImage();
    const interval = setInterval(changeBackgroundImage, 4000);
    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    // Toggle sticky class based on scroll position
    setIsHeaderSticky(window.scrollY > 0);
  };

  const changeBackgroundImage = () => {
    // Cycle through images
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
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


  const [formData, setFormData] = useState({
    studentID: '',
    roomNumber: '',
    complaint: '',
    category: '' // Add category field
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};



// Update handleSubmit in Home component
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3000/api/complaints', formData);
    console.log(response.data);
    // Clear form fields after submission
    setFormData({
      studentID: '',
      roomNumber: '',
      complaint: '',
      category: '' // Add category field
    });

    toast("Complaint has been submitted successfully!", toastOptions);
  } catch (error) {
    console.error('Error submitting complaint', error);
  }
};





const goals = [
  {
      image: 'image/pic3.jpeg',
      alt: 'Goal 1 Image',
      title: 'Efficient Complaint Resolution',
      description: 'Enable users to efficiently submit their complaints and receive timely resolutions, ensuring a conducive living environment within the halls.'
  },
  {
      image: 'image/pic4.jpeg',
      alt: 'Goal 2 Image',
      title: 'Transparent Communication',
      description: 'Foster transparent communication between residents and administrators, providing updates on complaint statuses and actions taken to address issues.'
  },
  {
      image: 'image/pic6.jpeg',
      alt: 'Goal 3 Image',
      title: 'Community Engagement',
      description: 'Encourage community engagement by empowering residents to voice their concerns and actively participate in improving hall living standards.'
  },
  {
      image: 'image/pic7.jpeg',
      alt: 'Goal 4 Image',
      title: 'User Satisfaction',
      description: 'Prioritize user satisfaction by implementing user-friendly interfaces, responsive support channels, and effective complaint handling processes to enhance overall user experience.'
  }
];


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

      <div className='bodyy'>
        <div className="background-image" style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}></div>

        <div className="custom-shape-divider-bottom-1696038172">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
        </div>
      </div>   

      <div className="containerrr">

      <h2>Send us your Issue</h2>
            <p>We are committed to providing you with the best possible solutions, dedicating our efforts to resolving your issue promptly and efficiently, ensuring that you receive assistance in a timely manner.</p>
            <p className="important-line">Don't forget to select the category.</p>

            {/* Form for submitting complaints */}
            <form onSubmit={handleSubmit}>

            <fieldset className="category-section">
            <legend>Select the Issue Category</legend>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Wifi Issue">Wi-Fi Issue</option>
              <option value="Electrical Issue">Electrical Issue</option>
              <option value="Personal Issue">Personal Issue</option>
              <option value="Other">Other</option>
            </select>
          </fieldset>
          <br />
                <input
                    type="text"
                    name="studentID"
                    placeholder="What is your student ID?"
                    className="qsn-input"
                    value={formData.studentID}
                    onChange={handleChange}
                /><br />
                <input
                    type="text"
                    name="roomNumber"
                    placeholder="What is your room number?"
                    className="qsn-input"
                    value={formData.roomNumber}
                    onChange={handleChange}
                /><br />
                <textarea
                    name="complaint"
                    placeholder="What is your issue?"
                    className="qsn-input"
                    value={formData.complaint}
                    onChange={handleChange}
                ></textarea><br />
                <button type="submit" name="submit" >Submit</button>
            </form>
            <ToastContainer />
            <p>Keep trust on us, soon we will get back to you</p>







            
             {/* Essential Notice Section */}
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
      <button>See All</button>


      <h2>Rules and Regulations</h2>
      <div className="rul">
        <div className="rule-image">
          <img src="/image/onnn.jpg" alt="Hall Complaint Project Image" />
        </div>
        <div className="rule-text">
          <h2>Rules and Regulations</h2>
          <p>
            <i className="fas fa-check-circle icon"></i>Respect your fellow residents and communicate politely.<br />
            <i className="fas fa-check-circle icon"></i>Complaints should be genuine and relevant to hall living.<br />
            <i className="fas fa-check-circle icon"></i>Provide accurate details when submitting a complaint.<br />
            <i className="fas fa-check-circle icon"></i>Do not submit false or misleading complaints.<br />
            <i className="fas fa-check-circle icon"></i>Use the platform responsibly and refrain from spamming.<br />
            <i className="fas fa-check-circle icon"></i>Any misuse of the platform will result in disciplinary action.<br />
            <i className="fas fa-check-circle icon"></i>Follow the instructions provided by administrators for complaint resolution.<br />
            <i className="fas fa-check-circle icon"></i>Be patient and allow time for the resolution process to take place.<br />
            <i className="fas fa-check-circle icon"></i>Keep personal information confidential and do not share it with others.<br />
            <i className="fas fa-check-circle icon"></i>Report any issues or concerns regarding the platform to the administrators.<br />
          </p>
        </div>
      </div>

     

      <h2>Our Goals</h2>
            <div className="goal">
                {goals.map((goal, index) => (
                    <div key={index} className="goal-box">
                        <div className="goal-circle">
                            <img src={goal.image} alt={goal.alt} />
                        </div>
                        <div className="goal-content">
                            <div className="goal-title">{goal.title}</div>
                            <div className="goal-description">{goal.description}</div>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className='aboutus'>About us</h2>
            <p>Welcome to SNK Hall Voice, your platform for addressing hall complaints efficiently and effectively. We understand the importance of creating a supportive and conducive environment within shared living spaces, which is why we've developed this platform to streamline the complaint resolution process.</p>
            <p>At [Project Name], we believe in fostering a community where every voice is heard and every concern is addressed promptly. Our team is dedicated to facilitating communication between residents and administrators, ensuring that issues are resolved in a timely manner and the quality of life within the halls is continually improved.</p>
            <p>With a commitment to transparency, accountability, and user satisfaction, [Project Name] aims to be the go-to solution for handling hall complaints. Whether it's a noise disturbance, maintenance issue, or any other concern, we're here to help you navigate the process and find resolution.</p>
            <p>Thank you for joining us on this journey to create a harmonious and supportive living environment for all residents. Together, we can make a positive difference in our community.</p>

            

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


    

   

  );
};

export default Home;

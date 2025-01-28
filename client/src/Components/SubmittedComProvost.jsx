import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/SubmittedCom.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmittedComProvost = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    className: "custom-toast",
  };
  
  const [complaints, setComplaints] = useState([]);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/complaints?status=escalate', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const sortedComplaints = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setComplaints(sortedComplaints)
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
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
      toast("Complaint has sent to 'In Process' successfully!", toastOptions);
    } catch (error) {
      console.error('Error updating complaint status:', error);
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
                      <li><Link to="/adminhomeprovost">HOME</Link></li>
                      <li><Link to="/reportprovost">REPORT</Link></li>
                 
                      <li><Link to="/submittedcomprovost">STUDENTS' COMPLAINT</Link></li>
                      
                      <li><a className="logout-btn" onClick={handleLogout}><button>LogOut</button></a></li>
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

      <div className="table" id="users_table">
        <section className="table__header">
          <h2>SUBMITTED ISSUES:</h2>
          
          <div className="input-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search..." />
          </div>
        </section>
        <section className="table__body">


        <div className='select-category'>
            <p className='wifi'>Wifi Issue</p>
            <p>Electrical Issue</p>
            <p>Personal Issue</p>
            <p>Other</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Room Number <span className='arrow'>↑↓</span></th>
                <th>Issue Description</th>
                <th>Date <span className='arrow'>↑↓</span></th>
                
                <th>Send to In Process</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.studentID}</td>
                  <td>{complaint.roomNumber}</td>
                  <td>{complaint.complaint}</td>
                  <td>{new Date(complaint.date).toLocaleString()}</td>
                  <td>
                  <button
                      className="delete-row"
                      onClick={() => handleStatusUpdate(complaint._id, 'in process')}
                    >
                      Send to In Process
                    </button>
                  </td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <ToastContainer />


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

export default SubmittedComProvost;

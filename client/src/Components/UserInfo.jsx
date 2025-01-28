import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserInfo() {
  const navigate = useNavigate();

    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const [users, setUsers] = useState([]);
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
     
      


      
      

      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/auth/all-users');
    const users = response.data; // `users` instead of `user`
    setUsers(users);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      useEffect(() => {
        // Fetch announcements when component mounts
        fetchUsers();
      }, []);


      // Handle delete functionality
      const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/auth/delete-user/${userId}`);
            // Remove user from state immediately after deletion
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
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



      <div>
      <section className="table__header">
        <h2 className="aboveuserinfo">Users' Information:</h2>
        <div className="input-container aboveuserinfo">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </section>
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>Student Id </th>
              <th>User Name </th>
              <th>Permanent Address </th>
              <th>Room Number </th>
              <th>Email </th>
              <th>Phone Number </th>
              <th>Parent's Phone Number </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.present}</td>
                <td>{user.room}</td>
                <td>
                <p >
                                            {user.email} {/* Add fallback text */}
                                        </p>
                </td>
                <td><strong>{user.phone}</strong></td>
                <td><strong>{user.parent}</strong></td>
                <td><button className="delete-row" onClick={() => handleDelete(user._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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

export default UserInfo
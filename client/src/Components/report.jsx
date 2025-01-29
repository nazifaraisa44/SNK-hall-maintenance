import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();
  const [statusCounts, setStatusCounts] = useState({
    satisfied: 0,
    neutral: 0,
    dissatisfied: 0,
  });

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
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/reviews/reviews');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const reviews = await response.json();

        const counts = {
          satisfied: 0,
          neutral: 0,
          dissatisfied: 0,
        };

        reviews.forEach(review => {
          counts[review.workStatus]++;
        });

        setStatusCounts(counts);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, []);

  const barChartOptions = {
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Satisfied', 'Neutral', 'Dissatisfied'],
      title: {
        text: 'Work Status',
        style: { fontSize: '20px', fontWeight: 'bold', color: '#263238' }
      }
    },
    yaxis: {
      title: {
        text: 'Count',
        style: { fontSize: '20px', fontWeight: 'bold', color: '#263238' }
      }
    },
    title: {
      text: 'Work Status Distribution (Bar Chart)',
      align: 'center',
      style: { fontSize: '16px', fontWeight: 'bold', color: '#263238' }
    },
    colors: ['#6490f5', '#e2f564','#fe8888']
  };

  const barChartSeries = [{
    name: 'Count',
    data: [statusCounts.satisfied, statusCounts.neutral, statusCounts.dissatisfied]
  }];

  const pieChartOptions = {
    labels: ['WiFi', 'Electric', 'Personal', 'Others'],
    chart: { type: 'pie' },
    title: {
      text: 'Issues By Category',
      align: 'center',
      style: { fontSize: '16px', fontWeight: 'bold', color: '#263238' }
    },
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#56ff56'],
    responsive: [{
      breakpoint: 600,
      options: { chart: { width: 300 } }
    }]
  };

  const pieChartSeries = [statusCounts.satisfied, statusCounts.neutral, statusCounts.dissatisfied, statusCounts.neutral];

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
            <li><Link to="/adminhome">HOME</Link></li>
            <li><Link to="/report">REPORT</Link></li>
            <li><Link to="/userinfo">STUDENTS' INFORMATION</Link></li>
            <li><Link to="/usercomplaint">STUDENTS' COMPLAINT</Link></li>
            
            <li><a className="logout-btn" onClick={handleLogout}><button>LogOut</button></a></li>
          </ul>
        </nav>
      </header>
      <div className="image-container">
        <img src="image/new.png" alt="Your Image" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        {/* Bar Chart */}
        <Chart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={350}
          width={400}
        />

        {/* Pie Chart */}
        <Chart
          options={pieChartOptions}
          series={pieChartSeries}
          type="pie"
          height={350}
          width={400}
        />
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

export default Report;

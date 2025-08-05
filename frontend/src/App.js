import React, { useState } from 'react';
import axios from 'axios';

// OPTIONAL: Import a banner image (place in /public or /src folder)
// import banner from './banner.png';

function App() {
  const [name, setName] = useState('');
  const [referral, setReferral] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [page, setPage] = useState('login');

  const handleLogin = async () => {
    if (!name) return alert('Enter your name!');
    const referralCode = referral || `${name.toLowerCase()}2025`;
    try {
      const res = await axios.get(`https://intern-portal-q7c6.onrender.com/api/dashboard/${referralCode}`);
      res.data.internName = name;
      setDashboard(res.data);
      setPage('dashboard');
    } catch (err) {
      alert('Error connecting to backend');
    }
  };

  const loadLeaderboard = async () => {
    try {
      const res = await axios.get('https://intern-portal-q7c6.onrender.com/api/leaderboard');
      setLeaderboard(res.data);
      setPage('leaderboard');
    } catch (err) {
      alert('Error loading leaderboard');
    }
  };

  // --- Rendering logic ---
  if (page === 'login')
    return (
      <div className="container login-bg">
        {/* Banner image or colorful header */}
        <div className="header">
          {/* <img src={banner} alt="Intern Portal Banner" className="banner-img" /> */}
          <h1>🌟 Intern Portal Login 🌟</h1>
          <p className="subtitle">Welcome to the Fundraising Dashboard</p>
        </div>
        <div className="login-card">
          <input placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} /><br/><br/>
          <input placeholder="Referral Code (optional)" value={referral} onChange={e => setReferral(e.target.value)} /><br/><br/>
          <button onClick={handleLogin}>Login</button>
        </div>

        {/* Internal CSS for demo */}
        <style>{`
          .container {
            min-height: 100vh;
            padding-top: 40px;
            background: linear-gradient(120deg, #f5e3ff 0%, #aee2ff 100%);
            font-family: 'Segoe UI', Arial, sans-serif;
          }
          .header {
            text-align: center;
            margin-bottom: 15px;
          }
          .banner-img {
            max-width: 160px;
            border-radius: 12px;
          }
          .subtitle {
            color: #555;
            font-size: 1.1rem;
            margin-top: -0.15em;
          }
          .login-card {
            margin: 0 auto;
            max-width: 330px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 2px 28px #8ccffc3d;
            padding: 32px 26px 26px 26px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .login-card input {
            padding: 11px;
            margin-bottom: 3px;
            border-radius: 7px;
            border: 1px solid #b6b6c5;
            font-size: 1em;
          }
          .login-card button {
            background: linear-gradient(90deg,#2ec4ff,#a8ea7d 80%);
            border: none;
            border-radius: 5px;
            color: #333;
            padding: 12px 0;
            margin-top: 6px;
            font-size: 1em;
            font-weight: bold;
            box-shadow: 0 1px 8px #afd7f3;
            cursor: pointer;
            transition: 0.2s;
          }
          .login-card button:hover {
            background: linear-gradient(90deg,#0dd3f7,#fffab7 80%);
            color: #1d3972;
          }
        `}</style>
      </div>
    );

  if (page === 'dashboard')
    return (
      <div className="container dash-bg">
        <div className="header">
          <h1>🌈 Dashboard</h1>
          <p>Track your fundraising journey and unlock awesome rewards!</p>
        </div>
        <div className="dash-card">
          {/* Add an intern/team avatar */}
          <div style={{textAlign:'center', marginBottom:'1em'}}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              style={{width:"66px", borderRadius:"50%"}}
              alt="Intern profile avatar"
            />
          </div>
          <div><b>Intern Name: </b> <span style={{color:"#2b70e4"}}>{dashboard.internName}</span></div>
          <div><b>Referral Code: </b>{dashboard.referralCode}</div>
          <div style={{marginTop:'1em', fontSize:'1.15em'}}>
            <span role="img" aria-label="donation">&#128176;</span>
            <b> Total Donations: </b>
            <span style={{color:'green', fontWeight:'bold', fontSize:'1.25em'}}>₹{dashboard.totalDonations}</span>
          </div>
          <div style={{marginTop:'1em'}}><b>Rewards:</b>
            <ul style={{lineHeight:"2"}}>
              <li>🏅 {dashboard.rewardsUnlocked[0]}</li>
              <li>🥈 Silver Badge <i>(Locked)</i></li>
              <li>🥇 Gold Badge <i>(Locked)</i></li>
            </ul>
          </div>
        </div>
        <div style={{textAlign:"center", marginTop:"25px"}}>
          <button className="leaderboard-btn" onClick={loadLeaderboard}>🏆 See Leaderboard</button>
        </div>
        <style>{`
          .dash-bg {
            min-height: 100vh;
            background: linear-gradient(135deg,#e2f9ff 0%,#e7eafc 100%);
            font-family: 'Segoe UI', Arial, sans-serif;
          }
          .dash-card {
            margin: 1em auto 0 auto;
            max-width: 400px;
            background: white;
            border-radius: 22px;
            box-shadow: 0 2px 20px #6acaff21;
            padding: 36px 34px 30px 34px;
            border: 2px solid #f0f6ff;
          }
          .leaderboard-btn {
            background: linear-gradient(90deg,#fac710,#3eead3 80%);
            border: none;
            border-radius: 9px;
            color: #232960;
            padding: 13px 30px;
            font-size: 1.23em;
            font-weight: bold;
            box-shadow: 0 2px 15px #e5ebed75;
            cursor: pointer;
            transition: all 0.17s;
          }
          .leaderboard-btn:hover {
            background: #4ecdc4;
            color: #fff;
          }
        `}</style>
      </div>
    );

  if (page === 'leaderboard')
    return (
      <div className="container lb-bg">
        <div className="header">
          <h1>🏆 Leaderboard</h1>
          <p>See the top fundraisers and climb the ranks!</p>
        </div>
        <div className="lb-card">
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Intern</th>
                <th>Donations</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((l,i) =>
                <tr key={i}>
                  <td>{i+1} {i===0 && "👑"}</td>
                  <td>{l.internName}</td>
                  <td style={{color:"darkgreen", fontWeight:'bold'}}>₹{l.totalDonations}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{textAlign:"center", marginTop:"20px"}}>
          <button className="leaderboard-btn" onClick={()=>setPage('dashboard')}>⬅ Back to Dashboard</button>
        </div>

        <style>{`
          .lb-bg {
            min-height: 100vh;
            background: linear-gradient(115deg, #ffffff 0%, #bbe0ff 100%);
            font-family: 'Segoe UI', Arial, sans-serif;
          }
          .lb-card {
            margin: 0 auto;
            max-width: 470px;
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 3px 18px #e4f1fa91;
            padding: 34px 18px 24px 18px;
            border: 2px solid #ebeef2;
          }
          .lb-table {
            width: 100%;
            border-collapse: collapse;
          }
          .lb-table th, .lb-table td {
            padding: 12px 5px;
            border-bottom: 1px solid #dee5ee;
            text-align: left;
          }
          .lb-table th {
            color: #297697;
            font-size: 1.07em;
            background: #f4faff;
          }
        `}</style>
      </div>
    );

  return null;
}

export default App;

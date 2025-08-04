const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/dashboard/:referralCode', (req, res) => {
  // Dummy static response
  res.json({
    internName: 'John Doe',
    referralCode: req.params.referralCode,
    totalDonations: 1560,
    rewardsUnlocked: ['Bronze Donor Badge']
  });
});

app.get('/api/leaderboard', (req, res) => {
  // Bonus: static leaderboard
  res.json([
    { internName: 'Alice', totalDonations: 2000 },
    { internName: 'Bob', totalDonations: 1560 },
    { internName: 'Eve', totalDonations: 1300 }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
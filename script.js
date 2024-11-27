// Initialize data storage
let batsmen = [];
let bowlers = [];
let totalScore = 0;
let totalWickets = 0;
let totalBalls = 0;

// Array to store all matches
let matches = [];

// Function to update stats dynamically
function updateStats() {
  const score = parseInt(document.getElementById('input-score').value) || 0;
  const wickets = parseInt(document.getElementById('input-wickets').value) || 0;
  const balls = parseInt(document.getElementById('input-balls').value) || 0;

  const batsman1Name = document.getElementById('input-batsman1-name').value;
  const batsman1Runs = parseInt(document.getElementById('input-batsman1-runs').value) || 0;
  const batsman1Balls = parseInt(document.getElementById('input-batsman1-balls').value) || 0;

  const batsman2Name = document.getElementById('input-batsman2-name').value;
  const batsman2Runs = parseInt(document.getElementById('input-batsman2-runs').value) || 0;
  const batsman2Balls = parseInt(document.getElementById('input-batsman2-balls').value) || 0;

  const bowlerName = document.getElementById('input-bowler-name').value;
  const bowlerOvers = parseFloat(document.getElementById('input-bowler-overs').value) || 0;
  const bowlerRuns = parseInt(document.getElementById('input-bowler-runs').value) || 0;
  const bowlerWickets = parseInt(document.getElementById('input-bowler-wickets').value) || 0;

  totalScore += score;
  totalWickets += wickets;
  totalBalls += balls;

  // Update batsman and bowler stats
  updateBatsmanStats(batsman1Name, batsman1Runs, batsman1Balls);
  updateBatsmanStats(batsman2Name, batsman2Runs, batsman2Balls);

  updateBowlerStats(bowlerName, bowlerOvers, bowlerRuns, bowlerWickets);

  displayStats();
}

// Function to update batsman stats
function updateBatsmanStats(name, runs, balls) {
  if (!name) return;
  let batsman = batsmen.find((b) => b.name === name);
  if (!batsman) {
    batsman = { name, runs: 0, balls: 0 };
    batsmen.push(batsman);
  }
  batsman.runs += runs;
  batsman.balls += balls;
}

// Function to update bowler stats
function updateBowlerStats(name, overs, runs, wickets) {
  if (!name) return;
  let bowler = bowlers.find((b) => b.name === name);
  if (!bowler) {
    bowler = { name, overs: 0, runs: 0, wickets: 0 };
    bowlers.push(bowler);
  }
  bowler.overs += overs;
  bowler.runs += runs;
  bowler.wickets += wickets;
}

// Function to save the match
function saveMatch() {
  const matchName = document.getElementById('input-match-name').value || "Unnamed Match";

  const match = {
    matchName,
    score: `${totalScore}/${totalWickets}`,
    overs: `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`,
    runRate: (totalScore / (totalBalls / 6)).toFixed(2),
    batsmen: [...batsmen],
    bowlers: [...bowlers],
  };

  matches.push(match);
  displayMatchHistory();
  resetStats();  // Start new match after saving
}

// Function to display match history
function displayMatchHistory() {
  const matchList = document.getElementById('match-list');
  matchList.innerHTML = '';
  matches.forEach((match, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${match.matchName}: ${match.score}`;
    listItem.onclick = () => displayMatchDetails(index);
    matchList.appendChild(listItem);
  });
}

// Function to display match details
function displayMatchDetails(index) {
  const match = matches[index];
  alert(
    `Match Name: ${match.matchName}\nScore: ${match.score}\nOvers: ${match.overs}\nRun Rate: ${match.runRate}\n\n` +
    `Batsmen:\n${match.batsmen
      .map((b) => `${b.name}: ${b.runs} runs (${b.balls} balls)`)
      .join('\n')}\n\n` +
    `Bowlers:\n${match.bowlers
      .map((b) => `${b.name}: ${b.overs.toFixed(1)} overs, ${b.runs} runs, ${b.wickets} wickets`)
      .join('\n')}`
  );
}

// Function to reset stats (Admin Only)
function resetStats() {
  batsmen = [];
  bowlers = [];
  totalScore = 0;
  totalWickets = 0;
  totalBalls = 0;
  displayStats();
  clearInputFields(); // Clear input fields after match save
}

// Function to clear all input fields for new match
function clearInputFields() {
  document.getElementById('input-score').value = '';
  document.getElementById('input-wickets').value = '';
  document.getElementById('input-balls').value = '';
  document.getElementById('input-batsman1-name').value = '';
  document.getElementById('input-batsman1-runs').value = '';
  document.getElementById('input-batsman1-balls').value = '';
  document.getElementById('input-batsman2-name').value = '';
  document.getElementById('input-batsman2-runs').value = '';
  document.getElementById('input-batsman2-balls').value = '';
  document.getElementById('input-bowler-name').value = '';
  document.getElementById('input-bowler-overs').value = '';
  document.getElementById('input-bowler-runs').value = '';
  document.getElementById('input-bowler-wickets').value = '';
  document.getElementById('input-match-name').value = '';
}

// Function to display live stats
function displayStats() {
  document.getElementById('score').innerText = `${totalScore}/${totalWickets}`;
  document.getElementById('overs').innerText = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;
  const runRate = totalBalls > 0 ? (totalScore / (totalBalls / 6)).toFixed(2) : '0.00';
  document.getElementById('runrate').innerText = runRate;

  // Display batsman stats
  const batsmanStats = document.querySelector('.batsman-stats');
  batsmanStats.innerHTML = `<h3>Batsmen Stats</h3>`;
  batsmen.forEach((batsman) => {
    batsmanStats.innerHTML += `<p>${batsman.name}: ${batsman.runs} runs (${batsman.balls} balls)</p>`;
  });

  // Display bowler stats
  const bowlerStats = document.querySelector('.bowler-stats');
  bowlerStats.innerHTML = `<h3>Bowler Stats</h3>`;
  bowlers.forEach((bowler) => {
    bowlerStats.innerHTML += `<p>${bowler.name}: ${bowler.overs.toFixed(1)} overs, ${bowler.runs} runs, ${bowler.wickets} wickets</p>`;
  });
}

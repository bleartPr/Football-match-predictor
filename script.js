const team1Selector = document.getElementById("team-1-selector");
const team2Selector = document.getElementById("team-2-selector");
const simulateButton = document.getElementById("simulate-button");
const team1Scorebox = document.getElementById("team-1-scorebox");
const team2Scorebox = document.getElementById("team-2-scorebox");
const team1Score = document.getElementById("team-1-score");
const team2Score = document.getElementById("team-2-score");

const teamStats = {
  "Manchester City": { attack: 95, defense: 90 },
  "Liverpool": { attack: 93, defense: 88 },
  "Manchester United": { attack: 90, defense: 85 },
  "Chelsea": { attack: 88, defense: 85 },
  "Arsenal": { attack: 85, defense: 80 },
  "Tottenham Hotspur": { attack: 83, defense: 78 },
  "Newcastle United": { attack: 80, defense: 75 },
  "Leicester City": { attack: 78, defense: 74 },
  "West Ham United": { attack: 75, defense: 72 },
  "Aston Villa": { attack: 73, defense: 70 },
  "Brighton and Hove Albion": { attack: 70, defense: 68 },
  "Everton": { attack: 68, defense: 65 },
  "Brentford": { attack: 66, defense: 64 },
  "Fulham": { attack: 64, defense: 62 },
  "Crystal Palace": { attack: 62, defense: 60 },
  "Wolverhampton Wanderers": { attack: 60, defense: 58 },
  "Leeds United": { attack: 58, defense: 55 },
  "Southampton": { attack: 56, defense: 54 },
  "Burnley": { attack: 54, defense: 52 },
  "Norwich City": { attack: 52, defense: 50 },
  "Sheffield United": { attack: 50, defense: 48 },
  "West Bromwich Albion": { attack: 48, defense: 46 },
  "Cardiff City": { attack: 46, defense: 44 }
};

const teamForm = {
  "Manchester City": 1.2,
  "Liverpool": 1.1,
  "Manchester United": 1.0,
  "Chelsea": 1.05,
  "Arsenal": 1.0,
  "Tottenham Hotspur": 1.0,
  "Newcastle United": 0.95,
  "Leicester City": 0.9,
  "West Ham United": 0.85,
  "Aston Villa": 0.85,
  "Brighton and Hove Albion": 0.8,
  "Everton": 0.75,
  "Brentford": 0.75,
  "Fulham": 0.7,
  "Crystal Palace": 0.7,
  "Wolverhampton Wanderers": 0.7,
  "Leeds United": 0.65,
  "Southampton": 0.65,
  "Burnley": 0.6,
  "Norwich City": 0.6,
  "Sheffield United": 0.6,
  "West Bromwich Albion": 0.55,
  "Cardiff City": 0.5
};

team1Selector.addEventListener("change", updateButtonState);
team2Selector.addEventListener("change", updateButtonState);

function updateButtonState() {
  if (team1Selector.value !== "default" && team2Selector.value !== "default" && team1Selector.value !== team2Selector.value) {
    simulateButton.disabled = false;
  } else {
    simulateButton.disabled = true;
  }
}



function simulateMatch() {
    calculateMatchScore(team1Selector.value, team2Selector.value);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function getNormalRandom(mean, stdDev) {
  let u1 = 0, u2 = 0;
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();
  const R = Math.sqrt(-2.0 * Math.log(u1));
  const theta = 2.0 * Math.PI * u2;
  const Z = R * Math.cos(theta);
  return mean + Z * stdDev;
}
  
function poissonRandom(lambda) {
  let L = Math.exp(-lambda);
  let p = 1.0;
  let k = 0;

  do {
    k++;
    p *= Math.random();
  } while (p > L);

  return k - 1;
}

function calculateMatchScore(homeTeam, awayTeam) {
  const homeStats = teamStats[homeTeam];
  const awayStats = teamStats[awayTeam];
  const homeForm = teamForm[homeTeam];
  const awayForm = teamForm[awayTeam];

  if (homeStats === undefined || awayStats === undefined) {
    throw new Error("One or both team names are invalid.");
  }

  const homeAdvantage = 0.15;

  const homeExpectedGoals = ((homeStats.attack / awayStats.defense) + homeAdvantage) * 1.25 * homeForm;
  const awayExpectedGoals = (awayStats.attack / homeStats.defense) * 1.25 * awayForm;

  const homeGoals = poissonRandom(homeExpectedGoals);
  const awayGoals = poissonRandom(awayExpectedGoals);

  team1Score.innerHTML = homeGoals;
  team2Score.innerHTML = awayGoals;
}
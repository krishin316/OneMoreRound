// Abstracted data service with mock data
const fights = [
  {
    id: '1',
    boxer1: 'Mike Tyson',
    boxer2: 'Evander Holyfield',
    boxer1Id: 'tyson',
    boxer2Id: 'holyfield',
    date: '2025-08-10',
    location: 'Las Vegas',
  },
  {
    id: '2',
    boxer1: 'Muhammad Ali',
    boxer2: 'Joe Frazier',
    boxer1Id: 'ali',
    boxer2Id: 'frazier',
    date: '2025-09-15',
    location: 'New York',
  },
];

const boxers = [
  {
    id: 'tyson',
    name: 'Mike Tyson',
    bio: 'Former undisputed heavyweight champion of the world.',
    wins: 50,
    losses: 6,
    fightHistory: [
      { id: '1', opponent: 'Evander Holyfield', result: 'Loss' },
      { id: '3', opponent: 'Frank Bruno', result: 'Win' },
    ],
  },
  {
    id: 'holyfield',
    name: 'Evander Holyfield',
    bio: 'American former professional boxer who competed from 1984 to 2011.',
    wins: 44,
    losses: 10,
    fightHistory: [
      { id: '1', opponent: 'Mike Tyson', result: 'Win' },
      { id: '4', opponent: 'George Foreman', result: 'Win' },
    ],
  },
  {
    id: 'ali',
    name: 'Muhammad Ali',
    bio: 'Three-time world heavyweight champion.',
    wins: 56,
    losses: 5,
    fightHistory: [
      { id: '2', opponent: 'Joe Frazier', result: 'Win' },
      { id: '5', opponent: 'George Foreman', result: 'Win' },
    ],
  },
  {
    id: 'frazier',
    name: 'Joe Frazier',
    bio: 'American professional boxer, world heavyweight champion from 1970 to 1973.',
    wins: 32,
    losses: 4,
    fightHistory: [
      { id: '2', opponent: 'Muhammad Ali', result: 'Loss' },
      { id: '6', opponent: 'Jimmy Ellis', result: 'Win' },
    ],
  },
];

// Mock fight results
const fightResults = [
  {
    id: '1',
    boxer1: 'Mike Tyson',
    boxer2: 'Evander Holyfield',
    winner: 'Evander Holyfield',
    method: 'Decision',
    date: '2025-08-10',
    location: 'Las Vegas',
  },
  {
    id: '2',
    boxer1: 'Muhammad Ali',
    boxer2: 'Joe Frazier',
    winner: 'Muhammad Ali',
    method: 'KO',
    date: '2025-09-15',
    location: 'New York',
  },
];

// Mock predictions
const myPredictions = [
  {
    fight: 'Mike Tyson vs Evander Holyfield',
    pick: 'Mike Tyson',
    method: 'KO',
    result: 'Loss',
  },
  {
    fight: 'Muhammad Ali vs Joe Frazier',
    pick: 'Muhammad Ali',
    method: 'KO',
    result: 'Win',
  },
];

const DataService = {
  getUpcomingFights: () => fights,
  getFightById: id => fights.find(f => f.id === id),
  getBoxerById: id => boxers.find(b => b.id === id),
  getFightResults: () => fightResults,
  searchBoxers: query => {
    if (!query) return boxers;
    return boxers.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
  },
  getMyPredictions: () => myPredictions,
  getPredictionAccuracy: () => {
    if (!myPredictions.length) return 0;
    const correct = myPredictions.filter(p => p.result === 'Win').length;
    return Math.round((correct / myPredictions.length) * 100);
  },
};

export default DataService;

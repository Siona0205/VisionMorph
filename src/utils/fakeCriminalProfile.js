// src/utils/fakeCriminalProfile.js

const maleNames = [
  "Rohan Verma", "Amit Kumar", "Arjun Singh", "Rahul Mehta",
  "Vikram Rao", "Suresh Patel", "Manish Gupta", "Karan Joshi", "Dev Malhotra",  "Ajay Nair", "Tarun Chatterjee",
  "Sanjay Das", "Peter D'Souza", "Vijay Iyer", "Rajesh Khanna", "Anil Kapoor", "Mohammed Raza", "Sahil Khan", "Deepak Sharma"
];

const femaleNames = [
  "Anjali Sharma", "Neha Verma", "Pooja Singh", "Kavya Iyer", "Lata Rao", "Meera Das", "Divya Nair", "Aisha Khan", "Priya Joshi", "Sunita Gupta",
  "Fatima", "Sneha Patel", "Ritu Malhotra", "Rhema Gomez", "Nina D'Souza", "Sana Raza", "Tara Chatterjee", "Lakshmi Menon", "Isha Kapoor"
];

const crimes = [
  "Theft",
  "Armed Robbery",
  "Fraud",
  "Assault",
  "Kidnapping",
  "Cyber Crime",
  "Drug Trafficking",
  "Forgery",
    "Vandalism",
    "Burglary",
    "Money Laundering",
    "Human Trafficking",
    "Counterfeiting",
    "Embezzlement",
    "Hacking",
    "Identity Theft",
    "Tax Evasion",
    "Smuggling",
    "Bribery",
    "Extortion",
    "murder",
    "rape and murder",
    "serial theft"
];

// simple hash for stable randomness
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function generateFakeProfile(id) {
  const seed = hashCode(id);

  const isMale = id[0].toLowerCase() === "m";
  const nameList = isMale ? maleNames : femaleNames;

  const name = nameList[seed % nameList.length];
  const age = 22 + (seed % 25); // 22–47
  const recordCount = 1 + (seed % 6); // 1–6 records

  const crimeList = [];
  for (let i = 0; i < recordCount; i++) {
    crimeList.push(crimes[(seed + i) % crimes.length]);
  }

  return {
    id,
    name,
    gender: isMale ? "Male" : "Female",
    age,
    records: recordCount,
    crimes: crimeList
  };
}

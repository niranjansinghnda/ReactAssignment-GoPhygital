import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const users = [
  {
    username: "Niranjan Singh",
    userType: "admin",
    password: bcrypt.hashSync("admin123", salt), // bcrypt hash
    email: "admin@example.com",
    language: "English",
    address: "123 Admin Street",
    standard: "-",
    subjects: []
  },
  {
    username: "Ashwin",
    userType: "student",
    password: bcrypt.hashSync("Ashwin123", salt),
    email: "Ashwin@example.com",
    language: "German",
    address: "12 Street",
    standard: "8th",
    subjects: ["Maths", "Science"]
  },
  {
    username: "Ashwini",
    userType: "student",
    password: bcrypt.hashSync("Ashwini123", salt),
    email: "Ashwini@example.com",
    language: "French",
    address: "122 Street",
    standard: "7th",
    subjects: ["Maths", "Science", "English", "Physics"]
  },
  {
    username: "Rashmi",
    userType: "student",
    password: bcrypt.hashSync("Rashmi123", salt),
    email: "Rashmi@example.com",
    language: "English",
    address: "45 Street",
    standard: "9th",
    subjects: ["History", "Maths"]
  }
];

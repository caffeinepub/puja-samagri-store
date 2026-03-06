export type Pandit = {
  id: string;
  name: string;
  specializations: string[];
  experience: number; // years
  languages: string[];
  area: string;
  rating: number; // out of 5
  reviewCount: number;
  pricePerPooja: number; // in rupees
  available: boolean;
  emoji: string;
  bio: string;
};

export const PANDITS: Pandit[] = [
  {
    id: "p1",
    name: "Pandit Rajesh Sharma",
    specializations: ["Satyanarayan Katha", "Griha Pravesh", "Navratri Puja"],
    experience: 22,
    languages: ["Hindi", "Sanskrit", "Marathi"],
    area: "Andheri, Mumbai",
    rating: 4.9,
    reviewCount: 312,
    pricePerPooja: 1500,
    available: true,
    emoji: "🙏",
    bio: "Highly experienced Vedic pandit specializing in household pujas and kathas.",
  },
  {
    id: "p2",
    name: "Pandit Suresh Joshi",
    specializations: ["Ganesh Puja", "Diwali Puja", "Vastu Shanti"],
    experience: 18,
    languages: ["Hindi", "Gujarati", "Sanskrit"],
    area: "Borivali, Mumbai",
    rating: 4.8,
    reviewCount: 245,
    pricePerPooja: 1200,
    available: true,
    emoji: "🪔",
    bio: "Expert in Ganesh rituals and Vastu-related pujas with 18 years of practice.",
  },
  {
    id: "p3",
    name: "Pandit Vikram Mishra",
    specializations: ["Vivah Sanskar", "Mundan", "Namkaran"],
    experience: 30,
    languages: ["Hindi", "Sanskrit", "Bhojpuri"],
    area: "Dadar, Mumbai",
    rating: 5.0,
    reviewCount: 540,
    pricePerPooja: 2000,
    available: true,
    emoji: "🕉️",
    bio: "30+ years of experience in all 16 Hindu Samskaras. Highly sought after for weddings.",
  },
  {
    id: "p4",
    name: "Pandit Anand Tripathi",
    specializations: ["Durga Puja", "Navratri", "Kali Puja"],
    experience: 15,
    languages: ["Hindi", "Bengali", "Sanskrit"],
    area: "Chembur, Mumbai",
    rating: 4.7,
    reviewCount: 189,
    pricePerPooja: 1100,
    available: true,
    emoji: "🌺",
    bio: "Specialist in Shakti pujas with deep knowledge of tantric and vedic traditions.",
  },
  {
    id: "p5",
    name: "Pandit Deepak Acharya",
    specializations: ["Rudrabhishek", "Mrityunjaya Havan", "Shiv Puja"],
    experience: 25,
    languages: ["Hindi", "Sanskrit", "Telugu"],
    area: "Thane",
    rating: 4.9,
    reviewCount: 420,
    pricePerPooja: 1800,
    available: false,
    emoji: "🔱",
    bio: "Renowned for Rudrabhishek and havans, trained at Kashi Vishwanath temple.",
  },
  {
    id: "p6",
    name: "Pandit Mohan Vyas",
    specializations: ["Satyanarayan Katha", "Sunderkand", "Ramayan Path"],
    experience: 20,
    languages: ["Hindi", "Rajasthani", "Sanskrit"],
    area: "Kandivali, Mumbai",
    rating: 4.8,
    reviewCount: 278,
    pricePerPooja: 1300,
    available: true,
    emoji: "📿",
    bio: "Beloved for melodious katha recitations. Specializes in Vaishnav traditions.",
  },
];

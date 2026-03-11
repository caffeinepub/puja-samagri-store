export type Pandit = {
  id: string;
  name: string;
  specializations: string[];
  experience: number;
  languages: string[];
  area: string;
  rating: number;
  reviewCount: number;
  pricePerPooja: number;
  available: boolean;
  emoji: string;
  bio: string;
  lat: number;
  lng: number;
  certifications: string[];
  completedPoojas: number;
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
    bio: "Highly experienced Vedic pandit specializing in household pujas and kathas. Trained at the prestigious Kashi Vidyapeeth, Pandit Rajesh Sharma brings 22 years of deep spiritual knowledge to every ceremony. He is known for his melodious Sanskrit recitations and thorough explanations of rituals in Hindi and Marathi, making every ceremony meaningful for the entire family.",
    lat: 19.1136,
    lng: 72.8697,
    certifications: ["Kashi Vidyapeeth", "Vedic Studies Degree", "Jyotish Shastra Certificate"],
    completedPoojas: 450,
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
    bio: "Expert in Ganesh rituals and Vastu-related pujas with 18 years of practice. Pandit Suresh Joshi holds a degree in Vedic Sciences from Ahmedabad and is fluent in Gujarati, making him a preferred choice for Gujarati families in Mumbai. His Vastu Shanti puja methodology is highly sought after for new homes and offices.",
    lat: 19.2307,
    lng: 72.8567,
    certifications: ["Vedic Sciences Degree – Ahmedabad", "Vastu Shastra Certification"],
    completedPoojas: 320,
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
    bio: "With 30+ years of experience performing all 16 Hindu Samskaras, Pandit Vikram Mishra is highly sought after for weddings and life-cycle ceremonies. His flawless Sanskrit recitations and deep knowledge of Vedic rituals have made him one of the most trusted pandits in Dadar. He has performed over 540 ceremonies across Mumbai.",
    lat: 19.0186,
    lng: 72.8426,
    certifications: ["All 16 Samskaras Certification", "Kashi Vidyapeeth", "Sanskrit Vedic Acharya"],
    completedPoojas: 540,
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
    bio: "Specialist in Shakti pujas with deep knowledge of tantric and vedic traditions. Pandit Anand Tripathi was trained in Bengal under the guidance of renowned tantric scholars and brings authentic Bengali puja traditions to Mumbai. He is especially known for his elaborate Durga Puja setups and powerful Navratri ceremonies.",
    lat: 19.0522,
    lng: 72.9005,
    certifications: ["Tantric Studies – Kolkata", "Shakti Upasana Certificate"],
    completedPoojas: 280,
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
    bio: "Renowned for Rudrabhishek and havans, Pandit Deepak Acharya was trained at Kashi Vishwanath temple and has spent years mastering Shaivite traditions. His Mrityunjaya Havan is believed to be particularly auspicious and is attended by devotees from across Maharashtra. Bilingual in Sanskrit and Telugu, he serves diverse communities.",
    lat: 19.2183,
    lng: 72.9781,
    certifications: ["Kashi Vishwanath Temple Training", "Vedic Havan Specialist", "Shaivite Acharya Degree"],
    completedPoojas: 390,
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
    bio: "Beloved for his melodious katha recitations, Pandit Mohan Vyas specializes in Vaishnav traditions and is especially sought after for Satyanarayan Katha and Sunderkand Path. Originally from Rajasthan, he brings the rich devotional heritage of the Mewar region to Mumbai families seeking authentic and heartfelt puja experiences.",
    lat: 19.2094,
    lng: 72.8490,
    certifications: ["Vaishnav Acharya – Pushkar", "Ramkatha Vachak Certificate"],
    completedPoojas: 310,
  },
];

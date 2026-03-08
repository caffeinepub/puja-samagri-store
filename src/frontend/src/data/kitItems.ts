export interface KitItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  essential: boolean; // essential items are checked by default and cannot be unchecked
}

export const KIT_ITEMS: Record<string, KitItem[]> = {
  "19": [
    // Navratri Kit (product id 19)
    {
      id: "n1",
      name: "Marigold Haar (9 pieces)",
      description: "One haar per day for 9 days",
      emoji: "💐",
      essential: true,
    },
    {
      id: "n2",
      name: "Kumkum Pack",
      description: "Red kumkum for tilak and puja",
      emoji: "🔴",
      essential: true,
    },
    {
      id: "n3",
      name: "Chandan Powder",
      description: "Sandalwood for aarti",
      emoji: "🟤",
      essential: true,
    },
    {
      id: "n4",
      name: "Agarbatti Pack",
      description: "Incense sticks for all 9 days",
      emoji: "🕯️",
      essential: true,
    },
    {
      id: "n5",
      name: "Camphor (Kapoor)",
      description: "For aarti flame",
      emoji: "⚪",
      essential: false,
    },
    {
      id: "n6",
      name: "Lotus Flowers (9)",
      description: "Fresh lotus for Devi offerings",
      emoji: "🪷",
      essential: false,
    },
    {
      id: "n7",
      name: "Navratri Vrat Katha Book",
      description: "Complete vrat katha with aarti",
      emoji: "📖",
      essential: false,
    },
    {
      id: "n8",
      name: "Brass Diya",
      description: "Traditional oil lamp for aarti",
      emoji: "🪔",
      essential: false,
    },
  ],
  "20": [
    // Griha Pravesh Kit (product id 20)
    {
      id: "g1",
      name: "Marigold Haar (5 pieces)",
      description: "Door and deity decorations",
      emoji: "💐",
      essential: true,
    },
    {
      id: "g2",
      name: "Kumkum & Chandan Set",
      description: "For threshold marking",
      emoji: "🔴",
      essential: true,
    },
    {
      id: "g3",
      name: "Agarbatti Pack",
      description: "Purifying incense",
      emoji: "🕯️",
      essential: true,
    },
    {
      id: "g4",
      name: "Camphor",
      description: "For havan and aarti",
      emoji: "⚪",
      essential: true,
    },
    {
      id: "g5",
      name: "Rose Petals",
      description: "Floor decoration",
      emoji: "🌹",
      essential: false,
    },
    {
      id: "g6",
      name: "Brass Diya (2 pieces)",
      description: "For entrance and puja room",
      emoji: "🪔",
      essential: false,
    },
    {
      id: "g7",
      name: "Ganesh Idol (small)",
      description: "For main entrance blessing",
      emoji: "🐘",
      essential: false,
    },
    {
      id: "g8",
      name: "Puja Vidhi Book",
      description: "Step-by-step Griha Pravesh guide",
      emoji: "📖",
      essential: false,
    },
  ],
  "21": [
    // Ganesh Chaturthi Kit (product id 21)
    {
      id: "gc1",
      name: "Marigold Haar (3 pieces)",
      description: "Ganesh decoration garlands",
      emoji: "💐",
      essential: true,
    },
    {
      id: "gc2",
      name: "Modak Thali Ingredients",
      description: "For naivedyam offering",
      emoji: "🍬",
      essential: true,
    },
    {
      id: "gc3",
      name: "Kumkum Pack",
      description: "For tilak",
      emoji: "🔴",
      essential: true,
    },
    {
      id: "gc4",
      name: "Agarbatti Pack",
      description: "Incense sticks for 10 days",
      emoji: "🕯️",
      essential: true,
    },
    {
      id: "gc5",
      name: "Durva Grass (bunch)",
      description: "Sacred to Ganesha",
      emoji: "🌿",
      essential: false,
    },
    {
      id: "gc6",
      name: "Lotus Flowers",
      description: "For Ganesh puja offering",
      emoji: "🪷",
      essential: false,
    },
    {
      id: "gc7",
      name: "Brass Diya",
      description: "For aarti",
      emoji: "🪔",
      essential: false,
    },
    {
      id: "gc8",
      name: "Ganesh Puja Vidhi Book",
      description: "Complete 10-day puja guide",
      emoji: "📖",
      essential: false,
    },
  ],
};

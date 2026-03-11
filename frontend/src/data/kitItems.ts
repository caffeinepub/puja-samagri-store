export interface KitItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  essential: boolean;
  price: number; // in paise (e.g. 5000 = ₹50)
  qty: string;
}

export const KIT_ITEMS: Record<string, KitItem[]> = {
  "19": [
    { id: "n1", name: "Marigold Haar (9 pieces)", description: "One haar per day for 9 days", emoji: "💐", essential: true, price: 18000, qty: "9 pieces" },
    { id: "n2", name: "Kumkum Pack", description: "Red kumkum for tilak and puja", emoji: "🔴", essential: true, price: 4000, qty: "1 pack" },
    { id: "n3", name: "Chandan Powder", description: "Sandalwood for aarti", emoji: "🟤", essential: true, price: 6000, qty: "100g" },
    { id: "n4", name: "Agarbatti Pack (9-day)", description: "Incense sticks for all 9 days", emoji: "🕯️", essential: true, price: 8000, qty: "1 pack" },
    { id: "n5", name: "Camphor (Kapoor)", description: "For aarti flame", emoji: "⚪", essential: false, price: 3000, qty: "50g" },
    { id: "n6", name: "Lotus Flowers (9)", description: "Fresh lotus for Devi offerings", emoji: "🪷", essential: false, price: 15000, qty: "9 flowers" },
    { id: "n7", name: "Navratri Vrat Katha Book", description: "Complete vrat katha with aarti", emoji: "📖", essential: false, price: 12000, qty: "1 book" },
    { id: "n8", name: "Brass Diya", description: "Traditional oil lamp for aarti", emoji: "🪔", essential: false, price: 20000, qty: "1 piece" },
    { id: "n9", name: "Coconut (2 pieces)", description: "For Devi offering and kalash", emoji: "🥥", essential: true, price: 5000, qty: "2 pieces" },
    { id: "n10", name: "Red Chunri / Dupatta", description: "Traditional red cloth for Devi idol", emoji: "🧣", essential: false, price: 25000, qty: "1 piece" },
    { id: "n11", name: "Paan Leaves (20)", description: "For puja offering and prasad", emoji: "🌿", essential: false, price: 4000, qty: "20 leaves" },
    { id: "n12", name: "Supari (Betel Nuts)", description: "Traditional puja offering", emoji: "🌰", essential: true, price: 3000, qty: "1 pack" },
    { id: "n13", name: "Kalash (Brass Pot)", description: "Sacred vessel for puja", emoji: "🏺", essential: false, price: 35000, qty: "1 piece" },
    { id: "n14", name: "Ghee (250ml)", description: "Pure cow ghee for aarti and havan", emoji: "🧈", essential: true, price: 9000, qty: "250ml" },
    { id: "n15", name: "Panchamrit Ingredients Set", description: "Milk, curd, honey, sugar, ghee for abhishek", emoji: "🥛", essential: false, price: 12000, qty: "1 set" },
  ],
  "20": [
    { id: "g1", name: "Marigold Haar (5 pieces)", description: "Door and deity decorations", emoji: "💐", essential: true, price: 10000, qty: "5 pieces" },
    { id: "g2", name: "Kumkum & Chandan Set", description: "For threshold marking", emoji: "🔴", essential: true, price: 8000, qty: "1 set" },
    { id: "g3", name: "Agarbatti Pack", description: "Purifying incense", emoji: "🕯️", essential: true, price: 8000, qty: "1 pack" },
    { id: "g4", name: "Camphor", description: "For havan and aarti", emoji: "⚪", essential: true, price: 3000, qty: "50g" },
    { id: "g5", name: "Rose Petals", description: "Floor decoration and welcome", emoji: "🌹", essential: false, price: 6000, qty: "200g" },
    { id: "g6", name: "Brass Diya (2 pieces)", description: "For entrance and puja room", emoji: "🪔", essential: false, price: 35000, qty: "2 pieces" },
    { id: "g7", name: "Ganesh Idol (small, clay)", description: "For main entrance blessing", emoji: "🐘", essential: false, price: 45000, qty: "1 piece" },
    { id: "g8", name: "Puja Vidhi Book", description: "Step-by-step Griha Pravesh guide", emoji: "📖", essential: false, price: 12000, qty: "1 book" },
    { id: "g9", name: "Coconut (5 pieces)", description: "For kalash and puja offering", emoji: "🥥", essential: true, price: 12000, qty: "5 pieces" },
    { id: "g10", name: "Mango Leaves Torana", description: "Auspicious door decoration", emoji: "🌿", essential: true, price: 8000, qty: "1 torana" },
    { id: "g11", name: "Kalash with Lid", description: "Sacred copper vessel", emoji: "🏺", essential: false, price: 40000, qty: "1 piece" },
    { id: "g12", name: "Ghee (500ml)", description: "Pure cow ghee for havan and aarti", emoji: "🧈", essential: true, price: 15000, qty: "500ml" },
    { id: "g13", name: "Havan Samagri Pack", description: "Complete havan material", emoji: "🔥", essential: false, price: 18000, qty: "1 pack" },
    { id: "g14", name: "Swastik Rangoli Color", description: "Traditional rangoli for threshold", emoji: "🎨", essential: false, price: 7000, qty: "1 set" },
    { id: "g15", name: "Paan & Supari Set", description: "Traditional offering for guests", emoji: "🌰", essential: true, price: 6000, qty: "1 set" },
  ],
  "21": [
    { id: "gc1", name: "Marigold Haar (3 pieces)", description: "Ganesh decoration garlands", emoji: "💐", essential: true, price: 6000, qty: "3 pieces" },
    { id: "gc2", name: "Modak Prasad Pack", description: "Sweet modak for naivedyam offering", emoji: "🍬", essential: true, price: 15000, qty: "1 pack" },
    { id: "gc3", name: "Kumkum Pack", description: "For tilak", emoji: "🔴", essential: true, price: 4000, qty: "1 pack" },
    { id: "gc4", name: "Agarbatti Pack (10-day)", description: "Incense sticks for 10 days", emoji: "🕯️", essential: true, price: 8000, qty: "1 pack" },
    { id: "gc5", name: "Durva Grass (bunch)", description: "Sacred to Ganesha, for abhishek", emoji: "🌿", essential: false, price: 3000, qty: "1 bunch" },
    { id: "gc6", name: "Lotus Flowers", description: "For Ganesh puja offering", emoji: "🪷", essential: false, price: 15000, qty: "5 flowers" },
    { id: "gc7", name: "Brass Diya", description: "For aarti", emoji: "🪔", essential: false, price: 20000, qty: "1 piece" },
    { id: "gc8", name: "Ganesh Puja Vidhi Book", description: "Complete 10-day puja guide", emoji: "📖", essential: false, price: 12000, qty: "1 book" },
    { id: "gc9", name: "Panchamrit Set", description: "Milk, curd, honey, sugar, ghee", emoji: "🥛", essential: true, price: 12000, qty: "1 set" },
    { id: "gc10", name: "Coconut (3 pieces)", description: "For puja and prasad", emoji: "🥥", essential: true, price: 7500, qty: "3 pieces" },
    { id: "gc11", name: "Shendur (Vermilion)", description: "For Ganesh idol sindoor", emoji: "🟥", essential: true, price: 5000, qty: "1 pack" },
    { id: "gc12", name: "Ghee (250ml)", description: "Pure cow ghee for deepak and havan", emoji: "🧈", essential: true, price: 9000, qty: "250ml" },
    { id: "gc13", name: "Paan Leaves (20)", description: "Traditional puja offering", emoji: "🍃", essential: false, price: 4000, qty: "20 leaves" },
    { id: "gc14", name: "Kalash", description: "Sacred brass vessel for puja", emoji: "🏺", essential: false, price: 35000, qty: "1 piece" },
    { id: "gc15", name: "Havan Samagri", description: "Complete havan material pack", emoji: "🔥", essential: false, price: 18000, qty: "1 pack" },
  ],
};

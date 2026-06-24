// ═══════════════════════════════════════════════════════════════
//  FUELBAR — Product Catalog
//  2 flavors × 3 sizes = 6 SKUs
// ═══════════════════════════════════════════════════════════════

export const products = [
  // ─── Choc Hazelnut ───────────────────────────────────────────
  {
    id: 'choc-40',
    name: 'Spark Bar',
    flavor: 'Choc Hazelnut',
    flavorKey: 'choc-hazelnut',
    size: '40g',
    sizeTag: '40g · Spark',
    price: 60,
    protein: 10,
    calories: 150,
    addedSugar: 0,
    featured: false,
    badge: null,
    description: 'Perfect pocket snack with 10g whey protein.',
    emoji: '🍫',
  },
  {
    id: 'choc-60',
    name: 'Power Bar',
    flavor: 'Choc Hazelnut',
    flavorKey: 'choc-hazelnut',
    size: '60g',
    sizeTag: '60g · Power',
    price: 90,
    protein: 15,
    calories: 220,
    addedSugar: 0,
    featured: true,
    badge: 'Best Seller',
    description: 'The perfect mid-day protein punch.',
    emoji: '🍫',
  },
  {
    id: 'choc-90',
    name: 'Beast Bar',
    flavor: 'Choc Hazelnut',
    flavorKey: 'choc-hazelnut',
    size: '90g',
    sizeTag: '90g · Beast',
    price: 130,
    protein: 22.5,
    calories: 280,
    addedSugar: 0,
    featured: false,
    badge: null,
    description: 'Maximum fuel for serious gains.',
    emoji: '🍫',
  },

  // ─── Dates Delight ──────────────────────────────────────────
  {
    id: 'dates-40',
    name: 'Spark Bar',
    flavor: 'Dates Delight',
    flavorKey: 'dates-delight',
    size: '40g',
    sizeTag: '40g · Spark',
    price: 60,
    protein: 10,
    calories: 150,
    addedSugar: 0,
    featured: false,
    badge: null,
    description: 'Naturally sweet with dates & honey.',
    emoji: '🌴',
  },
  {
    id: 'dates-60',
    name: 'Power Bar',
    flavor: 'Dates Delight',
    flavorKey: 'dates-delight',
    size: '60g',
    sizeTag: '60g · Power',
    price: 90,
    protein: 15,
    calories: 220,
    addedSugar: 0,
    featured: true,
    badge: 'Best Seller',
    description: 'Dates-powered protein for sustained energy.',
    emoji: '🌴',
  },
  {
    id: 'dates-90',
    name: 'Beast Bar',
    flavor: 'Dates Delight',
    flavorKey: 'dates-delight',
    size: '90g',
    sizeTag: '90g · Beast',
    price: 130,
    protein: 22.5,
    calories: 280,
    addedSugar: 0,
    featured: false,
    badge: null,
    description: 'Full beast mode with natural date sweetness.',
    emoji: '🌴',
  },
];

export const flavors = [
  { key: 'choc-hazelnut', label: 'Choc Hazelnut', emoji: '🍫' },
  { key: 'dates-delight', label: 'Dates Delight', emoji: '🌴' },
];

export const nutritionData = {
  '40g': {
    label: '40g Spark',
    rows: [
      { nutrient: 'Calories', value: '150 kcal', highlight: false },
      { nutrient: 'Protein', value: '10g', highlight: true },
      { nutrient: 'Total Fat', value: '5g', highlight: false },
      { nutrient: 'Saturated Fat', value: '2g', highlight: false },
      { nutrient: 'Trans Fat', value: '0g', highlight: false, green: true },
      { nutrient: 'Carbohydrates', value: '16g', highlight: false },
      { nutrient: 'Sugars', value: '6g', highlight: false },
      { nutrient: 'Added Sugars', value: '0g', highlight: false, green: true },
      { nutrient: 'Fiber', value: '2g', highlight: false },
      { nutrient: 'Sodium', value: '80mg', highlight: false },
      { nutrient: 'Calcium', value: '45mg', highlight: false },
      { nutrient: 'Iron', value: '1.2mg', highlight: false },
    ],
  },
  '60g': {
    label: '60g Power',
    rows: [
      { nutrient: 'Calories', value: '220 kcal', highlight: false },
      { nutrient: 'Protein', value: '15g', highlight: true },
      { nutrient: 'Total Fat', value: '7g', highlight: false },
      { nutrient: 'Saturated Fat', value: '3g', highlight: false },
      { nutrient: 'Trans Fat', value: '0g', highlight: false, green: true },
      { nutrient: 'Carbohydrates', value: '24g', highlight: false },
      { nutrient: 'Sugars', value: '9g', highlight: false },
      { nutrient: 'Added Sugars', value: '0g', highlight: false, green: true },
      { nutrient: 'Fiber', value: '3g', highlight: false },
      { nutrient: 'Sodium', value: '120mg', highlight: false },
      { nutrient: 'Calcium', value: '65mg', highlight: false },
      { nutrient: 'Iron', value: '1.8mg', highlight: false },
    ],
  },
  '90g': {
    label: '90g Beast',
    rows: [
      { nutrient: 'Calories', value: '280 kcal', highlight: false },
      { nutrient: 'Protein', value: '22.5g', highlight: true },
      { nutrient: 'Total Fat', value: '9g', highlight: false },
      { nutrient: 'Saturated Fat', value: '4g', highlight: false },
      { nutrient: 'Trans Fat', value: '0g', highlight: false, green: true },
      { nutrient: 'Carbohydrates', value: '32g', highlight: false },
      { nutrient: 'Sugars', value: '12g', highlight: false },
      { nutrient: 'Added Sugars', value: '0g', highlight: false, green: true },
      { nutrient: 'Fiber', value: '4g', highlight: false },
      { nutrient: 'Sodium', value: '160mg', highlight: false },
      { nutrient: 'Calcium', value: '85mg', highlight: false },
      { nutrient: 'Iron', value: '2.4mg', highlight: false },
    ],
  },
};

export function getProductsByFlavor(flavorKey) {
  return products.filter((p) => p.flavorKey === flavorKey);
}

export function getProductBySlug(slug) {
  // Slugify helper: e.g., 'Spark Bar' + 'Choc Hazelnut' -> 'spark-bar-choc-hazelnut'
  return products.find(p => {
    const generatedSlug = `${p.name}-${p.flavor}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return generatedSlug === slug || p.id === slug;
  });
}


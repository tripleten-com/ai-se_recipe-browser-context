import type { Recipe, StringMap } from "../types";

export const categoryColors: StringMap = {
  italian: "#FFC35A",
  indian: "#FFAB7D",
  breakfast: "#DAE7FF",
  french: "#FFD2D7",
};

export const allRecipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    category: "Italian",
    description:
      "A Roman classic: silky pasta tossed with eggs, Pecorino Romano, and crispy guanciale.",
    image: "",
    content: `## Ingredients\n\n- 400g spaghetti\n- 200g guanciale (or pancetta), diced\n- 4 large eggs\n- 100g Pecorino Romano, finely grated\n- Freshly ground black pepper\n- Salt\n\n## Instructions\n\n1. Bring a large pot of heavily salted water to a boil. Cook the spaghetti until al dente, reserving 1 cup of pasta water before draining.\n2. Fry the guanciale in a large pan over medium heat until crispy. Remove from heat and let cool slightly.\n3. Whisk eggs with most of the Pecorino in a bowl. Season generously with black pepper.\n4. Add the hot drained pasta to the pan (off the heat). Pour the egg mixture over and toss quickly, adding pasta water to create a silky sauce.\n5. Serve immediately with remaining Pecorino and more black pepper.\n\n## Notes\n\nWork quickly and use pasta water to control temperature. Never add eggs over direct heat.`,
  },
  {
    id: "2",
    title: "Chicken Tikka Masala",
    category: "Indian",
    description:
      "Tender marinated chicken in a velvety tomato-cream sauce with warming spices.",
    image: "",
    content: `## Ingredients\n\n### Marinade\n- 500g boneless chicken thighs, cut into chunks\n- 150g plain yogurt\n- 2 tsp garam masala\n- 1 tsp turmeric\n- 1 tsp cumin\n- Salt\n\n### Sauce\n- 1 large onion, finely diced\n- 4 garlic cloves, minced\n- 1 tbsp fresh ginger, grated\n- 400g crushed tomatoes\n- 200ml double cream\n- 2 tsp garam masala\n- 1 tsp smoked paprika\n\n## Instructions\n\n1. Mix chicken with marinade ingredients. Refrigerate for at least 1 hour, ideally overnight.\n2. Grill or pan-sear the chicken until charred in spots. Set aside.\n3. Sauté onion in oil until golden, about 10 minutes. Add garlic and ginger, cook 2 minutes.\n4. Add spices and stir for 1 minute. Add tomatoes and simmer 15 minutes.\n5. Stir in cream and chicken. Simmer 10 minutes until sauce thickens.\n6. Serve with basmati rice or naan.`,
  },
  {
    id: "3",
    title: "Avocado Toast",
    category: "Breakfast",
    description:
      "Creamy smashed avocado on toasted sourdough with flaky salt and a squeeze of lemon.",
    image: "",
    content: `## Ingredients\n\n- 2 slices sourdough bread\n- 1 ripe avocado\n- 1 lemon, juiced\n- Flaky sea salt\n- Red chilli flakes (optional)\n- 2 eggs (optional, for poached eggs on top)\n\n## Instructions\n\n1. Toast the sourdough until golden and crispy.\n2. Halve the avocado, remove the stone, and scoop the flesh into a bowl.\n3. Add a squeeze of lemon juice and a pinch of salt. Mash to your preferred texture — chunky or smooth.\n4. Spread generously onto the toast.\n5. Top with flaky salt, chilli flakes, and a poached egg if using.\n\n## Notes\n\nRipe avocados should yield gently to pressure. Under-ripe avocados won't mash well and will taste bitter.`,
  },
  {
    id: "4",
    title: "French Onion Soup",
    category: "French",
    description:
      "Rich caramelized onion broth topped with a toasted crouton and bubbling melted Gruyère.",
    image: "",
    content: `## Ingredients\n\n- 1kg yellow onions, thinly sliced\n- 4 tbsp unsalted butter\n- 1 tbsp olive oil\n- 1 tsp sugar\n- 2 garlic cloves, minced\n- 200ml dry white wine\n- 1.5L beef stock\n- 4 thick slices baguette, toasted\n- 150g Gruyère, grated\n- Salt and pepper\n\n## Instructions\n\n1. Melt butter with oil in a large heavy pot over medium-low heat. Add onions and sugar. Cook, stirring occasionally, for 45–60 minutes until deeply caramelized and golden brown.\n2. Add garlic and cook 2 minutes. Pour in wine and scrape up any browned bits. Simmer until reduced by half.\n3. Add stock, bring to a simmer, and cook 20 minutes. Season with salt and pepper.\n4. Ladle soup into oven-safe bowls. Place a crouton on top and cover with Gruyère.\n5. Broil until cheese is bubbling and golden, 2–3 minutes. Serve immediately.\n\n## Notes\n\nDon't rush the caramelization — 45 minutes of patient stirring is what gives this soup its depth.`,
  },
];

window.SWEDISH_COLOURS = [
  { base: "röd", en: "röd", ett: "rött", plural: "röda", meaning: "red", hex: "#d73b32", nounEn: "en bil", nounEtt: "ett hus", pluralNoun: "bilar", sentence: "Jag har en röd bil.", translation: "I have a red car." },
  { base: "blå", en: "blå", ett: "blått", plural: "blå", meaning: "blue", hex: "#2767b1", nounEn: "en penna", nounEtt: "ett paraply", pluralNoun: "pennor", sentence: "Hon köper ett blått paraply.", translation: "She buys a blue umbrella." },
  { base: "grön", en: "grön", ett: "grönt", plural: "gröna", meaning: "green", hex: "#2f8f57", nounEn: "en tröja", nounEtt: "ett äpple", pluralNoun: "tröjor", sentence: "Det är ett grönt äpple.", translation: "It is a green apple." },
  { base: "gul", en: "gul", ett: "gult", plural: "gula", meaning: "yellow", hex: "#f0c23a", nounEn: "en blomma", nounEtt: "ett hus", pluralNoun: "blommor", sentence: "Jag ser en gul blomma.", translation: "I see a yellow flower." },
  { base: "vit", en: "vit", ett: "vitt", plural: "vita", meaning: "white", hex: "#f7f7f0", nounEn: "en skjorta", nounEtt: "ett papper", pluralNoun: "skjortor", sentence: "Han har en vit skjorta.", translation: "He has a white shirt." },
  { base: "svart", en: "svart", ett: "svart", plural: "svarta", meaning: "black", hex: "#202020", nounEn: "en väska", nounEtt: "ett bord", pluralNoun: "väskor", sentence: "Min väska är svart.", translation: "My bag is black." },
  { base: "grå", en: "grå", ett: "grått", plural: "grå", meaning: "gray", hex: "#8d9498", nounEn: "en jacka", nounEtt: "ett moln", pluralNoun: "jackor", sentence: "Molnet är grått.", translation: "The cloud is gray." },
  { base: "brun", en: "brun", ett: "brunt", plural: "bruna", meaning: "brown", hex: "#7b4b2a", nounEn: "en hund", nounEtt: "ett bord", pluralNoun: "hundar", sentence: "De har en brun hund.", translation: "They have a brown dog." },
  { base: "lila", en: "lila", ett: "lila", plural: "lila", meaning: "purple", hex: "#8050a8", nounEn: "en klänning", nounEtt: "ett rum", pluralNoun: "klänningar", sentence: "Hon gillar den lila klänningen.", translation: "She likes the purple dress." },
  { base: "rosa", en: "rosa", ett: "rosa", plural: "rosa", meaning: "pink", hex: "#e67aa7", nounEn: "en ros", nounEtt: "ett brev", pluralNoun: "rosor", sentence: "Barnet ritar ett rosa hus.", translation: "The child draws a pink house." },
  { base: "orange", en: "orange", ett: "orange", plural: "orange", meaning: "orange", hex: "#e67e22", nounEn: "en jacka", nounEtt: "ett glas", pluralNoun: "jackor", sentence: "Jag vill ha den orange jackan.", translation: "I want the orange jacket." },
  { base: "turkos", en: "turkos", ett: "turkost", plural: "turkosa", meaning: "turquoise", hex: "#31a7a2", nounEn: "en cykel", nounEtt: "ett halsband", pluralNoun: "cyklar", sentence: "Cykeln är turkos.", translation: "The bike is turquoise." },
  { base: "beige", en: "beige", ett: "beige", plural: "beige", meaning: "beige", hex: "#c7b799", nounEn: "en soffa", nounEtt: "ett täcke", pluralNoun: "soffor", sentence: "Vi köper en beige soffa.", translation: "We buy a beige sofa." },
  { base: "mörkblå", en: "mörkblå", ett: "mörkblått", plural: "mörkblå", meaning: "dark blue", hex: "#1d3764", nounEn: "en kostym", nounEtt: "ett block", pluralNoun: "kostymer", sentence: "Han har en mörkblå kostym.", translation: "He has a dark blue suit." },
  { base: "ljusblå", en: "ljusblå", ett: "ljusblått", plural: "ljusblå", meaning: "light blue", hex: "#8dc6e8", nounEn: "en skjorta", nounEtt: "ett rum", pluralNoun: "skjortor", sentence: "Rummet är ljusblått.", translation: "The room is light blue." },
  { base: "mörkgrön", en: "mörkgrön", ett: "mörkgrönt", plural: "mörkgröna", meaning: "dark green", hex: "#245d3b", nounEn: "en skog", nounEtt: "ett blad", pluralNoun: "skogar", sentence: "Skogen är mörkgrön.", translation: "The forest is dark green." },
  { base: "ljusgrön", en: "ljusgrön", ett: "ljusgrönt", plural: "ljusgröna", meaning: "light green", hex: "#91c96a", nounEn: "en vägg", nounEtt: "ett bord", pluralNoun: "väggar", sentence: "Vi målar en ljusgrön vägg.", translation: "We paint a light green wall." },
  { base: "silverfärgad", en: "silverfärgad", ett: "silverfärgat", plural: "silverfärgade", meaning: "silver-colored", hex: "#c0c0c0", nounEn: "en ring", nounEtt: "ett armband", pluralNoun: "ringar", sentence: "Hon bär en silverfärgad ring.", translation: "She wears a silver-colored ring." },
  { base: "guldfärgad", en: "guldfärgad", ett: "guldfärgat", plural: "guldfärgade", meaning: "gold-colored", hex: "#d4a62a", nounEn: "en klocka", nounEtt: "ett halsband", pluralNoun: "klockor", sentence: "Klockan är guldfärgad.", translation: "The watch is gold-colored." }
];

window.COLOUR_RULES = [
  ["Basic order", "Put the colour before the noun: en röd bil, ett rött hus."],
  ["en nouns", "Use the base colour form with en nouns: en grön tröja, en gul blomma."],
  ["ett nouns", "Many colours add -t or change spelling with ett nouns: ett grönt äpple, ett rött hus, ett blått paraply."],
  ["Plural nouns", "Many colours use -a with plural nouns: röda bilar, gröna tröjor, svarta väskor."],
  ["Colours that do not change", "Lila, rosa, orange, and beige often stay the same: en rosa ros, ett rosa hus, rosa rosor."]
];

window.COLOUR_NOUN_TRANSLATIONS = {
  armband: "bracelet",
  bil: "car",
  bilar: "cars",
  blad: "leaf",
  block: "notebook",
  blomma: "flower",
  blommor: "flowers",
  bord: "table",
  brev: "letter",
  cykel: "bike",
  cyklar: "bikes",
  glas: "glass",
  halsband: "necklace",
  hund: "dog",
  hundar: "dogs",
  hus: "house",
  jacka: "jacket",
  jackor: "jackets",
  klänning: "dress",
  klänningar: "dresses",
  klocka: "watch",
  klockor: "watches",
  kostym: "suit",
  kostymer: "suits",
  moln: "cloud",
  papper: "paper",
  paraply: "umbrella",
  penna: "pen",
  pennor: "pens",
  ring: "ring",
  ringar: "rings",
  ros: "rose",
  rosor: "roses",
  rum: "room",
  skjorta: "shirt",
  skjortor: "shirts",
  skog: "forest",
  skogar: "forests",
  soffa: "sofa",
  soffor: "sofas",
  täcke: "duvet",
  tröja: "sweater",
  tröjor: "sweaters",
  väska: "bag",
  väskor: "bags",
  vägg: "wall",
  väggar: "walls",
  äpple: "apple"
};

window.COLOUR_QUIZ = [
  { module: "numbers", q: "Choose the correct phrase: a red car.", options: ["en röd bil", "en rött bil", "ett röd bil"], answer: "en röd bil", audio: "en röd bil" },
  { module: "numbers", q: "Choose the correct phrase: a red house.", options: ["ett rött hus", "ett röd hus", "en rött hus"], answer: "ett rött hus", audio: "ett rött hus" },
  { module: "numbers", q: "Choose the correct phrase: a green apple.", options: ["ett grönt äpple", "ett grön äpple", "en grönt äpple"], answer: "ett grönt äpple", audio: "ett grönt äpple" },
  { module: "numbers", q: "Which colour means blue?", options: ["blå", "gul", "grön"], answer: "blå", audio: "blå" },
  { module: "numbers", q: "Which colour means black?", options: ["svart", "vit", "brun"], answer: "svart", audio: "svart" },
  { module: "numbers", q: "Choose the plural: red cars.", options: ["röda bilar", "röd bilar", "rött bilar"], answer: "röda bilar", audio: "röda bilar" },
  { module: "numbers", q: "Which colour often stays the same in en, ett, and plural forms?", options: ["rosa", "röd", "grön"], answer: "rosa", audio: "rosa" },
  { module: "numbers", q: "Translate: The room is light blue.", options: ["Rummet är ljusblått.", "Rummet är ljusblå.", "Rummet är blåa."], answer: "Rummet är ljusblått.", audio: "Rummet är ljusblått." }
];

if (Array.isArray(window.COURSE_MODULES)) {
  const numbers = window.COURSE_MODULES.find((item) => item.id === "numbers");
  if (numbers) {
    numbers.title = "Numbers, Time, and Colours";
    numbers.goal = "Learn numbers, ask about time, and use Swedish colours with en and ett nouns.";
    numbers.notes = [
      "Numbers help with time, phone numbers, prices, and everyday listening.",
      "Swedish colour words behave like adjectives: en röd bil, ett rött hus, röda bilar.",
      "Some colours do not change much: lila, rosa, orange, beige.",
      "Always put the colour before the noun when you describe a thing.",
      "Practise the full phrase with the article: en blå penna, ett blått paraply."
    ];
    numbers.practice = [
      ["Numbers", "noll, en, två, tre, fyra, fem, sex, sju, åtta, nio, tio"],
      ["Time", "Vad är klockan? Klockan är ett. Klockan är två."],
      ["en colour noun", "en röd bil, en blå penna, en grön tröja"],
      ["ett colour noun", "ett rött hus, ett blått paraply, ett grönt äpple"],
      ["Plural colours", "röda bilar, gröna tröjor, svarta väskor"]
    ];
    numbers.vocabulary = [
      ["noll", "zero"], ["en", "one / a for en nouns"], ["ett", "one / a for ett nouns"],
      ["två", "two"], ["tre", "three"], ["fyra", "four"], ["fem", "five"],
      ["röd / rött / röda", "red"], ["blå / blått / blå", "blue"], ["grön / grönt / gröna", "green"],
      ["gul / gult / gula", "yellow"], ["vit / vitt / vita", "white"], ["svart / svart / svarta", "black"],
      ["grå / grått / grå", "gray"], ["brun / brunt / bruna", "brown"], ["rosa", "pink"],
      ["lila", "purple"], ["orange", "orange"], ["beige", "beige"]
    ];
    numbers.examples = [
      "Vad är klockan?", "Klockan är ett.", "Klockan är två.",
      "en röd bil", "ett rött hus", "röda bilar",
      "en blå penna", "ett blått paraply", "en grön tröja", "ett grönt äpple",
      "Jag har en röd bil.", "Rummet är ljusblått."
    ];
  }
}

if (Array.isArray(window.COURSE_QUIZ)) {
  const existing = new Set(window.COURSE_QUIZ.map((item) => `${item.module}:${item.q}`));
  window.COLOUR_QUIZ.forEach((item) => {
    const key = `${item.module}:${item.q}`;
    if (!existing.has(key)) window.COURSE_QUIZ.push(item);
  });
}

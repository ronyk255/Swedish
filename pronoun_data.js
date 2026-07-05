window.SWEDISH_PRONOUN_GROUPS = [
  {
    title: "Subject pronouns",
    note: "Use these for the person or thing doing the action.",
    columns: ["English", "Swedish", "Example", "Translation"],
    rows: [
      ["I", "jag", "Jag studerar svenska.", "I study Swedish."],
      ["you (one person)", "du", "Du bor här.", "You live here."],
      ["he", "han", "Han dricker kaffe.", "He drinks coffee."],
      ["she", "hon", "Hon läser en bok.", "She reads a book."],
      ["it / that (en word)", "den", "Den är röd.", "It is red."],
      ["it / that (ett word)", "det", "Det är stort.", "It is big."],
      ["we", "vi", "Vi talar engelska.", "We speak English."],
      ["you (plural)", "ni", "Ni äter lunch.", "You eat lunch."],
      ["they", "de", "De arbetar i dag.", "They work today."]
    ]
  },
  {
    title: "Object pronouns",
    note: "Use these after the verb when someone receives the action.",
    columns: ["English", "Swedish", "Example", "Translation"],
    rows: [
      ["me", "mig", "Du hjälper mig.", "You help me."],
      ["you", "dig", "Jag ser dig.", "I see you."],
      ["him", "honom", "Jag känner honom.", "I know him."],
      ["her", "henne", "Vi träffar henne.", "We meet her."],
      ["it / that (en word)", "den", "Jag köper den.", "I buy it."],
      ["it / that (ett word)", "det", "Jag läser det.", "I read it."],
      ["us", "oss", "Han hjälper oss.", "He helps us."],
      ["you (plural)", "er", "Hon ringer er.", "She calls you."],
      ["them", "dem", "Jag förstår dem.", "I understand them."]
    ]
  },
  {
    title: "Possessive pronouns",
    note: "Min/din/vår/er change with en, ett, and plural nouns. Hans, hennes, and deras do not change.",
    columns: ["Owner", "en noun", "ett noun", "plural noun", "Translation"],
    rows: [
      ["my", "min bok", "mitt brev", "mina böcker", "my book / my letter / my books"],
      ["your", "din bok", "ditt brev", "dina böcker", "your book / your letter / your books"],
      ["his", "hans bok", "hans brev", "hans böcker", "his book / his letter / his books"],
      ["her", "hennes bok", "hennes brev", "hennes böcker", "her book / her letter / her books"],
      ["its (en/ett thing)", "dess färg", "dess namn", "dess färger", "its color / its name / its colors"],
      ["our", "vår bok", "vårt brev", "våra böcker", "our book / our letter / our books"],
      ["your (plural)", "er bok", "ert brev", "era böcker", "your book / your letter / your books"],
      ["their", "deras bok", "deras brev", "deras böcker", "their book / their letter / their books"]
    ]
  },
  {
    title: "Reflexive pronouns",
    note: "Use these when the subject and object are the same person. Sig works for han, hon, den, det, and de.",
    columns: ["English", "Swedish", "Example", "Translation"],
    rows: [
      ["myself", "mig", "Jag tvättar mig.", "I wash myself."],
      ["yourself", "dig", "Du sätter dig.", "You sit down."],
      ["himself", "sig", "Han klär på sig.", "He gets dressed."],
      ["herself", "sig", "Hon känner sig trött.", "She feels tired."],
      ["ourselves", "oss", "Vi lär oss svenska.", "We learn Swedish."],
      ["yourselves", "er", "Ni sätter er här.", "You sit down here."],
      ["themselves", "sig", "De presenterar sig.", "They introduce themselves."]
    ]
  },
  {
    title: "Reflexive possessives",
    note: "Sin/sitt/sina means his/her/its/their own. It points back to the subject of the sentence.",
    columns: ["Form", "Example", "Translation", "Meaning"],
    rows: [
      ["sin + en noun", "Han läser sin bok.", "He reads his own book.", "his own / her own / their own"],
      ["sitt + ett noun", "Hon skriver sitt namn.", "She writes her own name.", "his own / her own / their own"],
      ["sina + plural", "De träffar sina vänner.", "They meet their own friends.", "his own / her own / their own"],
      ["contrast", "Han läser hans bok.", "He reads his book.", "someone else's book, not necessarily his own"]
    ]
  }
];

window.SWEDISH_PRONOUN_SENTENCE_PATTERNS = [
  ["Subject + verb", "Jag bor här.", "I live here.", "Swap the subject: du bor, han bor, hon bor, vi bor, de bor."],
  ["Subject + verb + object", "Jag ser henne.", "I see her.", "The object pronoun comes after the verb."],
  ["Question", "Känner du honom?", "Do you know him?", "In yes/no questions, the verb comes first."],
  ["Negative", "Hon hjälper inte mig.", "She does not help me.", "Inte usually comes after the verb in a simple main clause."],
  ["Possessive + noun", "Det är min bok.", "It is my book.", "Min changes to mitt or mina depending on the noun."],
  ["Reflexive", "Han sätter sig.", "He sits down.", "Sig points back to han."],
  ["Reflexive possessive", "Hon tar sin väska.", "She takes her own bag.", "Sin points back to hon."],
  ["Plural people", "De ringer oss.", "They call us.", "De is often pronounced like dom in everyday speech."],
  ["Polite/group you", "Ni kan fråga mig.", "You can ask me.", "Ni is plural you and can also sound polite in some service situations."],
  ["Thing pronouns", "Jag köper den. Jag läser det.", "I buy it. I read it.", "Use den for en words and det for ett words."]
];

window.SWEDISH_PRONOUN_QUIZ = [
  { module: "verbs", q: "Which Swedish pronoun means he?", options: ["han", "hon", "de"], answer: "han", audio: "han" },
  { module: "verbs", q: "Which Swedish pronoun means she?", options: ["hon", "han", "den"], answer: "hon", audio: "hon" },
  { module: "verbs", q: "Which Swedish pronoun means they?", options: ["de", "du", "ni"], answer: "de", audio: "de" },
  { module: "verbs", q: "Choose the object pronoun: I see him.", options: ["Jag ser honom.", "Jag ser han.", "Jag ser hans."], answer: "Jag ser honom.", audio: "Jag ser honom." },
  { module: "verbs", q: "Choose the object pronoun: You help me.", options: ["Du hjälper mig.", "Du hjälper jag.", "Du hjälper min."], answer: "Du hjälper mig.", audio: "Du hjälper mig." },
  { module: "verbs", q: "Choose the possessive form: my letter.", options: ["mitt brev", "min brev", "mina brev"], answer: "mitt brev", audio: "mitt brev" },
  { module: "verbs", q: "Choose the possessive form: her book.", options: ["hennes bok", "henne bok", "hon bok"], answer: "hennes bok", audio: "hennes bok" },
  { module: "verbs", q: "Choose the reflexive sentence: He sits down.", options: ["Han sätter sig.", "Han sätter honom.", "Honom sätter han."], answer: "Han sätter sig.", audio: "Han sätter sig." },
  { module: "verbs", q: "Which means our books?", options: ["våra böcker", "vår böcker", "vårt böcker"], answer: "våra böcker", audio: "våra böcker" },
  { module: "verbs", q: "Which sentence means They call us?", options: ["De ringer oss.", "Dem ringer vi.", "De ringer vår."], answer: "De ringer oss.", audio: "De ringer oss." }
];

if (Array.isArray(window.COURSE_MODULES)) {
  const verbs = window.COURSE_MODULES.find((item) => item.id === "verbs");
  if (verbs) {
    verbs.title = "Pronouns, Objects, Possessives, and Present Tense";
    verbs.goal = "Use Swedish subject, object, possessive, and reflexive pronouns in everyday sentences with clear English translations.";
    verbs.notes = [
      "Subject pronouns do the action: jag, du, han, hon, den, det, vi, ni, de.",
      "Object pronouns receive the action: mig, dig, honom, henne, den, det, oss, er, dem.",
      "Possessives show ownership. Min, din, vår, and er change with en, ett, and plural nouns.",
      "Hans, hennes, dess, and deras do not change.",
      "Reflexive pronouns point back to the subject: Jag tvättar mig. Han sätter sig."
    ];
    verbs.practice = window.SWEDISH_PRONOUN_SENTENCE_PATTERNS.map(([title, swedish]) => [title, swedish]);
    verbs.examples = window.SWEDISH_PRONOUN_SENTENCE_PATTERNS.map(([, swedish]) => swedish);
    verbs.vocabulary = [
      ["jag", "I"], ["du", "you"], ["han", "he"], ["hon", "she"], ["den", "it / that for en words"],
      ["det", "it / that for ett words"], ["vi", "we"], ["ni", "you plural"], ["de", "they"],
      ["mig", "me / myself"], ["dig", "you / yourself"], ["honom", "him"], ["henne", "her"],
      ["oss", "us / ourselves"], ["er", "you plural / yourselves"], ["dem", "them"],
      ["min / mitt / mina", "my"], ["din / ditt / dina", "your"], ["hans", "his"], ["hennes", "her"],
      ["vår / vårt / våra", "our"], ["er / ert / era", "your plural"], ["deras", "their"],
      ["sig", "himself / herself / itself / themselves"], ["sin / sitt / sina", "his/her/their own"]
    ];
  }
}

if (Array.isArray(window.COURSE_QUIZ)) {
  const existing = new Set(window.COURSE_QUIZ.map((item) => `${item.module}:${item.q}`));
  window.SWEDISH_PRONOUN_QUIZ.forEach((item) => {
    const key = `${item.module}:${item.q}`;
    if (!existing.has(key)) window.COURSE_QUIZ.push(item);
  });
}

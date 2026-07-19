window.SWEDISH_PRONOUN_GROUPS = [
  {
    title: "1. Subject pronouns — who or what does the action?",
    note: "A subject normally comes before the verb. Swedish verbs do not change with the subject: jag arbetar, hon arbetar, de arbetar. In speech, de is usually pronounced dom.",
    columns: ["English", "Swedish", "Present-tense example", "Translation"],
    rows: [
      ["I", "jag", "Jag studerar svenska.", "I study Swedish."],
      ["you (one person)", "du", "Du bor här.", "You live here."],
      ["he", "han", "Han dricker kaffe.", "He drinks coffee."],
      ["she", "hon", "Hon läser en bok.", "She reads a book."],
      ["it / that (en word)", "den", "Bilen är ny. Den är röd.", "The car is new. It is red."],
      ["it / that (ett word)", "det", "Huset är nytt. Det är stort.", "The house is new. It is big."],
      ["we", "vi", "Vi talar engelska.", "We speak English."],
      ["you (plural)", "ni", "Ni äter lunch.", "You are eating lunch."],
      ["they", "de", "De arbetar i dag.", "They are working today."]
    ]
  },
  {
    title: "2. Object pronouns — who or what receives the action?",
    note: "Use an object form after a verb or preposition: hon ser mig; till honom; med dem. Do not use a subject form here. Write de for they and dem for them, although both are often pronounced dom.",
    columns: ["English", "Swedish", "Example", "Translation"],
    rows: [
      ["me", "mig", "Du hjälper mig.", "You help me."],
      ["you", "dig", "Jag ser dig.", "I see you."],
      ["him", "honom", "Jag känner honom.", "I know him."],
      ["her", "henne", "Vi träffar henne.", "We meet her."],
      ["it (en word)", "den", "Boken är bra. Jag läser den.", "The book is good. I am reading it."],
      ["it (ett word)", "det", "Brevet kom. Jag läste det.", "The letter arrived. I read it."],
      ["us", "oss", "Han hjälper oss.", "He helps us."],
      ["you (plural)", "er", "Hon ringer er i morgon.", "She will call you tomorrow."],
      ["them", "dem", "Jag förstår dem.", "I understand them."]
    ]
  },
  {
    title: "3. Possessives — match the owned noun",
    note: "The noun, not the owner, chooses the ending. Use -n with an en noun, -t with an ett noun, and -a with any plural noun. The noun is normally indefinite after a possessive: min bok, never min boken.",
    columns: ["Owner", "en noun", "ett noun", "plural noun", "Meaning"],
    rows: [
      ["my", "min bok", "mitt hus", "mina böcker", "my book / house / books"],
      ["your (singular)", "din bok", "ditt hus", "dina böcker", "your book / house / books"],
      ["his", "hans bok", "hans hus", "hans böcker", "his book / house / books"],
      ["her", "hennes bok", "hennes hus", "hennes böcker", "her book / house / books"],
      ["its", "dess färg", "dess namn", "dess färger", "its color / name / colors"],
      ["our", "vår bok", "vårt hus", "våra böcker", "our book / house / books"],
      ["your (plural)", "er bok", "ert hus", "era böcker", "your book / house / books"],
      ["their", "deras bok", "deras hus", "deras böcker", "their book / house / books"]
    ]
  },
  {
    title: "4. Reflexive object pronouns — the action returns to the subject",
    note: "Use mig, dig, oss, or er with jag, du, vi, or ni. Use sig with han, hon, den, det, or de. Reflexive verbs should be learned as a whole: tvätta sig, sätta sig, känna sig, skynda sig.",
    columns: ["Subject", "Reflexive", "Example", "Translation"],
    rows: [
      ["jag", "mig", "Jag tvättar mig.", "I wash myself."],
      ["du", "dig", "Du sätter dig.", "You sit down."],
      ["han / hon", "sig", "Hon känner sig trött.", "She feels tired."],
      ["den / det", "sig", "Katten gömmer sig.", "The cat hides."],
      ["vi", "oss", "Vi lär oss svenska.", "We learn Swedish."],
      ["ni", "er", "Ni sätter er här.", "You sit down here."],
      ["de", "sig", "De presenterar sig.", "They introduce themselves."]
    ]
  },
  {
    title: "5. Reflexive possessives — sin, sitt, sina",
    note: "Sin/sitt/sina means the subject's own and is used only for a third-person subject. The owned noun controls the form: sin + en, sitt + ett, sina + plural. Use hans, hennes, or deras when the owner is someone other than the subject.",
    columns: ["Rule", "Example", "Translation", "What it tells us"],
    rows: [
      ["sin + en noun", "Sara tar sin jacka.", "Sara takes her own jacket.", "The jacket belongs to Sara."],
      ["sitt + ett noun", "Omar säljer sitt hus.", "Omar sells his own house.", "The house belongs to Omar."],
      ["sina + plural", "De träffar sina vänner.", "They meet their own friends.", "The friends belong to them."],
      ["hennes ≠ subject", "Sara tar hennes jacka.", "Sara takes her jacket.", "The jacket belongs to another woman."],
      ["deras ≠ subject", "De träffar deras vänner.", "They meet their friends.", "The friends belong to other people."],
      ["first person", "Jag tar min jacka.", "I take my jacket.", "Use min, not sin, with jag."]
    ]
  },
  {
    title: "6. Pronouns across present, past, perfect, and future",
    note: "Pronouns stay the same when time changes, and the verb form is the same for every subject. Time words help show when an action happens. Future commonly uses ska + infinitive or kommer att + infinitive.",
    columns: ["Time", "Pattern", "Example", "Translation"],
    rows: [
      ["present", "pronoun + present verb", "Hon ringer mig varje dag.", "She calls me every day."],
      ["past", "pronoun + past verb", "Hon ringde mig i går.", "She called me yesterday."],
      ["perfect", "pronoun + har + supine", "Hon har ringt mig.", "She has called me."],
      ["future plan", "pronoun + ska + infinitive", "Hon ska ringa mig i kväll.", "She will call me tonight."],
      ["future prediction", "pronoun + kommer att + infinitive", "Hon kommer att ringa mig.", "She is going to call me."],
      ["same verb, plural", "de + same verb form", "De ringer oss varje dag.", "They call us every day."]
    ]
  }
];

window.SWEDISH_PRONOUN_SENTENCE_PATTERNS = [
  ["Subject: jag", "Jag arbetar hemma i dag.", "I am working at home today.", "Jag is the person doing the action."],
  ["Subject: du", "Du talar svenska mycket bra.", "You speak Swedish very well.", "The verb talar does not change with du."],
  ["Subject: han", "Han lagar middag åt oss.", "He cooks dinner for us.", "Han is the subject; oss follows the preposition åt."],
  ["Subject: hon", "Hon läser tidningen varje morgon.", "She reads the newspaper every morning.", "A present form can describe a habit."],
  ["Subjects: vi and ni", "Vi väntar på er utanför.", "We are waiting for you outside.", "Vi does the action; er is the object after på."],
  ["Subject and object", "De ser oss, men vi ser inte dem.", "They see us, but we do not see them.", "De means they; dem means them."],
  ["en-word pronoun", "Jag köpte bilen eftersom den var billig.", "I bought the car because it was inexpensive.", "Use den to refer back to en bil."],
  ["ett-word pronoun", "Vi såg huset och tyckte om det.", "We saw the house and liked it.", "Use det to refer back to ett hus."],
  ["Object after a verb", "Kan du hjälpa mig med läxan?", "Can you help me with the homework?", "Mig receives the action."],
  ["Object after a preposition", "Hon gav nyckeln till honom.", "She gave the key to him.", "Use honom, not han, after till."],
  ["Possessive + en noun", "Var är min telefon?", "Where is my phone?", "Telefon is an en word, so use min."],
  ["Possessive + ett noun", "Deras barn går i vår skola.", "Their child attends our school.", "Deras never changes; vår agrees with en skola."],
  ["Possessive + plural", "Våra grannar känner dina föräldrar.", "Our neighbors know your parents.", "Plural nouns take våra and dina."],
  ["No definite ending", "Det här är mitt nya jobb.", "This is my new job.", "After mitt, use indefinite jobb, not jobbet."],
  ["Reflexive object", "Barnen tvättar sig före maten.", "The children wash before the meal.", "Sig points back to the third-person subject barnen."],
  ["Reflexive verb", "Vi skyndar oss till bussen.", "We hurry to the bus.", "Learn skynda sig as a complete verb."],
  ["Sin: own en noun", "Erik hämtar sin dotter på skolan.", "Erik picks up his own daughter at school.", "Sin points back to Erik."],
  ["Hans: another owner", "Erik hämtar hans dotter på skolan.", "Erik picks up his daughter at school.", "Hans points to another man, not Erik."],
  ["Sitt: own ett noun", "Maja öppnar sitt fönster.", "Maja opens her own window.", "Fönster is an ett word, so use sitt."],
  ["Sina: own plural", "Lärarna pratar med sina elever.", "The teachers talk with their own students.", "Elever is plural, so use sina."],
  ["Present", "Jag ringer henne varje fredag.", "I call her every Friday.", "Present tense can express a repeated action."],
  ["Past", "Jag ringde henne i går.", "I called her yesterday.", "Ringde is past; the pronouns do not change."],
  ["Perfect", "Jag har redan ringt henne.", "I have already called her.", "Perfect uses har + the supine ringt."],
  ["Future with ska", "Jag ska ringa henne i kväll.", "I will call her tonight.", "After ska, use the infinitive ringa."],
  ["Future with kommer att", "De kommer att besöka oss nästa vecka.", "They are going to visit us next week.", "Kommer att often presents a prediction or expected future."],
  ["Yes/no question", "Känner du dem?", "Do you know them?", "Put the verb before the subject in a yes/no question."],
  ["Question word", "Varför ringer hon dig?", "Why is she calling you?", "Question word + verb + subject is the main-clause pattern."],
  ["Main-clause negation", "Han förstår inte mig.", "He does not understand me.", "Inte normally follows the finite verb."],
  ["Time first: V2", "I morgon ska vi träffa dem.", "Tomorrow we will meet them.", "When time comes first, the finite verb remains second and precedes the subject."],
  ["Formal or gender-neutral", "Kim sa att hen skulle hjälpa oss.", "Kim said that they would help us.", "Hen is a gender-neutral singular pronoun; the object form is hen or henom."],
  ["Spoken de/dem", "De tycker om dem.", "They like them.", "Both de and dem are commonly pronounced dom, but formal writing keeps the distinction."],
  ["General det", "Det regnar, men det gör inget.", "It is raining, but it does not matter.", "Det is also an impersonal subject for weather and general expressions."]
];

window.SWEDISH_PRONOUN_QUIZ = [
  { module: "verbs", q: "Choose the subject pronoun: ___ hjälper mig.", options: ["Hon", "Henne", "Hennes"], answer: "Hon", audio: "Hon hjälper mig." },
  { module: "verbs", q: "Choose the object pronoun: Jag ser ___.", options: ["honom", "han", "hans"], answer: "honom", audio: "Jag ser honom." },
  { module: "verbs", q: "Which sentence means 'They call us'?", options: ["De ringer oss.", "Dem ringer vi.", "De ringer vår."], answer: "De ringer oss.", audio: "De ringer oss." },
  { module: "verbs", q: "Complete 'my house' (ett hus).", options: ["mitt hus", "min hus", "mina hus"], answer: "mitt hus", audio: "mitt hus" },
  { module: "verbs", q: "Complete 'our books' (plural).", options: ["våra böcker", "vår böcker", "vårt böcker"], answer: "våra böcker", audio: "våra böcker" },
  { module: "verbs", q: "Which possessive never changes for en, ett, or plural?", options: ["hennes", "min", "vår"], answer: "hennes", audio: "hennes bok, hennes hus, hennes böcker" },
  { module: "verbs", q: "Choose the correct reflexive form: Vi lär ___ svenska.", options: ["oss", "sig", "vår"], answer: "oss", audio: "Vi lär oss svenska." },
  { module: "verbs", q: "Choose the correct reflexive form: Hon sätter ___.", options: ["sig", "henne", "hennes"], answer: "sig", audio: "Hon sätter sig." },
  { module: "verbs", q: "Sara takes her own bag.", options: ["Sara tar sin väska.", "Sara tar hennes väska.", "Sara tar sitt väska."], answer: "Sara tar sin väska.", audio: "Sara tar sin väska." },
  { module: "verbs", q: "Omar sells his own house (ett hus).", options: ["Omar säljer sitt hus.", "Omar säljer sin hus.", "Omar säljer hans hus."], answer: "Omar säljer sitt hus.", audio: "Omar säljer sitt hus." },
  { module: "verbs", q: "The teachers meet their own students (plural).", options: ["Lärarna träffar sina elever.", "Lärarna träffar sin elever.", "Lärarna träffar deras elever."], answer: "Lärarna träffar sina elever.", audio: "Lärarna träffar sina elever." },
  { module: "verbs", q: "Choose it for an en word: Jag köper boken. Jag köper ___.", options: ["den", "det", "dem"], answer: "den", audio: "Jag köper den." },
  { module: "verbs", q: "Choose it for an ett word: Jag läser brevet. Jag läser ___.", options: ["det", "den", "dess"], answer: "det", audio: "Jag läser det." },
  { module: "verbs", q: "Choose the correct past sentence.", options: ["Hon ringde mig i går.", "Hon ringer mig i går.", "Hon ska ringde mig."], answer: "Hon ringde mig i går.", audio: "Hon ringde mig i går." },
  { module: "verbs", q: "Choose the correct perfect sentence.", options: ["Hon har ringt mig.", "Hon har ringde mig.", "Hon ringt mig."], answer: "Hon har ringt mig.", audio: "Hon har ringt mig." },
  { module: "verbs", q: "Choose the correct future sentence.", options: ["Hon ska ringa mig.", "Hon ska ringer mig.", "Hon ska ringde mig."], answer: "Hon ska ringa mig.", audio: "Hon ska ringa mig." },
  { module: "verbs", q: "Choose the correct question.", options: ["Känner du henne?", "Du känner henne?", "Känner henne du?"], answer: "Känner du henne?", audio: "Känner du henne?" },
  { module: "verbs", q: "Choose the standard written forms for 'They see them.'", options: ["De ser dem.", "Dem ser de.", "De ser de."], answer: "De ser dem.", audio: "De ser dem." }
];

if (Array.isArray(window.COURSE_MODULES)) {
  const verbs = window.COURSE_MODULES.find((item) => item.id === "verbs");
  if (verbs) {
    verbs.title = "Swedish Pronouns: Subject, Object, Possessive, and Reflexive";
    verbs.goal = "Choose and use Swedish subject, object, possessive, and reflexive pronouns accurately with en words, ett words, plurals, and common verb tenses.";
    verbs.sourceNote = "This dense A1–A2 lesson teaches the complete core pronoun system through agreement rules, contrasts, tense patterns, and translated sentence models.";
    verbs.notes = [
      "Subject pronouns do the action: jag, du, han, hon, den, det, vi, ni, de. Object pronouns receive it: mig, dig, honom, henne, den, det, oss, er, dem.",
      "Swedish verbs use the same form with every subject: jag talar, hon talar, vi talar, de talar. The verb changes for tense, not for person or number.",
      "Use den for an en word and det for an ett word: en bil → den; ett hus → det. Use de/dem for plural people or things.",
      "Min/din/vår/er agree with the owned noun: min/vår/er bok; mitt/vårt/ert hus; mina/våra/era böcker. Hans, hennes, dess, and deras never change.",
      "After a possessive, use the indefinite noun form: min bok, mitt hus, mina böcker—not min boken or mitt huset.",
      "Reflexive objects point back to the subject: jag tvättar mig, du tvättar dig, hon tvättar sig, vi tvättar oss, ni tvättar er, de tvättar sig.",
      "Sin/sitt/sina means a third-person subject's own: sin + en noun, sitt + ett noun, sina + plural. Hans/hennes/deras normally points to somebody else.",
      "Pronouns do not change across time: hon ringer mig; hon ringde mig; hon har ringt mig; hon ska ringa mig. After ska or kommer att, use the infinitive.",
      "In statements the finite verb is position 2; in yes/no questions it comes before the subject: I morgon ringer hon mig. Ringer hon mig?",
      "In careful writing, de means they and dem means them. Both are commonly pronounced dom in everyday speech."
    ];
    verbs.practice = window.SWEDISH_PRONOUN_SENTENCE_PATTERNS.map(([title, swedish, translation]) => [title, `${swedish} — ${translation}`]);
    verbs.examples = window.SWEDISH_PRONOUN_SENTENCE_PATTERNS.map(([, swedish]) => swedish);
    verbs.vocabulary = [
      ["jag / mig / min", "I / me / my"], ["du / dig / din", "you / you / your"],
      ["han / honom / hans", "he / him / his"], ["hon / henne / hennes", "she / her / her"],
      ["den / den / dess", "it / it / its (en word)"], ["det / det / dess", "it / it / its (ett word)"],
      ["vi / oss / vår", "we / us / our"], ["ni / er / er", "you / you / your (plural)"],
      ["de / dem / deras", "they / them / their"], ["hen / hen (henom)", "gender-neutral singular they / them"],
      ["min / mitt / mina", "my: en / ett / plural"], ["din / ditt / dina", "your: en / ett / plural"],
      ["vår / vårt / våra", "our: en / ett / plural"], ["er / ert / era", "your plural: en / ett / plural"],
      ["sin / sitt / sina", "his, her, or their own: en / ett / plural"], ["sig", "himself / herself / itself / themselves"],
      ["subjekt", "subject—the doer"], ["objekt", "object—the receiver"], ["ägare", "owner"],
      ["nutid", "present"], ["dåtid", "past"], ["perfekt", "present perfect"], ["framtid", "future"]
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

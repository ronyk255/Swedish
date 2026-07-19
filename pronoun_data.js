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

// Intensive theory curriculum: every core pronoun type has at least 20
// translated examples. Each entry is [Swedish, English, teaching point].
window.SWEDISH_PRONOUN_INTENSIVE_LESSONS = [
  {
    id: "subject",
    title: "Subject pronouns",
    subtitle: "Who or what performs the action?",
    rule: "Use jag, du, han, hon, hen, den, det, vi, ni, or de as the subject. Swedish verbs do not change with the person: jag arbetar, hon arbetar, de arbetar.",
    forms: "jag · du · han · hon · hen · den · det · vi · ni · de",
    examples: [
      ["Jag läser svenska varje kväll.", "I study Swedish every evening.", "Jag is the subject; läser is present tense."],
      ["Du arbetar hemifrån i dag.", "You are working from home today.", "Du is singular and informal you."],
      ["Han lagade middag i går.", "He cooked dinner yesterday.", "Han stays the same while the verb changes to past tense."],
      ["Hon har redan gått till jobbet.", "She has already gone to work.", "Perfect tense uses har + supine."],
      ["Hen ska börja på måndag.", "They will start on Monday.", "Hen is a gender-neutral singular subject."],
      ["Bilen är gammal, men den fungerar bra.", "The car is old, but it works well.", "Den refers back to the en-word bilen."],
      ["Huset är litet, men det har en stor trädgård.", "The house is small, but it has a large garden.", "Det refers back to the ett-word huset."],
      ["Vi lär oss nya ord varje dag.", "We learn new words every day.", "Vi is the plural first-person subject."],
      ["Ni kan sitta här.", "You can sit here.", "Ni addresses two or more people."],
      ["De kommer att flytta nästa år.", "They are going to move next year.", "De is written they and commonly pronounced dom."],
      ["I dag arbetar jag hemma.", "Today I am working at home.", "With time first, the verb remains second and jag follows it."],
      ["I morgon ska hon träffa läkaren.", "Tomorrow she will see the doctor.", "The finite verb ska occupies position two."],
      ["Talar du svenska på jobbet?", "Do you speak Swedish at work?", "A yes/no question puts the verb before the subject."],
      ["Var bor de nu?", "Where do they live now?", "Question word + verb + subject."],
      ["Han förstår inte frågan.", "He does not understand the question.", "Inte normally follows the finite verb in a main clause."],
      ["Vi åt inte hemma i går.", "We did not eat at home yesterday.", "The subject form is unchanged in a past negative."],
      ["Det regnar mycket i Göteborg.", "It rains a lot in Gothenburg.", "Det is an impersonal subject for weather."],
      ["Det finns kaffe i köket.", "There is coffee in the kitchen.", "Det finns introduces something that exists."],
      ["Man betalar i kassan.", "You/one pays at the checkout.", "Man expresses people in general, like generic you or one."],
      ["Alla elever kom, och de satte sig direkt.", "All the students came, and they sat down immediately.", "De replaces the plural noun phrase alla elever."],
      ["Varken hon eller jag kör bil.", "Neither she nor I drive.", "Subject forms are used on both sides of eller."],
      ["Det var vi som ringde.", "It was we who called.", "Vi remains the subject of ringde."],
      ["När jag kommer hem, ska vi äta.", "When I come home, we will eat.", "Jag is subject in the subordinate clause; vi in the main clause."],
      ["De säger att hon talar flytande svenska.", "They say that she speaks fluent Swedish.", "A sentence may contain a new subject in each clause."]
    ]
  },
  {
    id: "object",
    title: "Object pronouns",
    subtitle: "Who or what receives the action?",
    rule: "Use mig, dig, honom, henne, hen/henom, den, det, oss, er, or dem after a verb or preposition. In careful writing, de means they and dem means them.",
    forms: "mig · dig · honom · henne · hen/henom · den · det · oss · er · dem",
    examples: [
      ["Kan du hjälpa mig?", "Can you help me?", "Mig receives the action of hjälpa."],
      ["Jag ringer dig efter jobbet.", "I will call you after work.", "Dig is the singular object form of du."],
      ["Vi såg honom på stationen.", "We saw him at the station.", "Use honom, not han, as an object."],
      ["De väntar på henne utanför.", "They are waiting for her outside.", "Use henne after the preposition på."],
      ["Jag frågade hen om vägen.", "I asked them for directions.", "Hen can be an object; henom also occurs."],
      ["Boken är intressant; jag läser den nu.", "The book is interesting; I am reading it now.", "Den replaces the en-word boken."],
      ["Brevet kom i går, men jag öppnade det inte.", "The letter arrived yesterday, but I did not open it.", "Det replaces the ett-word brevet."],
      ["Läraren gav oss extra tid.", "The teacher gave us extra time.", "Oss is the object form of vi."],
      ["Jag möter er vid entrén.", "I will meet you at the entrance.", "Er is the plural object form of ni."],
      ["Känner du dem från skolan?", "Do you know them from school?", "Dem is the object; it is commonly pronounced dom."],
      ["Hon skickade ett meddelande till mig.", "She sent a message to me.", "Object forms follow prepositions such as till."],
      ["Det här är mellan dig och mig.", "This is between you and me.", "Use object forms after mellan."],
      ["Han satt bredvid henne på bussen.", "He sat beside her on the bus.", "Henne follows the preposition bredvid."],
      ["Chefen pratade med oss i morse.", "The manager spoke with us this morning.", "Oss follows med."],
      ["Jag ska visa er den nya lokalen.", "I will show you the new premises.", "Er is the receiver; lokalen is the thing shown."],
      ["Hon gav honom nycklarna.", "She gave him the keys.", "Honom is the indirect object."],
      ["De hörde inte mig.", "They did not hear me.", "Inte follows the verb; mig remains the object."],
      ["Varför frågar du henne och inte honom?", "Why are you asking her and not him?", "Both contrasted people use object forms."],
      ["Jag har aldrig träffat dem förut.", "I have never met them before.", "The object follows the supine träffat."],
      ["Kommer hon att bjuda oss på festen?", "Is she going to invite us to the party?", "Oss remains the object in a future question."],
      ["Ta den, om du behöver den.", "Take it if you need it.", "Both instances of den refer to an en-word object."],
      ["Jag förstod det inte först.", "I did not understand it at first.", "With a pronoun object, det commonly comes before inte."],
      ["Barnen såg oss, men vi såg inte dem.", "The children saw us, but we did not see them.", "Compare subject vi with object oss and object dem."],
      ["Vem av dem känner du bäst?", "Which of them do you know best?", "Dem follows av; du is the subject of känner."]
    ]
  },
  {
    id: "possessive",
    title: "Possessive pronouns",
    subtitle: "Who owns it, and what form does the noun require?",
    rule: "The owned noun controls the ending: min/din/vår/er with an en-word, mitt/ditt/vårt/ert with an ett-word, and mina/dina/våra/era with plurals. Hans, hennes, hens, dess, and deras never change. Use an indefinite noun after a possessive.",
    forms: "min–mitt–mina · din–ditt–dina · vår–vårt–våra · er–ert–era · hans · hennes · hens · dess · deras",
    examples: [
      ["Det här är min bok.", "This is my book.", "Bok is an en-word, so use min."],
      ["Mitt pass ligger i väskan.", "My passport is in the bag.", "Pass is an ett-word, so use mitt."],
      ["Mina nycklar är borta.", "My keys are missing.", "A plural noun takes mina."],
      ["Är det din jacka?", "Is that your jacket?", "Jacka is an en-word, so use din."],
      ["Vad är ditt telefonnummer?", "What is your phone number?", "Telefonnummer is an ett-word, so use ditt."],
      ["Dina barn väntar utanför.", "Your children are waiting outside.", "Plural barn takes dina even though singular barn is an ett-word."],
      ["Hans cykel är ny.", "His bicycle is new.", "Hans never changes."],
      ["Jag har hittat hans paraply.", "I have found his umbrella.", "Hans is unchanged before an ett-word."],
      ["Hennes föräldrar bor i Malmö.", "Her parents live in Malmö.", "Hennes is unchanged before a plural."],
      ["Hens beslut var svårt.", "Their decision was difficult.", "Hens is the possessive corresponding to gender-neutral hen."],
      ["Företaget ändrade sitt namn och dess logotyp.", "The company changed its name and its logo.", "Dess can mark possession by a thing; sitt points back to the subject."],
      ["Vår lärare talar tydligt.", "Our teacher speaks clearly.", "Lärare is an en-word, so use vår."],
      ["Vårt kontor ligger i centrum.", "Our office is in the city center.", "Kontor is an ett-word, so use vårt."],
      ["Våra vänner kommer i kväll.", "Our friends are coming tonight.", "Plural vänner takes våra."],
      ["Är det er bil?", "Is that your car?", "Er agrees with the en-word bil and addresses several owners."],
      ["Var ligger ert hotell?", "Where is your hotel?", "Hotell is an ett-word, so use ert."],
      ["Era platser är längst fram.", "Your seats are at the front.", "Plural platser takes era."],
      ["Deras lägenhet är ljus.", "Their apartment is bright.", "Deras never changes."],
      ["Deras hus har tre sovrum.", "Their house has three bedrooms.", "Deras is unchanged before an ett-word."],
      ["Jag känner deras grannar.", "I know their neighbors.", "Deras is unchanged before a plural."],
      ["Min nya dator är snabb.", "My new computer is fast.", "After a possessive, the adjective uses the definite -a form: nya."],
      ["Vi säljer vårt gamla hus.", "We are selling our old house.", "Use gamla with a possessive, but keep the noun indefinite: hus."],
      ["Hon tog med sig sina två hundar.", "She brought her two dogs with her.", "Sina agrees with the plural owned noun hundar."],
      ["Det är inte min penna; min ligger på bordet.", "That is not my pen; mine is on the table.", "A possessive can stand alone when the noun is understood."]
    ]
  },
  {
    id: "reflexive",
    title: "Reflexive pronouns and reflexive possessives",
    subtitle: "When the object or owner points back to the subject",
    rule: "Use mig/dig/oss/er with jag/du/vi/ni and sig with third-person subjects. Sin/sitt/sina means a third-person subject's own: sin + en-word, sitt + ett-word, sina + plural. Use hans/hennes/deras for another owner.",
    forms: "jag–mig · du–dig · han/hon/hen/den/det/de–sig · vi–oss · ni–er · sin–sitt–sina",
    examples: [
      ["Jag tvättar mig varje morgon.", "I wash every morning.", "Mig points back to jag."],
      ["Du måste skynda dig.", "You must hurry.", "Dig points back to du; learn skynda sig as a unit."],
      ["Han rakar sig före jobbet.", "He shaves before work.", "Sig points back to han."],
      ["Hon känner sig mycket bättre.", "She feels much better.", "Känna sig describes how someone feels."],
      ["Katten gömmer sig under sängen.", "The cat hides under the bed.", "Sig can point back to an animal or thing."],
      ["Vi bestämde oss i går.", "We made up our minds yesterday.", "Oss points back to vi; bestämma sig is reflexive."],
      ["Ni kan sätta er här.", "You can sit down here.", "Er points back to plural ni."],
      ["De presenterade sig för gruppen.", "They introduced themselves to the group.", "Sig points back to de."],
      ["Jag lär mig svenska.", "I am learning Swedish.", "Lära sig means to learn; mig matches jag."],
      ["Barnen klädde på sig själva.", "The children dressed themselves.", "Själva adds emphasis to the reflexive sig."],
      ["Sara tar sin jacka.", "Sara takes her own jacket.", "Sin + en-word points back to Sara."],
      ["Sara tar hennes jacka.", "Sara takes her jacket.", "Hennes refers to another woman, not Sara."],
      ["Omar säljer sitt hus.", "Omar sells his own house.", "Sitt + ett-word points back to Omar."],
      ["Omar säljer hans hus.", "Omar sells his house.", "Hans refers to another man."],
      ["Lärarna träffar sina elever.", "The teachers meet their own students.", "Sina + plural points back to lärarna."],
      ["Lärarna träffar deras elever.", "The teachers meet their students.", "Deras identifies students belonging to other people."],
      ["Hon älskar sin familj.", "She loves her own family.", "Familj is an en-word, so use sin."],
      ["Hon älskar sitt arbete.", "She loves her own work.", "Arbete is an ett-word, so use sitt."],
      ["Hon älskar sina kollegor.", "She loves her own colleagues.", "Plural kollegor takes sina."],
      ["Jag tar min väska, inte sin väska.", "I take my bag, not 'sin' bag.", "With jag, use min; sin/sitt/sina requires a third-person subject."],
      ["Vi städar vårt rum.", "We clean our room.", "With vi, use vårt rather than sitt."],
      ["De glömde sina biljetter hemma.", "They forgot their own tickets at home.", "Sina shows that the tickets belong to de."],
      ["Anna sa att Lisa hade tagit sin väska.", "Anna said that Lisa had taken her own bag.", "In the subordinate clause, sin normally points to its subject Lisa."],
      ["Efter träningen duschade han och bytte om.", "After training he showered and changed clothes.", "Some inherently reflexive meanings use fixed verbs; byta om does not take sig."]
    ]
  }
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

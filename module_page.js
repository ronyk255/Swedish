const params = new URLSearchParams(location.search);
const moduleId = params.get("module") || "alphabet";
const moduleData = window.COURSE_MODULES.find((item) => item.id === moduleId) || window.COURSE_MODULES[0];
const alphabet = [
  ["A", "a", "ah"], ["B", "be", "beh"], ["C", "se", "seh"], ["D", "de", "deh"],
  ["E", "e", "eh"], ["F", "eff", "eff"], ["G", "ge", "yeh/geh"], ["H", "hå", "haw"],
  ["I", "i", "ee"], ["J", "ji", "yee"], ["K", "kå", "kaw"], ["L", "ell", "ell"],
  ["M", "emm", "emm"], ["N", "enn", "enn"], ["O", "o", "oo"], ["P", "pe", "peh"],
  ["Q", "ku", "koo"], ["R", "err", "err"], ["S", "ess", "ess"], ["T", "te", "teh"],
  ["U", "u", "rounded oo"], ["V", "ve", "veh"], ["W", "dubbel-ve", "double v"],
  ["X", "eks", "eks"], ["Y", "y", "rounded ee"], ["Z", "säta", "seh-ta"],
  ["Å", "å", "awe"], ["Ä", "ä", "air"], ["Ö", "ö", "rounded er"]
];

const alphabetAudioFallback = {
  "h\u00e5": "assets/audio/generated/sv_50a22cd31d46.mp3",
  "k\u00e5": "assets/audio/generated/sv_e3c5b89e3a39.mp3",
  "s\u00e4ta": "assets/audio/generated/sv_12176f96cd7a.mp3",
  "\u00e5": "assets/audio/generated/sv_cfb50dd6cf79.mp3",
  "\u00e4": "assets/audio/generated/sv_961fa22f61a5.mp3",
  "\u00f6": "assets/audio/generated/sv_cce6ff74d415.mp3"
};

const extraModuleExamples = {
  numbers: [
    "tretton", "fjorton", "femton", "sexton", "sjutton", "arton", "nitton",
    "tjugoen", "tjugotvå", "trettio", "trettiofem", "fyrtio", "fyrtioåtta",
    "femtio", "femtiotvå", "sextio", "sextiosex", "sjuttio", "sjuttiosju",
    "åttio", "åttiofyra", "nittio", "nittionio", "hundra",
    "etthundra", "tvåhundra", "tvåhundrafyrtiofem", "femhundrasextio",
    "niohundranittionio", "ett tusen",
    "Mitt telefonnummer är noll sju noll, ett två tre, fyrtiofem, sextiosju."
  ]
};

const lessonDetails = {
  alphabet: [
    ["The extra Swedish letters", "å, ä, ö", "Å, Ä, Ö are separate letters at the end of the Swedish alphabet.", "They are not decorated A/O letters. Learn them as their own sounds."],
    ["Long and short vowels", "tak / tack", "roof / thanks", "A double consonant usually makes the vowel before it shorter."],
    ["Practice in real words", "språk, träffas, förstår", "language, meet, understand", "Use real words so the letter sounds become useful immediately."]
  ],
  intro: [
    ["Give your name", "Jag heter Rony.", "My name is Rony.", "Jag = I. Heter = am called. Swedish uses 'I am called...' for names."],
    ["Ask a name", "Vad heter du?", "What is your name?", "Vad = what. Heter = are called. Du = you."],
    ["Say where you are from", "Jag kommer från Indien.", "I come from India.", "Kommer från = come from. Put the country after från."],
    ["Say languages", "Jag talar engelska och lite svenska.", "I speak English and a little Swedish.", "Talar = speak. Och = and. Lite = a little."]
  ],
  wordorder: [
    ["Basic statement", "Jag bor i Stockholm.", "I live in Stockholm.", "Pattern: subject + verb + rest. Jag = subject, bor = verb."],
    ["Yes/no question", "Bor du i Stockholm?", "Do you live in Stockholm?", "Pattern: verb + subject + rest. Move the verb first: bor du."],
    ["Statement to question", "Du talar svenska. → Talar du svenska?", "You speak Swedish. → Do you speak Swedish?", "For yes/no questions, switch du talar to talar du."],
    ["Question word", "Vad heter du?", "What is your name?", "Pattern: question word + verb + subject. Vad + heter + du."],
    ["Time first", "I dag studerar jag svenska.", "Today I study Swedish.", "When time comes first, the verb still stays second: I dag + studerar + jag."]
  ],
  verbs: [
    ["Subject pronouns", "jag, du, han, hon, den, det, vi, ni, de", "I, you, he, she, it, it, we, you plural, they", "Use subject pronouns for the person or thing doing the action."],
    ["Object pronouns", "mig, dig, honom, henne, den, det, oss, er, dem", "me, you, him, her, it, it, us, you plural, them", "Use object pronouns after the verb when someone receives the action."],
    ["Possessives", "min bok, mitt brev, mina böcker", "my book, my letter, my books", "Min changes to mitt with ett nouns and mina with plural nouns."],
    ["Reflexive", "Han sätter sig. Hon tar sin väska.", "He sits down. She takes her own bag.", "Sig and sin/sitt/sina point back to the subject."],
    ["Same verb form", "Jag talar. Du talar. Vi talar. De talar.", "I speak. You speak. We speak. They speak.", "The present-tense verb usually does not change by person."]
  ],
  numbers: [
    ["0 to 20 first", "noll, en, två ... tjugo", "zero, one, two ... twenty", "Memorize these first because later numbers are built from them."],
    ["Build 21 to 99", "trettiofem", "thirty-five", "Tens + ones join together: trettio + fem = trettiofem."],
    ["Hundreds", "tvåhundrafyrtiofem", "two hundred forty-five", "Hundreds also join: tvåhundra + fyrtio + fem."],
    ["Phone numbers", "Mitt telefonnummer är noll sju noll, ett två tre, fyrtiofem, sextiosju.", "My phone number is 070 123 45 67.", "Say phone numbers in small groups so they are easier to hear."],
    ["Colours are adjectives", "en röd bil, ett rött hus, röda bilar", "a red car, a red house, red cars", "Colour words usually change with en nouns, ett nouns, and plural nouns."],
    ["Colours that stay the same", "en rosa ros, ett rosa hus, rosa rosor", "a pink rose, a pink house, pink roses", "Some colours, especially rosa, lila, orange, and beige, often keep the same form."]
  ],
  food: [
    ["Polite ordering", "Jag skulle vilja ha kaffe.", "I would like coffee.", "Jag skulle vilja ha = I would like to have. Put the item after ha."],
    ["Ask the price", "Vad kostar det?", "How much does it cost?", "Vad = what. Kostar = costs. Det = it/that."],
    ["Thanks and reply", "Tack. Varsågod.", "Thanks. Here you go / you're welcome.", "Varsågod changes meaning by situation, but it is polite service language."],
    ["Use articles", "en kaffe, ett vatten", "a coffee, a water", "Learn nouns with en or ett from the beginning."]
  ],
  workbook: [
    ["Article practice", "en bok, ett språk", "a book, a language", "Swedish nouns use en or ett. Learn the article with the noun."],
    ["Definite form", "boken, språket", "the book, the language", "The definite ending attaches to the noun: bok → boken, språk → språket."],
    ["Daily practice", "Jag övar svenska varje dag.", "I practice Swedish every day.", "Övar = practice. Varje dag = every day."],
    ["Read aloud", "Jag läser högt.", "I read aloud.", "Use workbook answers as speaking practice, not just writing practice."]
  ],
  verbTenses: [
    ["Infinitive", "att prata, att läsa, att gå", "to talk, to read, to go", "Use att before the dictionary form when you mean to do something. After ska and kommer att, keep the verb in the infinitive."],
    ["Present tense", "Jag pratar. Jag läser. Jag bor.", "I talk. I read. I live.", "Swedish does not change the present form for jag, du, han, hon, vi, ni, or de. Most forms end in -r, usually -ar or -er."],
    ["Past tense trick", "pratar → pratade, läser → läste, bor → bodde", "talks → talked, reads → read, lives → lived", "Regular weak verbs usually add -ade, -de, -te, or -dde. If the stem ends in p, t, k, s, x, the past often takes -te."],
    ["Perfect tense", "Jag har pratat. Jag har läst. Jag har bott.", "I have talked. I have read. I have lived.", "Perfect uses har + the supine form. Regular verbs often end the supine in -t, -tt, or -at."],
    ["Irregular watch list", "äter → åt → har ätit", "eats → ate → has eaten", "Strong and special verbs often change vowel or have short forms. Learn them as small sets after the regular patterns."]
  ],
  adjectives: [
    ["Basic agreement", "en stor bok, ett stort brev, stora böcker", "a big book, a big letter, big books", "Most adjectives use base form with en, add -t with ett, and add -a with plural nouns."],
    ["Definite phrases", "den stora boken, det stora brevet, de stora böckerna", "the big book, the big letter, the big books", "After den, det, and de, the adjective normally uses the -a form."],
    ["Liten is special", "en liten bok, ett litet brev, små böcker, den lilla boken", "a small book, a small letter, small books, the small book", "Liten changes more than regular adjectives, so learn it as its own mini-table."],
    ["No extra t", "en trött lärare, ett trött barn, trötta lärare", "a tired teacher, a tired child, tired teachers", "Many adjectives that already end in -t do not add another t in ett form."],
    ["Vowel-ending adjectives", "en ny cykel, ett nytt jobb, nya cyklar", "a new bike, a new job, new bikes", "Short adjectives ending in a vowel often double t in the ett form and use -a in plural."]
  ]
};

const translationLookup = {
  "Du talar svenska.": "You speak Swedish.",
  "Talar du svenska?": "Do you speak Swedish?",
  "Vad talar du för språk?": "What languages do you speak?",
  "I dag studerar jag svenska.": "Today I study Swedish.",
  "Jag bor i Stockholm.": "I live in Stockholm.",
  "Bor du i Stockholm?": "Do you live in Stockholm?",
  "Vad heter du?": "What is your name?",
  "Jag heter Rony.": "My name is Rony.",
  "Varifrån kommer du?": "Where are you from?",
  "Jag kommer från Indien.": "I come from India.",
  "Jag talar engelska och lite svenska.": "I speak English and a little Swedish.",
  "Trevligt att träffas.": "Nice to meet you.",
  "Vi ses!": "See you.",
  "jag, du, han, hon, vi, ni, de": "I, you, he, she, we, you plural, they",
  "heter, kommer, talar, förstår, bor, studerar": "am called, come, speak, understand, live, study",
  "Jag studerar svenska.": "I study Swedish.",
  "Jag förstår inte.": "I do not understand.",
  "Jag förstår lite.": "I understand a little.",
  "Vi talar engelska.": "We speak English.",
  "Hon kommer från Sverige.": "She comes from Sweden.",
  "noll, en, två, tre, fyra, fem, sex, sju, åtta, nio, tio": "zero, one, two, three, four, five, six, seven, eight, nine, ten",
  "elva, tolv, tretton, fjorton, femton, sexton, sjutton, arton, nitton, tjugo": "eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty",
  "tjugo, trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio, hundra": "twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, one hundred",
  "tjugoen, trettiofem, fyrtioåtta, femtiotvå, sextiosex, sjuttiosju, åttiofyra, nittionio": "twenty-one, thirty-five, forty-eight, fifty-two, sixty-six, seventy-seven, eighty-four, ninety-nine",
  "etthundra, tvåhundra, tvåhundrafyrtiofem, femhundrasextio, niohundranittionio, ett tusen": "one hundred, two hundred, two hundred forty-five, five hundred sixty, nine hundred ninety-nine, one thousand",
  "Mitt telefonnummer är noll sju noll, ett två tre, fyrtiofem, sextiosju.": "My phone number is 070 123 45 67.",
  "Vad är klockan?": "What time is it?",
  "Klockan är ett.": "It is one o'clock.",
  "Klockan är två.": "It is two o'clock.",
  "Jag skulle vilja ha kaffe.": "I would like coffee.",
  "Jag skulle vilja ha vatten.": "I would like water.",
  "Vad kostar det?": "How much does it cost?",
  "Tack.": "Thank you.",
  "Varsågod.": "Here you go / you're welcome.",
  "en bok": "a book",
  "ett språk": "a language",
  "boken": "the book",
  "språket": "the language",
  "Jag övar svenska varje dag.": "I practice Swedish every day.",
  "Jag skriver svaret.": "I write the answer.",
  "Jag läser högt.": "I read aloud."
};

let swedishVoice = null;
let recognition = null;
let activeSpeechButton = null;
const speechUnsupportedMessage = "Speech checking is not available in this browser. Try Chrome or Edge and allow microphone access.";

function pickSwedishVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  swedishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("sv")) || null;
}

function speakSwedish(text) {
  if (!swedishVoice || !("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  utterance.rate = 0.82;
  if (swedishVoice) utterance.voice = swedishVoice;
  speechSynthesis.speak(utterance);
  return true;
}

function audioFor(text) {
  const clean = text.trim().normalize("NFC");
  const generated = window.GENERATED_SWEDISH_AUDIO || {};
  return generated[clean] || alphabetAudioFallback[clean] || generated[clean.toLowerCase()] || alphabetAudioFallback[clean.toLowerCase()];
}

function play(text) {
  const src = audioFor(text);
  if (!src) return speakSwedish(text);
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  const audio = document.getElementById("pageAudio");
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
  return true;
}

function playNativeAlphabet() {
  const audio = document.getElementById("nativeAlphabetAudio");
  if (!audio) return;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  audio.currentTime = 0;
  audio.play();
}

function audioButton(label, text) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.title = audioFor(text) || swedishVoice
    ? "Play Swedish pronunciation"
    : "No Swedish voice is installed for this text yet";
  button.addEventListener("click", () => play(text));
  return button;
}

function englishFor(text) {
  const clean = text.trim().normalize("NFC");
  return (window.COURSE_TRANSLATIONS || {})[clean] || translationLookup[clean] || "";
}

function normalizeSpeech(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function speechMatches(spoken, expected) {
  const heard = normalizeSpeech(spoken);
  const target = normalizeSpeech(expected);
  return heard === target || heard.includes(target) || target.includes(heard);
}

function setSpeechStatus(message) {
  const status = document.getElementById("speechQuizStatus");
  if (status) status.textContent = message;
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    setSpeechStatus(speechUnsupportedMessage);
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "sv-SE";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("result", (event) => {
    const spoken = event.results[0][0].transcript;
    const card = activeSpeechButton?.closest(".speechQuizCard");
    if (!card) return;
    const expected = card.dataset.expected;
    const ok = speechMatches(spoken, expected);
    card.classList.toggle("correct", ok);
    card.classList.toggle("needsPractice", !ok);
    card.querySelector(".speechHeard").textContent = `Heard: ${spoken}`;
    card.querySelector(".speechFeedback").textContent = ok
      ? "Correct. Bra!"
      : `Try again. Target: ${expected}`;
    setSpeechStatus(ok ? "Correct. Bra!" : "Close listening moment: play it once more, then try again.");
  });

  recognition.addEventListener("error", (event) => {
    const message = event.error === "not-allowed"
      ? "Microphone access was blocked. Allow microphone access, then try again."
      : `Speech recognition error: ${event.error}`;
    if (activeSpeechButton) {
      const card = activeSpeechButton.closest(".speechQuizCard");
      card.querySelector(".speechFeedback").textContent = message;
    }
    setSpeechStatus(message);
  });

  recognition.addEventListener("end", () => {
    if (activeSpeechButton) {
      activeSpeechButton.disabled = false;
      activeSpeechButton.textContent = "Say it";
      activeSpeechButton = null;
    }
  });
}

function startSpeechCheck(button) {
  if (!recognition) {
    const card = button.closest(".speechQuizCard");
    card.querySelector(".speechFeedback").textContent = speechUnsupportedMessage;
    setSpeechStatus(speechUnsupportedMessage);
    return;
  }
  if (activeSpeechButton) recognition.stop();
  activeSpeechButton = button;
  button.disabled = true;
  button.textContent = "Listening...";
  setSpeechStatus("Listening...");
  try {
    recognition.start();
  } catch {
    setSpeechStatus("Speech recognition is already listening.");
  }
}

function renderSpeechQuiz() {
  const section = document.getElementById("speechQuizSection");
  const list = document.getElementById("speechQuizList");
  const prompts = moduleData.speechQuiz || [];
  if (!section || !list || !prompts.length) return;

  section.classList.remove("hiddenPanel");
  list.innerHTML = "";
  prompts.forEach((text, index) => {
    const card = document.createElement("article");
    card.className = "speechQuizCard";
    card.dataset.expected = text;
    const english = englishFor(text);
    card.innerHTML = `
      <span class="stepNumber">${index + 1}</span>
      <strong>${text}</strong>
      ${english ? `<p><b>English:</b> ${english}</p>` : ""}
      <p class="speechHeard">Heard: -</p>
      <p class="speechFeedback">Play the sentence, then say it.</p>
    `;
    const controls = document.createElement("div");
    controls.className = "speechQuizControls";
    controls.appendChild(audioButton("Listen", text));
    const speak = document.createElement("button");
    speak.type = "button";
    speak.textContent = recognition ? "Say it" : "No microphone check";
    speak.disabled = !recognition;
    speak.title = recognition ? "Say this Swedish sentence" : speechUnsupportedMessage;
    speak.addEventListener("click", () => startSpeechCheck(speak));
    controls.appendChild(speak);
    card.appendChild(controls);
    list.appendChild(card);
  });
}

function renderAlphabetDrill() {
  const section = document.getElementById("alphabetDrillSection");
  if (moduleData.id !== "alphabet") return;
  section.classList.remove("hiddenPanel");
  document.getElementById("playNativeAlphabet").addEventListener("click", playNativeAlphabet);
  const grid = document.getElementById("alphabetGrid");
  grid.innerHTML = "";
  alphabet.forEach(([letter, spoken, cue]) => {
    const card = document.createElement("div");
    card.className = "letterCard";
    card.innerHTML = `<strong>${letter}</strong><span>${spoken} · ${cue}</span>`;
    const button = audioButton("Play letter", spoken);
    if (button) card.appendChild(button);
    grid.appendChild(card);
  });
}

function renderVerbTenseTables() {
  if (moduleData.id !== "verbTenses") return false;
  const practice = document.getElementById("practice");
  const verbs = window.VERB_TENSE_PRACTICE || [];
  practice.innerHTML = "";
  practice.classList.remove("moduleContent");

  const specialInfinitives = new Set([
    "att äta", "att dricka", "att skriva", "att komma", "att gå", "att göra",
    "att ha", "att vara", "att få", "att se", "att säga", "att ta", "att ge",
    "att sälja", "att vilja", "att kunna", "att veta", "att förstå", "att sova",
    "att springa", "att lära", "att använda", "att byta", "att hinna", "att slå",
    "att binda", "att bryta", "att flyga", "att frysa", "att sjunga", "att stjäla",
    "att dra", "att bära", "att bli", "att ligga", "att sitta", "att stå",
    "att lägga", "att sätta", "att välja"
  ]);

  const groups = [
    {
      title: "Regular pattern verbs first",
      note: "Standard weak patterns: present usually ends in -ar, -er, or -r; past usually adds -ade, -de, -te, or -dde; perfect uses har + supine.",
      verbs: verbs.filter((verb) => !specialInfinitives.has(verb.infinitive))
    },
    {
      title: "Irregular and special verbs",
      note: "These are common verbs with vowel changes, short present forms, modal forms, or other special patterns. Learn them as sets.",
      verbs: verbs.filter((verb) => specialInfinitives.has(verb.infinitive))
    }
  ];

  const root = document.createElement("div");
  root.className = "verbTenseSheet";
  root.setAttribute("role", "table");
  root.setAttribute("aria-label", "Infinitive verbs in Swedish tenses");

  const columns = [
    ["Verb", "infinitive"],
    ["Past", "past"],
    ["Perfect", "perfect"],
    ["Present", "present"],
    ["Future", "future"]
  ];

  const header = document.createElement("div");
  header.className = "verbTenseHeader";
  header.setAttribute("role", "row");
  columns.forEach(([label]) => {
    const cell = document.createElement("strong");
    cell.setAttribute("role", "columnheader");
    cell.textContent = label;
    header.appendChild(cell);
  });
  root.appendChild(header);

  groups.forEach((group) => {
    if (!group.verbs.length) return;
    const groupHeader = document.createElement("div");
    groupHeader.className = "verbTenseGroupHeader";
    groupHeader.setAttribute("role", "row");
    groupHeader.innerHTML = `<strong>${group.title}</strong><span>${group.note}</span>`;
    root.appendChild(groupHeader);

    group.verbs.forEach((verb) => {
      const row = document.createElement("div");
      row.className = "verbTenseRow";
      row.setAttribute("role", "row");

      columns.forEach(([, key]) => {
        const cell = document.createElement("div");
        cell.className = "verbTenseCell";
        cell.setAttribute("role", "cell");
        const swedish = key === "infinitive" ? verb.infinitive : verb[key][0];
        const english = key === "infinitive" ? verb.meaning : verb[key][1];
        const text = document.createElement("span");
        text.className = "verbTenseText";
        text.textContent = swedish;
        const translation = document.createElement("small");
        translation.textContent = english;
        const button = audioButton("Listen", swedish);
        button.className = "verbListenButton";
        cell.append(text, translation, button);
        row.appendChild(cell);
      });

      root.appendChild(row);
    });
  });

  practice.appendChild(root);
  return true;
}

function renderAdjectiveTables() {
  if (moduleData.id !== "adjectives") return false;
  const practice = document.getElementById("practice");
  const adjectives = window.SWEDISH_ADJECTIVES || [];
  practice.innerHTML = "";
  practice.classList.remove("moduleContent");

  const ruleGrid = document.createElement("div");
  ruleGrid.className = "adjectiveRuleGrid";
  (window.ADJECTIVE_RULES || []).forEach(([title, body]) => {
    const card = document.createElement("article");
    card.className = "adjectiveRuleCard";
    card.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
    ruleGrid.appendChild(card);
  });
  practice.appendChild(ruleGrid);

  const sheet = document.createElement("div");
  sheet.className = "adjectiveSheet";
  sheet.setAttribute("role", "table");
  sheet.setAttribute("aria-label", "Swedish adjective agreement forms");

  const columns = ["Meaning", "en noun", "ett noun", "Plural", "Definite", "Listen"];
  const header = document.createElement("div");
  header.className = "adjectiveHeader";
  header.setAttribute("role", "row");
  columns.forEach((label) => {
    const cell = document.createElement("strong");
    cell.setAttribute("role", "columnheader");
    cell.textContent = label;
    header.appendChild(cell);
  });
  sheet.appendChild(header);

  adjectives.forEach((item) => {
    const row = document.createElement("div");
    row.className = "adjectiveRow";
    row.setAttribute("role", "row");
    const enPhrase = adjectivePhrase(item.en, item.nounEn);
    const ettPhrase = adjectivePhrase(item.ett, item.nounEtt);
    const pluralPhrase = `${item.plural} (plural form)`;
    const definitePhrase = `den/det/de ${item.definite || item.plural}`;
    [
      [`${item.base} - ${item.meaning}`, "adjective meaning"],
      [enPhrase, phraseTranslation(item.en, item.nounEn, item)],
      [ettPhrase, phraseTranslation(item.ett, item.nounEtt, item)],
      [pluralPhrase, `plural adjective form: ${adjectiveEnglish(item)}`],
      [definitePhrase, `definite adjective form: ${adjectiveEnglish(item)}`]
    ].forEach(([text, english]) => {
      const cell = document.createElement("span");
      cell.innerHTML = `<strong>${text}</strong><small>${english}</small>`;
      row.appendChild(cell);
    });
    const listen = audioButton("Listen", `${enPhrase}. ${ettPhrase}. ${item.plural}.`);
    listen.className = "verbListenButton";
    row.appendChild(listen);
    sheet.appendChild(row);
  });

  practice.appendChild(sheet);
  return true;
}

function adjectivePhrase(adjective, nounPhrase) {
  const [article, ...nounParts] = nounPhrase.split(" ");
  return `${article} ${adjective} ${nounParts.join(" ")}`.trim();
}

function adjectiveEnglish(item) {
  if (item.base === "stor") return "large";
  return item.meaning.split("/")[0].trim();
}

function phraseTranslation(adjective, nounPhrase, item) {
  const noun = nounPhrase.replace(/^(en|ett)\s+/, "");
  const nounEnglish = (window.ADJECTIVE_NOUN_TRANSLATIONS || {})[noun] || noun;
  const adjectiveText = adjectiveEnglish(item);
  const article = /^[aeiou]/i.test(adjectiveText) ? "an" : "a";
  return `${article} ${adjectiveText} ${nounEnglish}`;
}

function renderPronounTables() {
  if (moduleData.id !== "verbs") return false;
  const practice = document.getElementById("practice");
  const groups = window.SWEDISH_PRONOUN_GROUPS || [];
  const patterns = window.SWEDISH_PRONOUN_SENTENCE_PATTERNS || [];
  if (!groups.length) return false;

  practice.innerHTML = "";
  practice.classList.remove("moduleContent");

  groups.forEach((group) => {
    const block = document.createElement("section");
    block.className = "pronounBlock";
    const intro = document.createElement("div");
    intro.className = "verbTenseBlockGroup";
    intro.innerHTML = `<h3>${group.title}</h3><p>${group.note}</p>`;
    block.appendChild(intro);

    const sheet = document.createElement("div");
    sheet.className = `pronounSheet cols-${group.columns.length}`;
    sheet.setAttribute("role", "table");
    sheet.setAttribute("aria-label", group.title);

    const header = document.createElement("div");
    header.className = "pronounHeader";
    header.setAttribute("role", "row");
    [...group.columns, "Listen"].forEach((label) => {
      const cell = document.createElement("strong");
      cell.setAttribute("role", "columnheader");
      cell.textContent = label;
      header.appendChild(cell);
    });
    sheet.appendChild(header);

    group.rows.forEach((rowData) => {
      const row = document.createElement("div");
      row.className = "pronounRow";
      row.setAttribute("role", "row");
      rowData.forEach((text, index) => {
        const cell = document.createElement("span");
        cell.setAttribute("role", "cell");
        const isSwedish = index > 0 && index < rowData.length - 1;
        cell.innerHTML = isSwedish ? `<strong>${text}</strong>` : text;
        row.appendChild(cell);
      });
      const swedish = pronounAudioText(rowData);
      const listen = audioButton("Listen", swedish);
      listen.className = "verbListenButton";
      row.appendChild(listen);
      sheet.appendChild(row);
    });

    block.appendChild(sheet);
    practice.appendChild(block);
  });

  if (patterns.length) {
    const patternBlock = document.createElement("section");
    patternBlock.className = "pronounBlock";
    const intro = document.createElement("div");
    intro.className = "verbTenseBlockGroup";
    intro.innerHTML = "<h3>Sentence builder examples</h3><p>Use these as templates: swap the pronoun, keep the verb pattern, then change the object or possessive.</p>";
    patternBlock.appendChild(intro);

    const grid = document.createElement("div");
    grid.className = "pronounExampleGrid";
    patterns.forEach(([title, swedish, english, note]) => {
      const card = document.createElement("article");
      card.className = "pronounExampleCard";
      card.innerHTML = `
        <strong>${title}</strong>
        <p class="swedishLine">${swedish}</p>
        <small>${english}</small>
        <p>${note}</p>
      `;
      const listen = audioButton("Listen", swedish);
      listen.className = "verbListenButton";
      card.appendChild(listen);
      grid.appendChild(card);
    });
    patternBlock.appendChild(grid);
    practice.appendChild(patternBlock);
  }

  return true;
}

function pronounAudioText(rowData) {
  const example = rowData.find((value) => /[.!?]$/.test(value));
  if (example) return example;
  return rowData.find((value, index) => index > 0 && /[åäöÅÄÖ]|\b(jag|du|han|hon|den|det|vi|ni|de|mig|dig|honom|henne|oss|er|dem|min|mitt|mina|din|ditt|dina|hans|hennes|vår|vårt|våra|deras|sig|sin|sitt|sina)\b/i.test(value)) || rowData[1] || rowData[0];
}

function renderColourTables() {
  if (moduleData.id !== "numbers") return false;
  const colours = window.SWEDISH_COLOURS || [];
  if (!colours.length) return false;

  const practice = document.getElementById("practice");
  practice.innerHTML = "";
  practice.classList.remove("moduleContent");

  const ruleGrid = document.createElement("div");
  ruleGrid.className = "colourRuleGrid";
  (window.COLOUR_RULES || []).forEach(([title, body]) => {
    const card = document.createElement("article");
    card.className = "adjectiveRuleCard";
    card.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
    ruleGrid.appendChild(card);
  });
  practice.appendChild(ruleGrid);

  const sheet = document.createElement("div");
  sheet.className = "colourSheet";
  sheet.setAttribute("role", "table");
  sheet.setAttribute("aria-label", "Swedish colours in en, ett, and plural forms");

  const columns = ["Colour", "en noun", "ett noun", "Plural", "Sentence", "Listen"];
  const header = document.createElement("div");
  header.className = "colourHeader";
  header.setAttribute("role", "row");
  columns.forEach((label) => {
    const cell = document.createElement("strong");
    cell.setAttribute("role", "columnheader");
    cell.textContent = label;
    header.appendChild(cell);
  });
  sheet.appendChild(header);

  colours.forEach((item) => {
    const row = document.createElement("div");
    row.className = "colourRow";
    row.setAttribute("role", "row");
    const enPhrase = colourPhrase(item.en, item.nounEn);
    const ettPhrase = colourPhrase(item.ett, item.nounEtt);
    const pluralPhrase = `${item.plural} ${item.pluralNoun}`;
    [
      [colourLabel(item), `${item.meaning} in Swedish`],
      [enPhrase, colourPhraseTranslation(item.en, item.nounEn, item)],
      [ettPhrase, colourPhraseTranslation(item.ett, item.nounEtt, item)],
      [pluralPhrase, `${item.meaning} ${colourNounEnglish(item.pluralNoun)}`],
      [item.sentence, item.translation]
    ].forEach(([text, english], index) => {
      const cell = document.createElement("span");
      if (index === 0) cell.className = "colourNameCell";
      cell.innerHTML = `${index === 0 ? `<i class="colourSwatch" style="background:${item.hex}"></i>` : ""}<strong>${text}</strong><small>${english}</small>`;
      row.appendChild(cell);
    });
    const listen = audioButton("Listen", `${enPhrase}. ${ettPhrase}. ${pluralPhrase}. ${item.sentence}`);
    listen.className = "verbListenButton";
    row.appendChild(listen);
    sheet.appendChild(row);
  });

  practice.appendChild(sheet);
  return true;
}

function colourLabel(item) {
  return `${item.base} - ${item.meaning}`;
}

function colourPhrase(colour, nounPhrase) {
  const [article, ...nounParts] = nounPhrase.split(" ");
  return `${article} ${colour} ${nounParts.join(" ")}`.trim();
}

function colourNounEnglish(noun) {
  return (window.COLOUR_NOUN_TRANSLATIONS || {})[noun] || noun;
}

function colourPhraseTranslation(colour, nounPhrase, item) {
  const noun = nounPhrase.replace(/^(en|ett)\s+/, "");
  const nounEnglish = colourNounEnglish(noun);
  const article = /^[aeiou]/i.test(item.meaning) ? "an" : "a";
  return `${article} ${item.meaning} ${nounEnglish}`;
}

function renderDeepLessonTables() {
  const sections = (window.DEEP_LESSON_SECTIONS || {})[moduleData.id] || [];
  if (!sections.length) return false;

  const practice = document.getElementById("practice");
  practice.innerHTML = "";
  practice.classList.remove("moduleContent");

  sections.forEach((section) => {
    const block = document.createElement("section");
    block.className = "deepLessonBlock";

    const intro = document.createElement("div");
    intro.className = "verbTenseBlockGroup";
    intro.innerHTML = `<h3>${section.title}</h3><p>${section.note}</p>`;
    block.appendChild(intro);

    const sheet = document.createElement("div");
    sheet.className = `deepLessonSheet cols-${section.columns.length}`;
    sheet.setAttribute("role", "table");
    sheet.setAttribute("aria-label", section.title);

    const header = document.createElement("div");
    header.className = "deepLessonHeader";
    header.setAttribute("role", "row");
    [...section.columns, "Listen"].forEach((label) => {
      const cell = document.createElement("strong");
      cell.setAttribute("role", "columnheader");
      cell.textContent = label;
      header.appendChild(cell);
    });
    sheet.appendChild(header);

    section.rows.forEach((rowData) => {
      const row = document.createElement("div");
      row.className = "deepLessonRow";
      row.setAttribute("role", "row");
      rowData.slice(0, section.columns.length).forEach((text, index) => {
        const cell = document.createElement("span");
        cell.setAttribute("role", "cell");
        cell.innerHTML = index === 0 ? `<strong>${text}</strong>` : deepLessonCellHtml(text);
        row.appendChild(cell);
      });
      const swedish = deepLessonAudioText(rowData);
      const listen = audioButton("Listen", swedish);
      listen.className = "verbListenButton";
      row.appendChild(listen);
      sheet.appendChild(row);
    });

    block.appendChild(sheet);
    practice.appendChild(block);
  });

  return true;
}

function deepLessonCellHtml(text) {
  if (!text) return "";
  const englishish = /^[A-Za-z0-9 ,.'/?!:;()/-]+$/.test(text) && !/\b(Jag|Du|Han|Hon|Vi|Ni|De|Vad|Var|Hur|När|Kan|Det|Hej|Tack|Ursäkta|Klockan)\b/.test(text);
  return englishish ? `<small>${text}</small>` : `<strong>${text}</strong>`;
}

function deepLessonAudioText(rowData) {
  const swedishPattern = /[åäöÅÄÖ]|\b(Jag|Du|Han|Hon|Vi|Ni|De|Det|Vad|Var|Varifrån|Vem|Vilka|Hur|När|Varför|Kan|Hej|Tack|Ursäkta|Klockan|Lyssna|Repetera|Sverige|Indien|Stockholm|kaffe|kök|sjö|tjugo|bord|tak|tack|glas|glass|mat|matt|en|ett)\b/;
  const sentence = rowData.find((value, index) => index > 0 && /[.!?]$/.test(value) && swedishPattern.test(value));
  if (sentence) return sentence;
  return rowData.find((value, index) => index > 0 && swedishPattern.test(value)) || rowData[1] || rowData[0];
}

function render() {
  document.title = `${moduleData.title} - Swedish Learning Guide`;
  document.getElementById("modulePageTitle").textContent = moduleData.title;
  document.getElementById("moduleHero").textContent = moduleData.title;
  document.getElementById("moduleGoal").textContent = moduleData.goal;
  document.getElementById("sourceNote").textContent = moduleData.sourceNote || "";
  document.getElementById("startQuizLink").href = `quiz.html?module=${encodeURIComponent(moduleData.id)}`;
  document.getElementById("bottomQuizLink").href = `quiz.html?module=${encodeURIComponent(moduleData.id)}`;
  document.querySelectorAll("#verbTenseTestLink, #bottomVerbTenseTestLink").forEach((link) => {
    link.classList.toggle("hiddenPanel", moduleData.id !== "verbTenses");
  });
  document.querySelectorAll("#adjectiveTestLink, #bottomAdjectiveTestLink").forEach((link) => {
    link.classList.toggle("hiddenPanel", moduleData.id !== "adjectives");
  });

  const notes = document.getElementById("notes");
  notes.innerHTML = "";
  // The pronoun module owns a much richer set of annotated sentence patterns.
  // Use those in Theory & Rules instead of the older, short generic overview.
  const pronounTheory = moduleData.id === "verbs"
    && Array.isArray(window.SWEDISH_PRONOUN_SENTENCE_PATTERNS)
    && window.SWEDISH_PRONOUN_SENTENCE_PATTERNS.length
      ? window.SWEDISH_PRONOUN_SENTENCE_PATTERNS
      : null;
  const details = pronounTheory || [
    ...(lessonDetails[moduleData.id] || []),
    ...((window.EXTRA_LESSON_DETAILS || {})[moduleData.id] || [])
  ];
  if (details.length) {
    details.forEach(([title, swedish, english, breakdown], index) => {
      const card = document.createElement("article");
      card.className = "lessonStep";
      card.innerHTML = `
        <span class="stepNumber">${index + 1}</span>
        <strong>${title}</strong>
        <p class="swedishLine">${swedish}</p>
        <p><b>English:</b> ${english}</p>
        <p><b>How it works:</b> ${breakdown}</p>
      `;
      const button = audioButton("Play Swedish audio", swedish);
      if (button) card.appendChild(button);
      notes.appendChild(card);
    });
  } else {
    moduleData.notes.forEach((note, index) => {
    const card = document.createElement("article");
    card.className = "moduleCard";
    card.innerHTML = `<strong>${index + 1}. Note</strong><p>${note}</p>`;
    notes.appendChild(card);
    });
  }

  const vocab = document.getElementById("vocabularyList");
  vocab.innerHTML = "";
  (moduleData.vocabulary || []).forEach(([swedish, english, note]) => {
    const row = document.createElement("div");
    row.className = "vocabItem";
    row.innerHTML = `<strong>${swedish}</strong><span>${english}</span>${note ? `<small>${note}</small>` : ""}`;
    const button = audioButton("Play Swedish audio", swedish);
    row.appendChild(button);
    vocab.appendChild(row);
  });

  const practice = document.getElementById("practice");
  if (!renderVerbTenseTables() && !renderAdjectiveTables() && !renderPronounTables() && !renderColourTables() && !renderDeepLessonTables()) {
    practice.innerHTML = "";
    (moduleData.practice || []).forEach(([title, body]) => {
      const card = document.createElement("article");
      card.className = "moduleCard";
      const english = englishFor(body);
      card.innerHTML = `<strong>${title}</strong><p class="swedishLine">${body}</p>${english ? `<p><b>English:</b> ${english}</p>` : ""}`;
      const button = audioButton("Play Swedish audio", body);
      if (button) card.appendChild(button);
      practice.appendChild(card);
    });
  }

  renderAlphabetDrill();

  const examples = document.getElementById("examples");
  examples.innerHTML = "";
  const examplesToShow = [...(moduleData.examples || []), ...(extraModuleExamples[moduleData.id] || [])];
  examplesToShow.forEach((example) => {
    const card = document.createElement("div");
    card.className = "phrase";
    const english = englishFor(example);
    card.innerHTML = `<strong>${example}</strong>${english ? `<small>${english}</small>` : "<small>Repeat aloud three times.</small>"}`;
    const button = audioButton("Play Swedish audio", example);
    if (button) card.appendChild(button);
    examples.appendChild(card);
  });
  renderSpeechQuiz();
  document.getElementById("playExamples").addEventListener("click", () => {
    const first = moduleData.examples[0];
    if (first) play(first);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pickSwedishVoice();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = pickSwedishVoice;
  setupSpeechRecognition();
  render();
});


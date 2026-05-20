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
    ["Pronouns", "jag, du, han, hon, vi, ni, de", "I, you, he, she, we, you plural, they", "Pronouns tell who is doing the action."],
    ["Present tense verbs", "Jag studerar svenska.", "I study Swedish.", "Many present-tense verbs end in -r: studerar, talar, förstår."],
    ["Same verb form", "Jag talar. Du talar. Vi talar.", "I speak. You speak. We speak.", "The verb form usually does not change by person in the present tense."],
    ["Negative sentence", "Jag förstår inte.", "I do not understand.", "Inte = not. In a simple sentence it comes after the verb."]
  ],
  numbers: [
    ["0 to 20 first", "noll, en, två ... tjugo", "zero, one, two ... twenty", "Memorize these first because later numbers are built from them."],
    ["Build 21 to 99", "trettiofem", "thirty-five", "Tens + ones join together: trettio + fem = trettiofem."],
    ["Hundreds", "tvåhundrafyrtiofem", "two hundred forty-five", "Hundreds also join: tvåhundra + fyrtio + fem."],
    ["Phone numbers", "Mitt telefonnummer är noll sju noll, ett två tre, fyrtiofem, sextiosju.", "My phone number is 070 123 45 67.", "Say phone numbers in small groups so they are easier to hear."]
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
  const root = document.createElement("div");
  root.className = "verbTenseBlocks";
  const tenses = [
    ["Present", "present"],
    ["Past", "past"],
    ["Perfect", "perfect"],
    ["Future", "future"]
  ];
  verbs.forEach((verb) => {
    const block = document.createElement("article");
    block.className = "verbTenseBlock";
    block.innerHTML = `
      <h3>${verb.infinitive} — ${verb.meaning}</h3>
      <div class="verbMiniTable" role="table" aria-label="${verb.infinitive} tense practice">
        <div class="verbMiniHead" role="row">
          <strong role="columnheader">Tense</strong>
          <strong role="columnheader">Swedish Sentence</strong>
          <strong role="columnheader">English Translation</strong>
          <strong role="columnheader">Audio</strong>
        </div>
      </div>
    `;
    const table = block.querySelector(".verbMiniTable");
    tenses.forEach(([label, key]) => {
      const [swedish, english] = verb[key];
      const row = document.createElement("div");
      row.className = "verbMiniRow";
      row.setAttribute("role", "row");
      row.innerHTML = `
        <span role="cell">${label}</span>
        <strong role="cell">${swedish}</strong>
        <span role="cell">${english}</span>
      `;
      row.appendChild(audioButton("Play Swedish audio", swedish));
      table.appendChild(row);
    });
    root.appendChild(block);
  });
  practice.appendChild(root);
  return true;
}

function render() {
  document.title = `${moduleData.title} - Swedish Learning Journey`;
  document.getElementById("modulePageTitle").textContent = moduleData.title;
  document.getElementById("moduleHero").textContent = moduleData.title;
  document.getElementById("moduleGoal").textContent = moduleData.goal;
  document.getElementById("sourceNote").textContent = moduleData.sourceNote || "";
  document.getElementById("startQuizLink").href = `quiz.html?module=${encodeURIComponent(moduleData.id)}`;
  document.getElementById("bottomQuizLink").href = `quiz.html?module=${encodeURIComponent(moduleData.id)}`;

  const notes = document.getElementById("notes");
  notes.innerHTML = "";
  const details = [
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
  if (!renderVerbTenseTables()) {
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
  document.getElementById("playExamples").addEventListener("click", () => {
    const first = moduleData.examples[0];
    if (first) play(first);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pickSwedishVoice();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = pickSwedishVoice;
  render();
});

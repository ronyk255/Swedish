const verbs = window.VERB_TENSE_PRACTICE || [];
const tenses = [
  ["Past", "past"],
  ["Perfect", "perfect"],
  ["Present", "present"],
  ["Future", "future"]
];

let swedishVoice = null;
let recognition = null;
let activeSpeechButton = null;
let speechUnsupportedMessage = "Speech checking is not available in this browser. Try Chrome or Edge and allow microphone access.";
let translationVerbOrder = verbs.map((_, index) => index);

const phraseTranslations = [
  ["med min chef", "to my boss"],
  ["med min fru", "with my wife"],
  ["med min man", "with my husband"],
  ["med mina barn", "with my children"],
  ["med chefen", "to the boss"],
  ["med dig", "with you"],
  ["med mig", "with me"],
  ["med honom", "with him"],
  ["med henne", "with her"],
  ["med oss", "with us"],
  ["till dig", "to you"],
  ["till mig", "to me"],
  ["för dig", "for you"],
  ["för mig", "for me"],
  ["om dig", "about you"],
  ["om mig", "about me"],
  ["med min vän", "with my friend"],
  ["med en vän", "with a friend"],
  ["min fru", "my wife"],
  ["min man", "my husband"],
  ["mina barn", "my children"],
  ["mitt barn", "my child"],
  ["min son", "my son"],
  ["min dotter", "my daughter"],
  ["min mamma", "my mom"],
  ["min pappa", "my dad"],
  ["på jobbet", "at work"],
  ["i skolan", "at school"],
  ["till skolan", "to school"],
  ["till jobbet", "to work"],
  ["till stan", "to town"],
  ["till sverige", "to Sweden"],
  ["i går", "yesterday"],
  ["igår", "yesterday"],
  ["i dag", "today"],
  ["idag", "today"],
  ["i morgon", "tomorrow"],
  ["imorgon", "tomorrow"],
  ["i kväll", "tonight"],
  ["ikväll", "tonight"],
  ["just nu", "right now"],
  ["snart", "soon"],
  ["nu", "now"],
  ["hemma", "at home"],
  ["hem", "home"],
  ["här", "here"],
  ["där", "there"],
  ["kaffe", "coffee"],
  ["te", "tea"],
  ["vatten", "water"],
  ["mjölk", "milk"],
  ["lunch", "lunch"],
  ["middag", "dinner"],
  ["frukost", "breakfast"],
  ["boken", "the book"],
  ["brevet", "the letter"],
  ["sidan", "the page"],
  ["svaret", "the answer"],
  ["svenska", "Swedish"],
  ["chef", "boss"],
  ["chefen", "the boss"],
  ["fru", "wife"],
  ["frun", "the wife"],
  ["man", "husband"],
  ["mannen", "the husband"],
  ["barn", "children"],
  ["barnet", "the child"],
  ["son", "son"],
  ["dotter", "daughter"],
  ["vän", "friend"],
  ["vägen", "the way"],
  ["nyckeln", "the key"],
  ["mobilen", "the phone"],
  ["läraren", "the teacher"],
  ["mamma", "mom"]
];

const wordTranslations = {
  jag: "I",
  du: "you",
  han: "he",
  hon: "she",
  vi: "we",
  ni: "you",
  de: "they",
  mig: "me",
  dig: "you",
  honom: "him",
  henne: "her",
  oss: "us",
  dem: "them",
  det: "it",
  en: "a",
  ett: "a",
  min: "my",
  mitt: "my",
  mina: "my",
  din: "your",
  ditt: "your",
  dina: "your",
  hans: "his",
  hennes: "her",
  vår: "our",
  vårt: "our",
  våra: "our",
  er: "your",
  ert: "your",
  era: "your",
  sin: "his/her/their",
  sitt: "his/her/their",
  sina: "his/her/their",
  och: "and",
  inte: "not",
  ska: "will",
  kommer: "will",
  att: "to",
  har: "have",
  mycket: "a lot",
  lite: "a little",
  med: "with",
  på: "on",
  i: "in",
  till: "to",
  från: "from",
  för: "for",
  efter: "after",
  före: "before",
  igen: "again",
  redan: "already"
};

const englishVerbOverrides = {
  "be able to": { present: "can", past: "could", participle: "been able to", gerund: "being able to", future: "will be able to" },
  be: { present: "am", past: "was", participle: "been", gerund: "being" },
  become: { present: "am becoming", past: "became", participle: "become", gerund: "becoming" },
  believe: { present: "believe", past: "believed", participle: "believed", gerund: "believing" },
  bike: { present: "am biking", past: "biked", participle: "biked", gerund: "biking" },
  bind: { present: "am binding", past: "bound", participle: "bound", gerund: "binding" },
  break: { present: "am breaking", past: "broke", participle: "broken", gerund: "breaking" },
  buy: { present: "am buying", past: "bought", participle: "bought", gerund: "buying" },
  call: { present: "am calling", past: "called", participle: "called", gerund: "calling" },
  carry: { present: "am carrying", past: "carried", participle: "carried", gerund: "carrying" },
  change: { present: "am changing", past: "changed", participle: "changed", gerund: "changing" },
  choose: { present: "am choosing", past: "chose", participle: "chosen", gerund: "choosing" },
  clean: { present: "am cleaning", past: "cleaned", participle: "cleaned", gerund: "cleaning" },
  close: { present: "am closing", past: "closed", participle: "closed", gerund: "closing" },
  come: { present: "am coming", past: "came", participle: "come", gerund: "coming" },
  cook: { present: "am cooking", past: "cooked", participle: "cooked", gerund: "cooking" },
  "do": { present: "am doing", past: "did", participle: "done", gerund: "doing" },
  drive: { present: "am driving", past: "drove", participle: "driven", gerund: "driving" },
  do: { present: "am doing", past: "did", participle: "done", gerund: "doing" },
  drink: { present: "am drinking", past: "drank", participle: "drunk", gerund: "drinking" },
  email: { present: "am emailing", past: "emailed", participle: "emailed", gerund: "emailing" },
  eat: { present: "am eating", past: "ate", participle: "eaten", gerund: "eating" },
  explain: { present: "am explaining", past: "explained", participle: "explained", gerund: "explaining" },
  feel: { present: "feel", past: "felt", participle: "felt", gerund: "feeling" },
  find: { present: "am finding", past: "found", participle: "found", gerund: "finding" },
  fly: { present: "am flying", past: "flew", participle: "flown", gerund: "flying" },
  forget: { present: "am forgetting", past: "forgot", participle: "forgotten", gerund: "forgetting" },
  freeze: { present: "am freezing", past: "froze", participle: "frozen", gerund: "freezing" },
  get: { present: "am getting", past: "got", participle: "got", gerund: "getting" },
  "get dressed": { present: "am getting dressed", past: "got dressed", participle: "gotten dressed", gerund: "getting dressed" },
  give: { present: "am giving", past: "gave", participle: "given", gerund: "giving" },
  go: { present: "am going", past: "went", participle: "gone", gerund: "going" },
  have: { present: "have", past: "had", participle: "had", gerund: "having" },
  "have time": { present: "have time", past: "had time", participle: "had time", gerund: "having time", future: "will have time" },
  hear: { present: "am hearing", past: "heard", participle: "heard", gerund: "hearing" },
  help: { present: "am helping", past: "helped", participle: "helped", gerund: "helping" },
  hit: { present: "am hitting", past: "hit", participle: "hit", gerund: "hitting" },
  know: { present: "know", past: "knew", participle: "known", gerund: "knowing" },
  learn: { present: "am learning", past: "learned", participle: "learned", gerund: "learning" },
  lie: { present: "am lying", past: "lay", participle: "lain", gerund: "lying" },
  like: { present: "like", past: "liked", participle: "liked", gerund: "liking" },
  listen: { present: "am listening", past: "listened", participle: "listened", gerund: "listening" },
  live: { present: "live", past: "lived", participle: "lived", gerund: "living" },
  look: { present: "am looking", past: "looked", participle: "looked", gerund: "looking" },
  "look for": { present: "am looking for", past: "looked for", participle: "looked for", gerund: "looking for" },
  make: { present: "am making", past: "made", participle: "made", gerund: "making" },
  meet: { present: "am meeting", past: "met", participle: "met", gerund: "meeting" },
  need: { present: "need", past: "needed", participle: "needed", gerund: "needing" },
  open: { present: "am opening", past: "opened", participle: "opened", gerund: "opening" },
  pay: { present: "am paying", past: "paid", participle: "paid", gerund: "paying" },
  play: { present: "am playing", past: "played", participle: "played", gerund: "playing" },
  pull: { present: "am pulling", past: "pulled", participle: "pulled", gerund: "pulling" },
  put: { present: "am putting", past: "put", participle: "put", gerund: "putting" },
  read: { present: "am reading", past: "read", participle: "read", gerund: "reading" },
  rest: { present: "am resting", past: "rested", participle: "rested", gerund: "resting" },
  shower: { present: "am showering", past: "showered", participle: "showered", gerund: "showering" },
  run: { present: "am running", past: "ran", participle: "run", gerund: "running" },
  say: { present: "am saying", past: "said", participle: "said", gerund: "saying" },
  see: { present: "am seeing", past: "saw", participle: "seen", gerund: "seeing" },
  set: { present: "am setting", past: "set", participle: "set", gerund: "setting" },
  sell: { present: "am selling", past: "sold", participle: "sold", gerund: "selling" },
  sing: { present: "am singing", past: "sang", participle: "sung", gerund: "singing" },
  sit: { present: "am sitting", past: "sat", participle: "sat", gerund: "sitting" },
  sleep: { present: "am sleeping", past: "slept", participle: "slept", gerund: "sleeping" },
  speak: { present: "am speaking", past: "spoke", participle: "spoken", gerund: "speaking" },
  stand: { present: "am standing", past: "stood", participle: "stood", gerund: "standing" },
  start: { present: "am starting", past: "started", participle: "started", gerund: "starting" },
  steal: { present: "am stealing", past: "stole", participle: "stolen", gerund: "stealing" },
  stop: { present: "am stopping", past: "stopped", participle: "stopped", gerund: "stopping" },
  study: { present: "am studying", past: "studied", participle: "studied", gerund: "studying" },
  swim: { present: "am swimming", past: "swam", participle: "swum", gerund: "swimming" },
  take: { present: "am taking", past: "took", participle: "taken", gerund: "taking" },
  teach: { present: "am learning", past: "learned", participle: "learned", gerund: "learning" },
  tell: { present: "am telling", past: "told", participle: "told", gerund: "telling" },
  think: { present: "am thinking", past: "thought", participle: "thought", gerund: "thinking" },
  understand: { present: "understand", past: "understood", participle: "understood", gerund: "understanding" },
  use: { present: "am using", past: "used", participle: "used", gerund: "using" },
  visit: { present: "am visiting", past: "visited", participle: "visited", gerund: "visiting" },
  wait: { present: "am waiting", past: "waited", participle: "waited", gerund: "waiting" },
  wake: { present: "am waking", past: "woke", participle: "woken", gerund: "waking" },
  "wake up": { present: "am waking up", past: "woke up", participle: "woken up", gerund: "waking up" },
  walk: { present: "am walking", past: "walked", participle: "walked", gerund: "walking" },
  want: { present: "want", past: "wanted", participle: "wanted", gerund: "wanting" },
  wash: { present: "am washing", past: "washed", participle: "washed", gerund: "washing" },
  wear: { present: "am wearing", past: "wore", participle: "worn", gerund: "wearing" },
  work: { present: "am working", past: "worked", participle: "worked", gerund: "working" },
  write: { present: "am writing", past: "wrote", participle: "written", gerund: "writing" }
};

function pickSwedishVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  swedishVoice = voices.find((voice) => {
    const lang = voice.lang.toLowerCase();
    const name = voice.name.toLowerCase();
    return lang.startsWith("sv")
      || name.includes("swedish")
      || name.includes("svenska")
      || name.includes("sofia")
      || name.includes("mattias");
  }) || null;
}

function waitForSwedishVoice() {
  pickSwedishVoice();
  if (swedishVoice || !("speechSynthesis" in window)) return Promise.resolve(swedishVoice);
  return new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(() => {
      pickSwedishVoice();
      if (swedishVoice || Date.now() - started > 1200) {
        clearInterval(timer);
        resolve(swedishVoice);
      }
    }, 120);
  });
}

function speakSwedish(text) {
  if (!("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  utterance.rate = 0.82;
  if (swedishVoice) utterance.voice = swedishVoice;
  speechSynthesis.speak(utterance);
  return true;
}

async function speakSwedishOnly(text) {
  if (!("speechSynthesis" in window)) return false;
  await waitForSwedishVoice();
  if (!swedishVoice) return false;
  return speakSwedish(text);
}

function audioFor(text) {
  const clean = text.trim().normalize("NFC");
  const generated = window.GENERATED_SWEDISH_AUDIO || {};
  return generated[clean] || generated[clean.toLowerCase()];
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

function playAudioSource(src) {
  return new Promise((resolve) => {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    const audio = document.getElementById("pageAudio");
    audio.pause();
    audio.onerror = () => resolve(false);
    audio.oncanplaythrough = () => {
      audio.oncanplaythrough = null;
      audio.onerror = null;
      audio.play().then(() => resolve(true)).catch(() => resolve(false));
    };
    audio.src = src;
    audio.currentTime = 0;
    audio.load();
  });
}

function normalizeText(text) {
  return ` ${text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:"'()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

function normalizeEnglishAnswer(text) {
  return text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:()"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function englishMeaningCandidates(meaning) {
  const clean = meaning.replace(/\([^)]*\)/g, "").trim();
  const candidates = new Set([clean]);

  if (clean.includes("/")) {
    const words = clean.split(/\s+/);
    const slashIndex = words.findIndex((word) => word.includes("/"));
    if (slashIndex >= 0) {
      const prefix = words.slice(0, slashIndex).join(" ");
      const suffix = words.slice(slashIndex + 1).join(" ");
      words[slashIndex].split("/").forEach((option) => {
        candidates.add([prefix, option, suffix].filter(Boolean).join(" "));
      });
    }
  }

  Array.from(candidates).forEach((candidate) => {
    if (candidate.startsWith("to ")) candidates.add(candidate.slice(3));
  });

  return Array.from(candidates)
    .map((candidate) => candidate.trim())
    .filter(Boolean);
}

function checkTranslationAnswer(value, verb) {
  const answer = normalizeEnglishAnswer(value);
  const candidates = englishMeaningCandidates(verb.meaning);
  const normalizedCandidates = candidates.map(normalizeEnglishAnswer);
  return {
    ok: normalizedCandidates.includes(answer),
    candidates
  };
}

function translationKey(text) {
  return normalizeText(text)
    .replace(/\bigår\b/g, "i går")
    .replace(/\bidag\b/g, "i dag")
    .replace(/\bimorgon\b/g, "i morgon")
    .replace(/\bikväll\b/g, "i kväll")
    .trim();
}

function wordsIn(sentence) {
  return sentence
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:"'()[\]{}]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function containsPhrase(text, phrase) {
  return normalizeText(text).includes(normalizeText(phrase));
}

function finiteForm(sentence) {
  const words = wordsIn(sentence);
  return words[1] || words[0] || "";
}

function supineForm(sentence) {
  const words = wordsIn(sentence);
  const harIndex = words.indexOf("har");
  return harIndex >= 0 ? words[harIndex + 1] || "" : finiteForm(sentence);
}

function infinitiveBase(infinitive) {
  return infinitive.replace(/^att\s+/i, "").replace(/\s+sig$/i, "").trim();
}

function expectedForms(verb, tense) {
  if (tense === "present") return [finiteForm(verb.present[0])];
  if (tense === "past") return [finiteForm(verb.past[0])];
  if (tense === "perfect") return [`har ${supineForm(verb.perfect[0])}`];
  if (tense === "future") {
    const base = infinitiveBase(verb.infinitive);
    return [`ska ${base}`, `kommer att ${base}`];
  }
  return [];
}

function checkAnswer(value, verb, tense) {
  const forms = expectedForms(verb, tense).filter(Boolean);
  const ok = forms.some((form) => containsPhrase(value, form));
  return { ok, forms };
}

function feedbackText(forms) {
  return `Expected: ${forms.join(" or ")}`;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function exactTranslationFor(value) {
  const key = translationKey(value);
  for (const verb of verbs) {
    const examples = [verb.present, verb.past, verb.perfect, verb.future];
    for (const [swedish, english] of examples) {
      if (translationKey(swedish) === key) return english;
    }
  }
  return "";
}

function englishVerbPhrase(verb, tense) {
  const base = verb.meaning
    .replace(/^to\s+/i, "")
    .split("/")
    .map((part) => part.trim())[0];
  const forms = englishVerbOverrides[base] || regularEnglishVerbForms(base);
  if (tense === "past") return forms.past;
  if (tense === "perfect") return `have ${forms.participle}`;
  if (tense === "future") return forms.future || `will ${base}`;
  return forms.present;
}

function regularEnglishVerbForms(base) {
  const words = base.split(" ");
  const first = words[0];
  const rest = words.slice(1).join(" ");
  const suffix = rest ? ` ${rest}` : "";
  const past = regularPast(first) + suffix;
  const gerund = regularGerund(first) + suffix;
  return {
    present: `am ${gerund}`,
    past,
    participle: past,
    gerund,
    future: `will ${base}`
  };
}

function regularPast(word) {
  if (word.endsWith("e")) return `${word}d`;
  if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ied`;
  if (/^[a-z]*[aeiou][bcdfghjklmnpqrstvwxyz]$/.test(word) && !/(w|x|y)$/.test(word)) {
    return `${word}${word.at(-1)}ed`;
  }
  return `${word}ed`;
}

function regularGerund(word) {
  if (word.endsWith("ie")) return `${word.slice(0, -2)}ying`;
  if (word.endsWith("e") && !word.endsWith("ee")) return `${word.slice(0, -1)}ing`;
  if (/^[a-z]*[aeiou][bcdfghjklmnpqrstvwxyz]$/.test(word) && !/(w|x|y)$/.test(word)) {
    return `${word}${word.at(-1)}ing`;
  }
  return `${word}ing`;
}

function cleanEnglishSentence(text) {
  const compact = text
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();
  if (!compact) return "";
  const capitalized = compact.charAt(0).toUpperCase() + compact.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function roughTranslationFor(value, verb, tense) {
  const exact = exactTranslationFor(value);
  if (exact) return exact;

  let text = normalizeText(value).trim();
  [...phraseTranslations].sort((a, b) => b[0].length - a[0].length).forEach(([sv, en]) => {
    text = text.replace(new RegExp(`\\b${escapeRegExp(sv)}\\b`, "g"), en);
  });
  expectedForms(verb, tense).forEach((form) => {
    text = text.replace(new RegExp(`\\b${escapeRegExp(form)}\\b`, "g"), englishVerbPhrase(verb, tense));
  });

  const translatedWords = text.split(/\s+/).map((word) => wordTranslations[word] || word);
  const rough = cleanEnglishSentence(translatedWords.join(" "));
  return rough ? `English: ${rough}` : "";
}

function updateTranslation(cell, value, verb, tense) {
  const translation = cell.querySelector(".verbTranslation");
  if (!translation) return;
  if (!value.trim()) {
    translation.textContent = "";
    updateOnlineTranslateLink(cell, value);
    return;
  }
  translation.textContent = roughTranslationFor(value, verb, tense);
  updateOnlineTranslateLink(cell, value);
}

function updateOnlineTranslateLink(cell, value) {
  const link = cell.querySelector(".verbOnlineTranslate");
  if (!link) return;
  const text = value.trim();
  link.classList.toggle("hiddenPanel", !text);
  if (!text) {
    link.removeAttribute("href");
    return;
  }
  const params = new URLSearchParams({
    sl: "sv",
    tl: "en",
    text,
    op: "translate"
  });
  link.href = `https://translate.google.com/?${params.toString()}`;
}

function onlineTranslateUrl(text) {
  const params = new URLSearchParams({
    sl: "sv",
    tl: "en",
    text,
    op: "translate"
  });
  return `https://translate.google.com/?${params.toString()}`;
}

function onlineSwedishTtsUrl(text) {
  const params = new URLSearchParams({
    ie: "UTF-8",
    client: "tw-ob",
    tl: "sv",
    q: text
  });
  return `https://translate.google.com/translate_tts?${params.toString()}`;
}

function updateCell(cell, input, verb, tense) {
  const feedback = cell.querySelector(".verbTestFeedback");
  if (!input.value.trim()) {
    cell.classList.remove("correct", "wrong");
    feedback.textContent = "";
    updateTranslation(cell, input.value, verb, tense);
    return null;
  }

  const result = checkAnswer(input.value, verb, tense);
  cell.classList.toggle("correct", result.ok);
  cell.classList.toggle("wrong", !result.ok);
  feedback.textContent = result.ok ? "Correct tense form" : feedbackText(result.forms);
  updateTranslation(cell, input.value, verb, tense);
  return result;
}

function summarizeTest() {
  let attempted = 0;
  let correct = 0;
  const wrong = [];

  document.querySelectorAll(".verbTestCell[data-tense]").forEach((cell) => {
    const input = cell.querySelector("input");
    const verb = verbs[Number(cell.dataset.verbIndex)];
    const tense = cell.dataset.tense;
    const result = updateCell(cell, input, verb, tense);
    if (!result) return;
    attempted += 1;
    if (result.ok) {
      correct += 1;
    } else {
      wrong.push({
        infinitive: verb.infinitive,
        tense,
        answer: input.value.trim(),
        expected: result.forms.join(" or ")
      });
    }
  });

  document.getElementById("verbTestScore").textContent = `${correct}/${attempted}`;
  document.getElementById("verbTestPercent").textContent = attempted
    ? `${Math.round((correct / attempted) * 100)}% correct`
    : "No answers checked yet";
  document.getElementById("verbTestWrongCount").textContent = wrong.length;

  const wrongList = document.getElementById("verbTestWrongList");
  wrongList.innerHTML = "";
  if (!wrong.length && attempted) {
    wrongList.innerHTML = "<strong>Everything you tried is correct.</strong>";
    return;
  }
  wrong.forEach((item) => {
    const row = document.createElement("div");
    row.className = "verbWrongItem";
    row.innerHTML = `
      <strong>${item.infinitive} - ${item.tense}</strong>
      <span>Your sentence: ${item.answer}</span>
      <small>${item.expected}</small>
    `;
    wrongList.appendChild(row);
  });
}

function summarizeRow(row) {
  let attempted = 0;
  let correct = 0;
  const wrong = [];

  row.querySelectorAll(".verbTestCell[data-tense]").forEach((cell) => {
    const input = cell.querySelector("input");
    const verb = verbs[Number(cell.dataset.verbIndex)];
    const tense = cell.dataset.tense;
    const result = updateCell(cell, input, verb, tense);
    if (!result) return;
    attempted += 1;
    if (result.ok) {
      correct += 1;
    } else {
      wrong.push({
        infinitive: verb.infinitive,
        tense,
        answer: input.value.trim(),
        expected: result.forms.join(" or ")
      });
    }
  });

  document.getElementById("verbTestScore").textContent = `${correct}/${attempted}`;
  document.getElementById("verbTestPercent").textContent = attempted
    ? `${Math.round((correct / attempted) * 100)}% correct for this row`
    : "No answers in this row yet";
  document.getElementById("verbTestWrongCount").textContent = wrong.length;

  const wrongList = document.getElementById("verbTestWrongList");
  wrongList.innerHTML = "";
  if (!attempted) {
    wrongList.innerHTML = "<strong>Type or speak at least one answer in this row.</strong>";
    return;
  }
  if (!wrong.length) {
    wrongList.innerHTML = "<strong>This row is correct.</strong>";
    return;
  }
  wrong.forEach((item) => {
    const wrongRow = document.createElement("div");
    wrongRow.className = "verbWrongItem";
    wrongRow.innerHTML = `
      <strong>${item.infinitive} - ${item.tense}</strong>
      <span>Your sentence: ${item.answer}</span>
      <small>${item.expected}</small>
    `;
    wrongList.appendChild(wrongRow);
  });
}

function clearTest() {
  document.querySelectorAll(".verbTestCell[data-tense]").forEach((cell) => {
    cell.classList.remove("correct", "wrong");
    cell.querySelector("input").value = "";
    cell.querySelector(".verbTestFeedback").textContent = "";
    cell.querySelector(".verbTranslation").textContent = "";
    updateOnlineTranslateLink(cell, "");
  });
  document.getElementById("verbTestScore").textContent = "0/0";
  document.getElementById("verbTestPercent").textContent = "No answers checked yet";
  document.getElementById("verbTestWrongCount").textContent = "0";
  document.getElementById("verbTestWrongList").innerHTML = "";
}

function updateTranslationCell(cell, input, verb) {
  const feedback = cell.querySelector(".verbTranslationFeedback");
  if (!input.value.trim()) {
    cell.classList.remove("correct", "wrong");
    feedback.textContent = "";
    return null;
  }

  const result = checkTranslationAnswer(input.value, verb);
  cell.classList.toggle("correct", result.ok);
  cell.classList.toggle("wrong", !result.ok);
  feedback.textContent = result.ok
    ? "Correct."
    : `Wrong. Correct answer: ${verb.meaning}`;
  return result;
}

function summarizeTranslations() {
  let attempted = 0;
  let correct = 0;
  const wrong = [];

  document.querySelectorAll(".verbTranslationCell[data-verb-index]").forEach((cell) => {
    const input = cell.querySelector("input");
    const verb = verbs[Number(cell.dataset.verbIndex)];
    const result = updateTranslationCell(cell, input, verb);
    if (!result) return;
    attempted += 1;
    if (result.ok) {
      correct += 1;
    } else {
      wrong.push({
        infinitive: verb.infinitive,
        answer: input.value.trim(),
        expected: verb.meaning
      });
    }
  });

  document.getElementById("verbTranslationScore").textContent = `${correct}/${attempted}`;
  document.getElementById("verbTranslationPercent").textContent = attempted
    ? `${Math.round((correct / attempted) * 100)}% correct`
    : "No translations checked yet";
  document.getElementById("verbTranslationWrongCount").textContent = wrong.length;

  const wrongList = document.getElementById("verbTranslationWrongList");
  wrongList.innerHTML = "";
  if (!wrong.length && attempted) {
    wrongList.innerHTML = "<strong>Every translation you tried is correct.</strong>";
    return;
  }
  wrong.forEach((item) => {
    const row = document.createElement("div");
    row.className = "verbWrongItem";
    row.innerHTML = `
      <strong>${item.infinitive}</strong>
      <span>Your answer: ${item.answer}</span>
      <small>Correct answer: ${item.expected}</small>
    `;
    wrongList.appendChild(row);
  });
}

function clearTranslations() {
  document.querySelectorAll(".verbTranslationCell[data-verb-index]").forEach((cell) => {
    cell.classList.remove("correct", "wrong");
    cell.querySelector("input").value = "";
    cell.querySelector(".verbTranslationFeedback").textContent = "";
  });
  document.getElementById("verbTranslationScore").textContent = "0/0";
  document.getElementById("verbTranslationPercent").textContent = "No translations checked yet";
  document.getElementById("verbTranslationWrongCount").textContent = "0";
  document.getElementById("verbTranslationWrongList").innerHTML = "";
}

function currentTranslationAnswers() {
  const answers = new Map();
  document.querySelectorAll(".verbTranslationCell[data-verb-index]").forEach((cell) => {
    const input = cell.querySelector("input");
    answers.set(cell.dataset.verbIndex, {
      value: input.value,
      isCorrect: cell.classList.contains("correct"),
      isWrong: cell.classList.contains("wrong"),
      feedback: cell.querySelector(".verbTranslationFeedback").textContent
    });
  });
  return answers;
}

function shuffledIndices(indices) {
  const shuffled = [...indices];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  if (shuffled.length > 1 && shuffled.every((value, index) => value === indices[index])) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

function shuffleTranslations() {
  translationVerbOrder = shuffledIndices(translationVerbOrder);
  renderTranslationTest(currentTranslationAnswers());
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const status = document.getElementById("speechSupportStatus");
  if (!SpeechRecognition) {
    status.textContent = speechUnsupportedMessage;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "sv-SE";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  status.textContent = "Use Speak buttons to check pronunciation.";

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    const cell = activeSpeechButton?.closest(".verbTestCell");
    if (!cell) return;
    const input = cell.querySelector("input");
    input.value = transcript;
    const result = updateCell(cell, input, verbs[Number(cell.dataset.verbIndex)], cell.dataset.tense);
    document.getElementById("speechSupportStatus").textContent = result?.ok
      ? `Heard: "${transcript}" - correct.`
      : `Heard: "${transcript}" - check the tense form.`;
    summarizeRow(cell.closest(".verbTestRow"));
  });

  recognition.addEventListener("error", (event) => {
    const message = event.error === "not-allowed"
      ? "Microphone permission was blocked. Allow microphone access, then try Speak again."
      : `Speech check stopped: ${event.error}.`;
    document.getElementById("speechSupportStatus").textContent = message;
    if (activeSpeechButton) activeSpeechButton.textContent = "Speak";
    activeSpeechButton = null;
  });

  recognition.addEventListener("end", () => {
    if (activeSpeechButton) activeSpeechButton.textContent = "Speak";
    activeSpeechButton = null;
  });
}

function startSpeech(button) {
  if (!recognition) {
    const cell = button.closest(".verbTestCell");
    cell.querySelector(".verbTestFeedback").textContent = speechUnsupportedMessage;
    document.getElementById("speechSupportStatus").textContent = speechUnsupportedMessage;
    return;
  }
  if (activeSpeechButton) recognition.stop();
  activeSpeechButton = button;
  button.textContent = "Listening...";
  document.getElementById("speechSupportStatus").textContent = "Listening...";
  try {
    recognition.start();
  } catch (error) {
    document.getElementById("speechSupportStatus").textContent = "Speech recognition is already listening.";
  }
}

async function listenToTypedAnswer(button) {
  const cell = button.closest(".verbTestCell");
  const input = cell.querySelector("input");
  const text = input.value.trim();
  const feedback = cell.querySelector(".verbTestFeedback");
  if (!text) {
    feedback.textContent = "Type a Swedish sentence first.";
    input.focus();
    return;
  }
  feedback.textContent = "Playing your sentence...";
  const src = audioFor(text);
  if (src) {
    play(text);
    return;
  }
  const played = await speakSwedishOnly(text);
  if (!played) {
    feedback.textContent = "No local Swedish voice found. Trying online Swedish audio...";
    const onlinePlayed = await playAudioSource(onlineSwedishTtsUrl(text));
    feedback.textContent = onlinePlayed
      ? "Playing online Swedish audio."
      : "Online audio was blocked here. Use the Online translation + audio link below.";
  }
}

function renderTest() {
  const root = document.getElementById("verbTestRows");
  root.innerHTML = "";

  const header = document.createElement("div");
  header.className = "verbTestHeader";
  header.innerHTML = "<strong>Verb</strong><strong>Past</strong><strong>Perfect</strong><strong>Present</strong><strong>Future</strong>";
  root.appendChild(header);

  verbs.forEach((verb, verbIndex) => {
    const row = document.createElement("div");
    row.className = "verbTestRow";

    const verbCell = document.createElement("div");
    verbCell.className = "verbTestVerb";
    verbCell.innerHTML = `<strong>${verb.infinitive}</strong><small>${verb.meaning}</small>`;
    const listen = document.createElement("button");
    listen.type = "button";
    listen.className = "verbListenButton";
    listen.textContent = "Listen";
    listen.addEventListener("click", () => play(verb.infinitive));
    const checkRow = document.createElement("button");
    checkRow.type = "button";
    checkRow.className = "verbRowCheckButton primary";
    checkRow.textContent = "Check row";
    checkRow.addEventListener("click", () => summarizeRow(row));
    verbCell.appendChild(listen);
    verbCell.appendChild(checkRow);
    row.appendChild(verbCell);

    tenses.forEach(([label, tense]) => {
      const cell = document.createElement("div");
      cell.className = "verbTestCell";
      cell.dataset.verbIndex = String(verbIndex);
      cell.dataset.tense = tense;

      const input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.placeholder = `${label} sentence`;
      input.setAttribute("aria-label", `${verb.infinitive} ${label}`);
      input.addEventListener("input", () => {
        cell.classList.remove("correct", "wrong");
        cell.querySelector(".verbTestFeedback").textContent = "";
        updateTranslation(cell, input.value, verb, tense);
      });

      const speak = document.createElement("button");
      speak.type = "button";
      speak.className = "verbSpeakButton";
      speak.textContent = "Speak";
      speak.title = recognition
        ? "Click, speak your Swedish sentence, and the page will check this tense form"
        : speechUnsupportedMessage;
      speak.addEventListener("click", () => startSpeech(speak));

      const listenTyped = document.createElement("button");
      listenTyped.type = "button";
      listenTyped.className = "verbTypedListenButton";
      listenTyped.textContent = "Listen";
      listenTyped.title = "Play the Swedish sentence you typed in this box";
      listenTyped.addEventListener("click", () => listenToTypedAnswer(listenTyped));

      const feedback = document.createElement("small");
      feedback.className = "verbTestFeedback";
      const translation = document.createElement("small");
      translation.className = "verbTranslation";
      const onlineTranslate = document.createElement("a");
      onlineTranslate.className = "verbOnlineTranslate hiddenPanel";
      onlineTranslate.target = "_blank";
      onlineTranslate.rel = "noopener";
      onlineTranslate.textContent = "Online translation + audio";
      cell.append(input, speak, listenTyped, feedback, translation, onlineTranslate);
      row.appendChild(cell);
    });

    root.appendChild(row);
  });
}

function renderTranslationTest(savedAnswers = new Map()) {
  const root = document.getElementById("verbTranslationRows");
  root.innerHTML = "";

  const header = document.createElement("div");
  header.className = "verbTranslationHeader";
  header.innerHTML = "<strong>Swedish infinitive</strong><strong>English translation</strong>";
  root.appendChild(header);

  translationVerbOrder.forEach((verbIndex) => {
    const verb = verbs[verbIndex];
    const row = document.createElement("div");
    row.className = "verbTranslationRow";

    const verbCell = document.createElement("div");
    verbCell.className = "verbTranslationVerb";
    const verbText = document.createElement("strong");
    verbText.textContent = verb.infinitive;
    const listen = document.createElement("button");
    listen.type = "button";
    listen.className = "verbListenButton";
    listen.textContent = "Listen";
    listen.addEventListener("click", () => play(verb.infinitive));
    verbCell.append(verbText, listen);

    const answerCell = document.createElement("div");
    answerCell.className = "verbTranslationCell";
    answerCell.dataset.verbIndex = String(verbIndex);
    const input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = true;
    input.placeholder = "English translation";
    input.setAttribute("aria-label", `${verb.infinitive} English translation`);
    input.addEventListener("input", () => {
      answerCell.classList.remove("correct", "wrong");
      answerCell.querySelector(".verbTranslationFeedback").textContent = "";
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") updateTranslationCell(answerCell, input, verb);
    });
    const check = document.createElement("button");
    check.type = "button";
    check.className = "verbTranslationCheckButton";
    check.textContent = "Check";
    check.addEventListener("click", () => updateTranslationCell(answerCell, input, verb));
    const feedback = document.createElement("small");
    feedback.className = "verbTranslationFeedback";
    answerCell.append(input, check, feedback);
    const saved = savedAnswers.get(String(verbIndex));
    if (saved) {
      input.value = saved.value;
      answerCell.classList.toggle("correct", saved.isCorrect);
      answerCell.classList.toggle("wrong", saved.isWrong);
      feedback.textContent = saved.feedback;
    }

    row.append(verbCell, answerCell);
    root.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pickSwedishVoice();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = pickSwedishVoice;
  setupSpeechRecognition();
  renderTest();
  renderTranslationTest();
  document.getElementById("checkVerbTest").addEventListener("click", summarizeTest);
  document.getElementById("clearVerbTest").addEventListener("click", clearTest);
  document.getElementById("checkVerbTranslations").addEventListener("click", summarizeTranslations);
  document.getElementById("shuffleVerbTranslations").addEventListener("click", shuffleTranslations);
  document.getElementById("clearVerbTranslations").addEventListener("click", clearTranslations);
});

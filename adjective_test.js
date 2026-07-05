const adjectives = window.SWEDISH_ADJECTIVES || [];
let meaningOrder = adjectives.map((_, index) => index);
let swedishVoice = null;

function pickSwedishVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  swedishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("sv")) || null;
}

function audioFor(text) {
  const clean = text.trim().normalize("NFC");
  const generated = window.GENERATED_SWEDISH_AUDIO || {};
  return generated[clean] || generated[clean.toLowerCase()];
}

function speakSwedish(text) {
  if (!swedishVoice || !("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  utterance.rate = 0.82;
  utterance.voice = swedishVoice;
  speechSynthesis.speak(utterance);
  return true;
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

function normalize(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function meaningCandidates(meaning) {
  return meaning
    .split("/")
    .flatMap((part) => part.split(","))
    .map((part) => normalize(part))
    .filter(Boolean);
}

function formFields(item) {
  return [
    ["en", item.en, item.nounEn],
    ["ett", item.ett, item.nounEtt],
    ["plural", item.plural, "plural nouns"],
    ["definite", item.definite || item.plural, "den/det/de"]
  ];
}

function adjectivePhrase(adjective, nounPhrase) {
  const [article, ...nounParts] = nounPhrase.split(" ");
  return `${article} ${adjective} ${nounParts.join(" ")}`.trim();
}

function updateFormCell(cell) {
  const index = Number(cell.dataset.adjectiveIndex);
  const field = cell.dataset.field;
  const item = adjectives[index];
  const expected = formFields(item).find(([name]) => name === field)?.[1] || "";
  const input = cell.querySelector("input");
  const feedback = cell.querySelector(".verbTestFeedback");
  const value = normalize(input.value);
  if (!value) {
    feedback.textContent = "";
    cell.classList.remove("correct", "wrong");
    return null;
  }
  const ok = value === normalize(expected);
  cell.classList.toggle("correct", ok);
  cell.classList.toggle("wrong", !ok);
  feedback.textContent = ok ? "Correct" : `Expected: ${expected}`;
  return { ok, expected, value: input.value.trim(), item, field };
}

function checkForms() {
  let attempted = 0;
  let correct = 0;
  const wrong = [];
  document.querySelectorAll(".adjectiveFormCell[data-field]").forEach((cell) => {
    const result = updateFormCell(cell);
    if (!result) return;
    attempted += 1;
    if (result.ok) correct += 1;
    else wrong.push(result);
  });
  document.getElementById("adjectiveFormScore").textContent = `${correct}/${attempted}`;
  document.getElementById("adjectiveFormPercent").textContent = attempted
    ? `${Math.round((correct / attempted) * 100)}% correct`
    : "No answers checked yet";
  document.getElementById("adjectiveWrongCount").textContent = wrong.length;
  const list = document.getElementById("adjectiveWrongList");
  list.innerHTML = "";
  wrong.slice(0, 20).forEach((item) => {
    const row = document.createElement("div");
    row.className = "verbWrongItem";
    row.innerHTML = `<strong>${item.item.base} - ${item.field}</strong><span>You wrote: ${item.value || "-"}</span><small>Expected: ${item.expected}</small>`;
    list.appendChild(row);
  });
}

function clearForms() {
  document.querySelectorAll(".adjectiveFormCell input").forEach((input) => {
    input.value = "";
  });
  document.querySelectorAll(".adjectiveFormCell").forEach((cell) => {
    cell.classList.remove("correct", "wrong");
    const feedback = cell.querySelector(".verbTestFeedback");
    if (feedback) feedback.textContent = "";
  });
  document.getElementById("adjectiveFormScore").textContent = "0/0";
  document.getElementById("adjectiveFormPercent").textContent = "No answers checked yet";
  document.getElementById("adjectiveWrongCount").textContent = "0";
  document.getElementById("adjectiveWrongList").innerHTML = "";
}

function updateMeaningCell(cell) {
  const index = Number(cell.dataset.adjectiveIndex);
  const item = adjectives[index];
  const input = cell.querySelector("input");
  const feedback = cell.querySelector(".verbTranslationFeedback");
  const value = normalize(input.value);
  if (!value) {
    feedback.textContent = "";
    cell.classList.remove("correct", "wrong");
    return null;
  }
  const candidates = meaningCandidates(item.meaning);
  const ok = candidates.some((candidate) => value === candidate || candidate.includes(value) || value.includes(candidate));
  cell.classList.toggle("correct", ok);
  cell.classList.toggle("wrong", !ok);
  feedback.textContent = ok ? "Correct" : `Expected: ${item.meaning}`;
  return { ok, value: input.value.trim(), item };
}

function checkMeanings() {
  let attempted = 0;
  let correct = 0;
  const wrong = [];
  document.querySelectorAll(".adjectiveMeaningCell[data-adjective-index]").forEach((cell) => {
    const result = updateMeaningCell(cell);
    if (!result) return;
    attempted += 1;
    if (result.ok) correct += 1;
    else wrong.push(result);
  });
  document.getElementById("adjectiveMeaningScore").textContent = `${correct}/${attempted}`;
  document.getElementById("adjectiveMeaningPercent").textContent = attempted
    ? `${Math.round((correct / attempted) * 100)}% correct`
    : "No meanings checked yet";
  document.getElementById("adjectiveMeaningWrongCount").textContent = wrong.length;
  const list = document.getElementById("adjectiveMeaningWrongList");
  list.innerHTML = "";
  wrong.slice(0, 20).forEach((item) => {
    const row = document.createElement("div");
    row.className = "verbWrongItem";
    row.innerHTML = `<strong>${item.item.base}</strong><span>You wrote: ${item.value || "-"}</span><small>Expected: ${item.item.meaning}</small>`;
    list.appendChild(row);
  });
}

function clearMeanings() {
  document.querySelectorAll(".adjectiveMeaningCell input").forEach((input) => {
    input.value = "";
  });
  document.querySelectorAll(".adjectiveMeaningCell").forEach((cell) => {
    cell.classList.remove("correct", "wrong");
    const feedback = cell.querySelector(".verbTranslationFeedback");
    if (feedback) feedback.textContent = "";
  });
  document.getElementById("adjectiveMeaningScore").textContent = "0/0";
  document.getElementById("adjectiveMeaningPercent").textContent = "No meanings checked yet";
  document.getElementById("adjectiveMeaningWrongCount").textContent = "0";
  document.getElementById("adjectiveMeaningWrongList").innerHTML = "";
}

function shuffleMeanings() {
  meaningOrder = meaningOrder
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
  renderMeaningRows();
  clearMeanings();
}

function renderFormRows() {
  const root = document.getElementById("adjectiveFormRows");
  root.innerHTML = "";
  const header = document.createElement("div");
  header.className = "adjectiveTestHeader";
  header.innerHTML = "<strong>Adjective</strong><strong>en</strong><strong>ett</strong><strong>plural</strong><strong>definite</strong>";
  root.appendChild(header);

  adjectives.forEach((item, adjectiveIndex) => {
    const row = document.createElement("div");
    row.className = "adjectiveTestRow";
    const source = document.createElement("div");
    source.className = "verbTestVerb";
    source.innerHTML = `<strong>${item.base}</strong><small>${item.meaning}</small>`;
    const listen = document.createElement("button");
    listen.type = "button";
    listen.className = "verbListenButton";
    listen.textContent = "Listen";
    listen.addEventListener("click", () => play(`${adjectivePhrase(item.en, item.nounEn)}. ${adjectivePhrase(item.ett, item.nounEtt)}. ${item.plural}.`));
    source.appendChild(listen);
    row.appendChild(source);

    formFields(item).forEach(([field, expected, label]) => {
      const cell = document.createElement("div");
      cell.className = "adjectiveFormCell";
      cell.dataset.adjectiveIndex = String(adjectiveIndex);
      cell.dataset.field = field;
      const input = document.createElement("input");
      input.autocomplete = "off";
      input.spellcheck = false;
      input.placeholder = label;
      input.setAttribute("aria-label", `${item.base} ${field} form`);
      input.addEventListener("input", () => {
        cell.classList.remove("correct", "wrong");
        cell.querySelector(".verbTestFeedback").textContent = "";
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") updateFormCell(cell);
      });
      const feedback = document.createElement("p");
      feedback.className = "verbTestFeedback";
      cell.append(input, feedback);
      row.appendChild(cell);
    });
    root.appendChild(row);
  });
}

function renderMeaningRows() {
  const root = document.getElementById("adjectiveMeaningRows");
  root.innerHTML = "";
  const header = document.createElement("div");
  header.className = "verbTranslationHeader";
  header.innerHTML = "<strong>Swedish adjective</strong><strong>English meaning</strong>";
  root.appendChild(header);

  meaningOrder.forEach((adjectiveIndex) => {
    const item = adjectives[adjectiveIndex];
    const row = document.createElement("div");
    row.className = "verbTranslationRow";
    const adjectiveCell = document.createElement("div");
    adjectiveCell.className = "verbTranslationVerb";
    const label = document.createElement("strong");
    label.textContent = item.base;
    const listen = document.createElement("button");
    listen.type = "button";
    listen.className = "verbListenButton";
    listen.textContent = "Listen";
    listen.addEventListener("click", () => play(item.base));
    adjectiveCell.append(label, listen);

    const answerCell = document.createElement("div");
    answerCell.className = "adjectiveMeaningCell verbTranslationCell";
    answerCell.dataset.adjectiveIndex = String(adjectiveIndex);
    const input = document.createElement("input");
    input.autocomplete = "off";
    input.placeholder = "English meaning";
    input.addEventListener("input", () => {
      answerCell.classList.remove("correct", "wrong");
      answerCell.querySelector(".verbTranslationFeedback").textContent = "";
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") updateMeaningCell(answerCell);
    });
    const check = document.createElement("button");
    check.type = "button";
    check.className = "verbTranslationCheckButton";
    check.textContent = "Check";
    check.addEventListener("click", () => updateMeaningCell(answerCell));
    const feedback = document.createElement("p");
    feedback.className = "verbTranslationFeedback";
    answerCell.append(input, check, feedback);
    row.append(adjectiveCell, answerCell);
    root.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pickSwedishVoice();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = pickSwedishVoice;
  renderFormRows();
  renderMeaningRows();
  document.getElementById("checkAdjectiveForms").addEventListener("click", checkForms);
  document.getElementById("clearAdjectiveForms").addEventListener("click", clearForms);
  document.getElementById("checkAdjectiveMeanings").addEventListener("click", checkMeanings);
  document.getElementById("shuffleAdjectiveMeanings").addEventListener("click", shuffleMeanings);
  document.getElementById("clearAdjectiveMeanings").addEventListener("click", clearMeanings);
});

(() => {
  const modules = window.COURSE_MODULES || [];
  const quiz = window.COURSE_QUIZ || [];

  const byId = Object.fromEntries(modules.map((module) => [module.id, module]));

  function addUnique(target, items, keyFn = (item) => JSON.stringify(item)) {
    const seen = new Set((target || []).map(keyFn));
    items.forEach((item) => {
      const key = keyFn(item);
      if (!seen.has(key)) {
        target.push(item);
        seen.add(key);
      }
    });
  }

  const additions = {
    alphabet: {
      notes: [
        "Listen first, then repeat. Pronunciation practice works best when your ear leads and your eyes follow.",
        "Practice minimal pairs: tak/tack, mat/matt, glas/glass. The vowel length changes the rhythm and sometimes the meaning.",
        "Read Å, Ä, Ö in short chunks: åka, år, äter, läser, öl, öga."
      ],
      practice: [
        ["Minimal pairs", "tak, tack, mat, matt, glas, glass"],
        ["Å words", "å, åka, år, språk, förstår"],
        ["Ä words", "ä, är, läser, träd, träffas"],
        ["Ö words", "ö, öl, öga, kök, mjölk"],
        ["Listen and shadow", "Lyssna först. Repetera sedan långsamt."]
      ],
      vocabulary: [
        ["åka", "go / travel"],
        ["år", "year"],
        ["är", "am / is / are"],
        ["läser", "read / reads"],
        ["träd", "tree"],
        ["öl", "beer"],
        ["öga", "eye"],
        ["glas", "glass / drinking glass"],
        ["glass", "ice cream"]
      ],
      examples: ["åka", "år", "är", "läser", "träd", "öl", "öga", "glas", "glass", "Lyssna först. Repetera sedan långsamt."]
    },
    intro: {
      notes: [
        "Add one detail at a time: name, country, city, languages, and one study sentence.",
        "Use Och du? to return the question naturally in conversation.",
        "När you do not understand, keep the conversation alive with Ursäkta, jag förstår inte."
      ],
      practice: [
        ["Longer introduction", "Hej! Jag heter Rony. Jag kommer från Indien. Nu bor jag i Stockholm. Jag talar engelska och lite svenska."],
        ["Return the question", "Jag heter Rony. Och du?"],
        ["Ask for help", "Ursäkta, jag förstår inte. Kan du säga det igen?"],
        ["Mini dialogue", "Hej! Vad heter du? Jag heter Rony. Trevligt att träffas."],
        ["Greeting choices", "Hej! God morgon. God kväll. Hur är det?"],
        ["Basic reply", "Det är bra, tack. Hur är det med dig?"],
        ["Name exchange", "Vad heter du? Jag heter Rony. Vad heter du?"],
        ["Country exchange", "Varifrån kommer du? Jag kommer från Indien. Och du?"],
        ["City exchange", "Var bor du? Jag bor i Stockholm. Var bor du?"],
        ["Language exchange", "Vilka språk talar du? Jag talar engelska och lite svenska."],
        ["Study exchange", "Studerar du svenska? Ja, jag studerar svenska. Nej, inte ännu."],
        ["Work exchange", "Jobbar du? Ja, jag jobbar. Vad jobbar du med?"],
        ["Free time", "Vad gör du på fritiden? Jag läser, tränar och studerar svenska."],
        ["Nice close", "Det var trevligt att prata med dig. Vi ses!"],
        ["Full meeting dialogue", "Hej! Jag heter Rony. Vad heter du? Jag heter Anna. Trevligt att träffas. Varifrån kommer du? Jag kommer från Indien, men jag bor i Stockholm."]
      ],
      vocabulary: [
        ["nu", "now"],
        ["och du?", "and you?"],
        ["ursäkta", "excuse me"],
        ["kan du säga det igen?", "can you say that again?"],
        ["bor", "live / lives"],
        ["i", "in"],
        ["Stockholm", "Stockholm"],
        ["god morgon", "good morning"],
        ["god kväll", "good evening"],
        ["hur är det?", "how are you?"],
        ["det är bra", "it is good / I am fine"],
        ["hur är det med dig?", "how are you?"],
        ["vilka språk", "which languages"],
        ["jobbar", "work / works"],
        ["vad jobbar du med?", "what do you do for work?"],
        ["på fritiden", "in your free time"],
        ["tränar", "train / exercise"],
        ["ännu", "yet"],
        ["det var trevligt", "that was nice"]
      ],
      examples: [
        "Och du?",
        "Ursäkta, jag förstår inte.",
        "Kan du säga det igen?",
        "Nu bor jag i Stockholm.",
        "God morgon.",
        "God kväll.",
        "Hur är det?",
        "Det är bra, tack.",
        "Hur är det med dig?",
        "Vilka språk talar du?",
        "Var bor du?",
        "Studerar du svenska?",
        "Ja, jag studerar svenska.",
        "Nej, inte ännu.",
        "Vad jobbar du med?",
        "Vad gör du på fritiden?",
        "Det var trevligt att prata med dig."
      ]
    },
    wordorder: {
      notes: [
        "The first position can change, but the verb stays early: Jag studerar i dag. I dag studerar jag.",
        "For yes/no questions, start with the verb: Bor du? Talar du? Studerar du?",
        "For question words, use question word + verb + subject: Var bor du? Vad studerar du?"
      ],
      practice: [
        ["Move the time", "Jag studerar svenska i dag. I dag studerar jag svenska."],
        ["Where question", "Var bor du? Jag bor i Stockholm."],
        ["What question", "Vad studerar du? Jag studerar svenska."],
        ["Question chain", "Heter du Rony? Bor du i Stockholm? Talar du svenska?"]
      ],
      vocabulary: [
        ["var", "where"],
        ["i dag", "today"],
        ["här", "here"],
        ["där", "there"],
        ["också", "also / too"],
        ["men", "but"]
      ],
      examples: ["Var bor du?", "Vad studerar du?", "Jag studerar svenska i dag.", "Heter du Rony?", "Jag talar engelska, men jag studerar svenska."]
    },
    verbs: {
      notes: [
        "Build useful sentence families: Jag bor, Jag talar, Jag studerar, Jag förstår.",
        "The same present-tense verb works with jag, du, han, hon, vi, ni, and de.",
        "Add inte after the verb for simple negative sentences."
      ],
      practice: [
        ["Subject swap", "Jag bor här. Du bor här. Vi bor här."],
        ["Verb swap", "Jag bor i Stockholm. Jag studerar svenska. Jag talar engelska."],
        ["Negation drill", "Jag förstår. Jag förstår inte. Jag talar svenska. Jag talar inte svenska."],
        ["About someone else", "Hon bor i Sverige. Han talar engelska. De studerar svenska."]
      ],
      vocabulary: [
        ["här", "here"],
        ["Sverige", "Sweden"],
        ["de", "they"],
        ["talar inte", "do/does not speak"],
        ["studerar inte", "do/does not study"],
        ["förstår inte", "do/does not understand"]
      ],
      examples: ["Jag bor här.", "Du bor här.", "Vi bor här.", "Jag talar inte svenska.", "De studerar svenska."]
    },
    numbers: {
      notes: [
        "Practice numbers both as isolated words and in useful tasks: phone numbers, prices, and times.",
        "For prices, say kronor after the number: femtio kronor.",
        "For time, start with whole hours before learning half and quarter forms."
      ],
      practice: [
        ["Count by tens", "tio, tjugo, trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio, hundra"],
        ["Prices", "Det kostar trettio kronor. Det kostar femtiofem kronor."],
        ["Phone digits", "noll sju tre, fyra fem sex, sju åtta nio"],
        ["Times", "Klockan är tre. Klockan är fem. Klockan är tio."]
      ],
      vocabulary: [
        ["kronor", "Swedish kronor"],
        ["det kostar", "it costs"],
        ["trettio kronor", "thirty kronor"],
        ["femtiofem", "fifty-five"],
        ["sju åtta nio", "seven eight nine"]
      ],
      examples: ["Det kostar trettio kronor.", "Det kostar femtiofem kronor.", "Klockan är tre.", "Klockan är fem.", "Klockan är tio."]
    },
    food: {
      notes: [
        "Use jag skulle vilja ha for polite ordering, then swap the item.",
        "Learn cafe nouns with en or ett so you build grammar while ordering.",
        "A tiny cafe dialogue gives you listening, speaking, and question practice at the same time."
      ],
      practice: [
        ["Order variants", "Jag skulle vilja ha en kaffe. Jag skulle vilja ha ett vatten. Jag skulle vilja ha en smörgås."],
        ["Cafe dialogue", "Hej! Jag skulle vilja ha en kaffe, tack. Vad kostar det? Det kostar trettio kronor."],
        ["More polite phrases", "Tack så mycket. Varsågod. Ha en bra dag."],
        ["Swap food", "en kaffe, ett vatten, en smörgås, ett äpple"]
      ],
      vocabulary: [
        ["en smörgås", "a sandwich"],
        ["ett äpple", "an apple"],
        ["tack så mycket", "thank you very much"],
        ["ha en bra dag", "have a good day"],
        ["notan", "the bill"],
        ["kan jag få ...?", "can I have ...?"]
      ],
      examples: ["en smörgås", "ett äpple", "Tack så mycket.", "Ha en bra dag.", "Kan jag få notan?"]
    },
    workbook: {
      notes: [
        "Turn every written answer into a spoken answer before you mark the exercise done.",
        "Keep a short mistake list: one word, one sentence, one correction.",
        "Review missed items in a warm-up before starting new pages."
      ],
      practice: [
        ["Mistake list", "Jag skriver felet. Jag skriver rätt svar. Jag läser svaret högt."],
        ["Article drill", "en bok, boken. ett språk, språket. en fråga, frågan."],
        ["Daily review", "Jag repeterar gamla fel först. Sedan gör jag nya övningar."],
        ["Speak the answer", "Jag läser frågan. Jag säger svaret. Jag kontrollerar sedan."]
      ],
      vocabulary: [
        ["felet", "the mistake"],
        ["rätt svar", "correct answer"],
        ["frågan", "the question"],
        ["repeterar", "repeat / review"],
        ["gamla fel", "old mistakes"],
        ["övningar", "exercises"],
        ["kontrollerar", "check / checks"]
      ],
      examples: ["Jag skriver felet.", "Jag skriver rätt svar.", "Jag repeterar gamla fel först.", "Sedan gör jag nya övningar."]
    }
  };

  Object.entries(additions).forEach(([id, extra]) => {
    const module = byId[id];
    if (!module) return;
    addUnique(module.notes ||= [], extra.notes || []);
    addUnique(module.practice ||= [], extra.practice || [], (item) => item[0]);
    addUnique(module.vocabulary ||= [], extra.vocabulary || [], (item) => item[0]);
    addUnique(module.examples ||= [], extra.examples || []);
  });

  window.EXTRA_LESSON_DETAILS = {
    alphabet: [
      ["Minimal pairs", "tak, tack, mat, matt, glas, glass", "roof, thanks, food, tired/dull, glass, ice cream", "Listen for vowel length first. Then repeat each pair slowly."],
      ["Å Ä Ö in words", "åka, år, är, läser, öl, öga", "go, year, am/is/are, reads, beer, eye", "Short real words make the extra letters feel like usable sounds, not alphabet trivia."],
      ["Shadowing habit", "Lyssna först. Repetera sedan långsamt.", "Listen first. Then repeat slowly.", "Play the audio once, pause, then copy the rhythm out loud."]
    ],
    intro: [
      ["Add a current city", "Nu bor jag i Stockholm.", "Now I live in Stockholm.", "Nu = now. Bor = live. Use i before a city."],
      ["Return the question", "Jag heter Rony. Och du?", "My name is Rony. And you?", "Och du? keeps a beginner conversation moving naturally."],
      ["Ask for repetition", "Kan du säga det igen?", "Can you say that again?", "This is a survival phrase. Use it immediately when listening feels too fast."],
      ["Ask how someone is", "Hur är det?", "How are you?", "A common casual greeting question. Reply with Det är bra, tack."],
      ["Ask where someone lives", "Var bor du?", "Where do you live?", "Var = where. Bor = live. Du = you."],
      ["Ask languages", "Vilka språk talar du?", "Which languages do you speak?", "Vilka språk is a simple way to ask about multiple languages."],
      ["Ask about work", "Vad jobbar du med?", "What do you do for work?", "Use this after names and countries when the conversation continues."],
      ["Ask about free time", "Vad gör du på fritiden?", "What do you do in your free time?", "This gives you an easy bridge to hobbies and everyday verbs."],
      ["Close politely", "Det var trevligt att prata med dig.", "It was nice talking with you.", "Use this before Vi ses when ending a first conversation."]
    ],
    wordorder: [
      ["Where questions", "Var bor du?", "Where do you live?", "Var + verb + subject is the same question-word pattern as Vad heter du?"],
      ["What questions", "Vad studerar du?", "What do you study?", "Vad + studerar + du. Keep the verb before the subject."],
      ["Contrast sentence", "Jag talar engelska, men jag studerar svenska.", "I speak English, but I study Swedish.", "Men = but. The second clause still uses subject + verb."]
    ],
    verbs: [
      ["Subject swap", "Jag bor här. Du bor här. Vi bor här.", "I live here. You live here. We live here.", "The verb bor stays the same with each pronoun."],
      ["Negative pattern", "Jag talar inte svenska.", "I do not speak Swedish.", "Inte comes after the verb in this simple sentence."],
      ["Other people", "De studerar svenska.", "They study Swedish.", "Use de for they. In everyday speech it is often pronounced dom."]
    ],
    numbers: [
      ["Prices", "Det kostar trettio kronor.", "It costs thirty kronor.", "Use det kostar + number + kronor for a basic price."],
      ["More prices", "Det kostar femtiofem kronor.", "It costs fifty-five kronor.", "Femtio + fem joins to femtiofem."],
      ["More times", "Klockan är tre. Klockan är fem. Klockan är tio.", "It is three. It is five. It is ten.", "Start with whole hours until the pattern feels automatic."]
    ],
    food: [
      ["Order with article", "Jag skulle vilja ha en kaffe.", "I would like a coffee.", "Use en kaffe, ett vatten, en smörgås, ett äpple."],
      ["Cafe dialogue", "Hej! Jag skulle vilja ha en kaffe, tack. Vad kostar det?", "Hi! I would like a coffee, please. How much does it cost?", "Practice it as a single spoken exchange, not separate words."],
      ["Polite close", "Tack så mycket. Ha en bra dag.", "Thank you very much. Have a good day.", "These phrases make the dialogue sound less like a drill."]
    ],
    workbook: [
      ["Mistake correction", "Jag skriver felet. Jag skriver rätt svar.", "I write the mistake. I write the correct answer.", "Keep corrections short enough to review tomorrow."],
      ["Article chain", "en bok, boken. ett språk, språket. en fråga, frågan.", "a book, the book. a language, the language. a question, the question.", "Say the indefinite and definite forms together."],
      ["Review before new work", "Jag repeterar gamla fel först.", "I review old mistakes first.", "Warm-up review makes workbook practice cumulative."]
    ]
  };

  window.COURSE_TRANSLATIONS = {
    "tak, tack, mat, matt, glas, glass": "roof, thanks, food, tired/dull, glass, ice cream",
    "å, åka, år, språk, förstår": "å, go/travel, year, language, understand",
    "ä, är, läser, träd, träffas": "ä, am/is/are, reads, tree, meet",
    "ö, öl, öga, kök, mjölk": "ö, beer, eye, kitchen, milk",
    "Lyssna först. Repetera sedan långsamt.": "Listen first. Then repeat slowly.",
    "Hej! Jag heter Rony. Jag kommer från Indien. Nu bor jag i Stockholm. Jag talar engelska och lite svenska.": "Hi! My name is Rony. I come from India. Now I live in Stockholm. I speak English and a little Swedish.",
    "Jag heter Rony. Och du?": "My name is Rony. And you?",
    "Ursäkta, jag förstår inte. Kan du säga det igen?": "Excuse me, I do not understand. Can you say that again?",
    "Hej! Vad heter du? Jag heter Rony. Trevligt att träffas.": "Hi! What is your name? My name is Rony. Nice to meet you.",
    "Hej! God morgon. God kväll. Hur är det?": "Hi! Good morning. Good evening. How are you?",
    "Det är bra, tack. Hur är det med dig?": "I am fine, thanks. How are you?",
    "Vad heter du? Jag heter Rony. Vad heter du?": "What is your name? My name is Rony. What is your name?",
    "Varifrån kommer du? Jag kommer från Indien. Och du?": "Where are you from? I come from India. And you?",
    "Var bor du? Jag bor i Stockholm. Var bor du?": "Where do you live? I live in Stockholm. Where do you live?",
    "Vilka språk talar du? Jag talar engelska och lite svenska.": "Which languages do you speak? I speak English and a little Swedish.",
    "Studerar du svenska? Ja, jag studerar svenska. Nej, inte ännu.": "Do you study Swedish? Yes, I study Swedish. No, not yet.",
    "Jobbar du? Ja, jag jobbar. Vad jobbar du med?": "Do you work? Yes, I work. What do you do for work?",
    "Vad gör du på fritiden? Jag läser, tränar och studerar svenska.": "What do you do in your free time? I read, exercise, and study Swedish.",
    "Det var trevligt att prata med dig. Vi ses!": "It was nice talking with you. See you!",
    "Hej! Jag heter Rony. Vad heter du? Jag heter Anna. Trevligt att träffas. Varifrån kommer du? Jag kommer från Indien, men jag bor i Stockholm.": "Hi! My name is Rony. What is your name? My name is Anna. Nice to meet you. Where are you from? I come from India, but I live in Stockholm.",
    "God morgon.": "Good morning.",
    "God kväll.": "Good evening.",
    "Hur är det?": "How are you?",
    "Det är bra, tack.": "I am fine, thanks.",
    "Hur är det med dig?": "How are you?",
    "Vilka språk talar du?": "Which languages do you speak?",
    "Studerar du svenska?": "Do you study Swedish?",
    "Ja, jag studerar svenska.": "Yes, I study Swedish.",
    "Nej, inte ännu.": "No, not yet.",
    "Vad jobbar du med?": "What do you do for work?",
    "Vad gör du på fritiden?": "What do you do in your free time?",
    "Det var trevligt att prata med dig.": "It was nice talking with you.",
    "Jag studerar svenska i dag. I dag studerar jag svenska.": "I study Swedish today. Today I study Swedish.",
    "Var bor du? Jag bor i Stockholm.": "Where do you live? I live in Stockholm.",
    "Vad studerar du? Jag studerar svenska.": "What do you study? I study Swedish.",
    "Heter du Rony? Bor du i Stockholm? Talar du svenska?": "Are you called Rony? Do you live in Stockholm? Do you speak Swedish?",
    "Jag bor här. Du bor här. Vi bor här.": "I live here. You live here. We live here.",
    "Jag bor i Stockholm. Jag studerar svenska. Jag talar engelska.": "I live in Stockholm. I study Swedish. I speak English.",
    "Jag förstår. Jag förstår inte. Jag talar svenska. Jag talar inte svenska.": "I understand. I do not understand. I speak Swedish. I do not speak Swedish.",
    "Hon bor i Sverige. Han talar engelska. De studerar svenska.": "She lives in Sweden. He speaks English. They study Swedish.",
    "tio, tjugo, trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio, hundra": "ten, twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, hundred",
    "Det kostar trettio kronor. Det kostar femtiofem kronor.": "It costs thirty kronor. It costs fifty-five kronor.",
    "noll sju tre, fyra fem sex, sju åtta nio": "zero seven three, four five six, seven eight nine",
    "Klockan är tre. Klockan är fem. Klockan är tio.": "It is three. It is five. It is ten.",
    "Jag skulle vilja ha en kaffe. Jag skulle vilja ha ett vatten. Jag skulle vilja ha en smörgås.": "I would like a coffee. I would like a water. I would like a sandwich.",
    "Hej! Jag skulle vilja ha en kaffe, tack. Vad kostar det? Det kostar trettio kronor.": "Hi! I would like a coffee, please. How much does it cost? It costs thirty kronor.",
    "Tack så mycket. Varsågod. Ha en bra dag.": "Thank you very much. Here you go. Have a good day.",
    "en kaffe, ett vatten, en smörgås, ett äpple": "a coffee, a water, a sandwich, an apple",
    "Jag skriver felet. Jag skriver rätt svar. Jag läser svaret högt.": "I write the mistake. I write the correct answer. I read the answer aloud.",
    "en bok, boken. ett språk, språket. en fråga, frågan.": "a book, the book. a language, the language. a question, the question.",
    "Jag repeterar gamla fel först. Sedan gör jag nya övningar.": "I review old mistakes first. Then I do new exercises.",
    "Jag läser frågan. Jag säger svaret. Jag kontrollerar sedan.": "I read the question. I say the answer. I check afterward."
  };

  const moreQuiz = [
    { module: "alphabet", q: "Which pair contrasts long and short vowel length?", options: ["glas / glass", "hej / och", "du / jag"], answer: "glas / glass", audio: "glas, glass" },
    { module: "alphabet", q: "Which word means year?", options: ["år", "är", "öl"], answer: "år", audio: "år" },
    { module: "alphabet", q: "Which word has the Swedish letter Ä?", options: ["läser", "åka", "öga"], answer: "läser", audio: "läser" },
    { module: "alphabet", q: "What should you do before repeating a new sound?", options: ["Listen first", "Translate first", "Skip audio"], answer: "Listen first", audio: "Lyssna först." },
    { module: "alphabet", q: "Which word means ice cream?", options: ["glass", "glas", "glad"], answer: "glass", audio: "glass" },

    { module: "intro", q: "Translate: Now I live in Stockholm.", options: ["Nu bor jag i Stockholm.", "Jag heter Stockholm.", "Stockholm talar jag."], answer: "Nu bor jag i Stockholm.", audio: "Nu bor jag i Stockholm." },
    { module: "intro", q: "Which phrase means 'And you?'", options: ["Och du?", "Var bor?", "Vad kostar?"], answer: "Och du?", audio: "Och du?" },
    { module: "intro", q: "What should you say if you do not understand?", options: ["Ursäkta, jag förstår inte.", "Jag kostar inte.", "Varsågod inte."], answer: "Ursäkta, jag förstår inte.", audio: "Ursäkta, jag förstår inte." },
    { module: "intro", q: "Translate: Can you say that again?", options: ["Kan du säga det igen?", "Kan du kosta igen?", "Säger du Indien?"], answer: "Kan du säga det igen?", audio: "Kan du säga det igen?" },
    { module: "intro", q: "Which sentence returns the question naturally?", options: ["Jag heter Rony. Och du?", "Jag heter Rony. Vad kostar?", "Jag heter Rony. Klockan är."], answer: "Jag heter Rony. Och du?", audio: "Jag heter Rony. Och du?" },
    { module: "intro", q: "Which question means 'How are you?'", options: ["Hur är det?", "Vad heter du?", "Vad kostar det?"], answer: "Hur är det?", audio: "Hur är det?" },
    { module: "intro", q: "Choose a good reply to 'Hur är det?'", options: ["Det är bra, tack.", "Jag kostar bra.", "Vad bor du?"], answer: "Det är bra, tack.", audio: "Det är bra, tack." },
    { module: "intro", q: "Translate: How are you?", options: ["Hur är det med dig?", "Varifrån kommer dig?", "Vilka heter du?"], answer: "Hur är det med dig?", audio: "Hur är det med dig?" },
    { module: "intro", q: "Which question asks where someone lives?", options: ["Var bor du?", "Vad gör du?", "Vad kostar det?"], answer: "Var bor du?", audio: "Var bor du?" },
    { module: "intro", q: "Choose the reply: I live in Stockholm.", options: ["Jag bor i Stockholm.", "Jag kommer i Stockholm.", "Jag heter Stockholm."], answer: "Jag bor i Stockholm.", audio: "Jag bor i Stockholm." },
    { module: "intro", q: "Which question asks which languages someone speaks?", options: ["Vilka språk talar du?", "Vad jobbar du med?", "Hur är det?"], answer: "Vilka språk talar du?", audio: "Vilka språk talar du?" },
    { module: "intro", q: "Choose the answer: I speak English and a little Swedish.", options: ["Jag talar engelska och lite svenska.", "Jag talar Indien och Stockholm.", "Jag bor engelska."], answer: "Jag talar engelska och lite svenska.", audio: "Jag talar engelska och lite svenska." },
    { module: "intro", q: "Which question asks if someone studies Swedish?", options: ["Studerar du svenska?", "Jobbar svenska du?", "Var svenska du?"], answer: "Studerar du svenska?", audio: "Studerar du svenska?" },
    { module: "intro", q: "Choose a yes reply to 'Studerar du svenska?'", options: ["Ja, jag studerar svenska.", "Ja, jag kostar svenska.", "Ja, svenska studerar du."], answer: "Ja, jag studerar svenska.", audio: "Ja, jag studerar svenska." },
    { module: "intro", q: "Choose a no/not-yet reply.", options: ["Nej, inte ännu.", "Nej, tack så mycket.", "Nej, vad heter du?"], answer: "Nej, inte ännu.", audio: "Nej, inte ännu." },
    { module: "intro", q: "Which question asks about work?", options: ["Vad jobbar du med?", "Vad heter du med?", "Varifrån jobbar språk?"], answer: "Vad jobbar du med?", audio: "Vad jobbar du med?" },
    { module: "intro", q: "Which question asks about free time?", options: ["Vad gör du på fritiden?", "Vad kostar fritiden?", "Hur heter fritiden?"], answer: "Vad gör du på fritiden?", audio: "Vad gör du på fritiden?" },
    { module: "intro", q: "Choose a free-time reply.", options: ["Jag läser, tränar och studerar svenska.", "Jag heter, kostar och bor.", "Jag språk fritiden."], answer: "Jag läser, tränar och studerar svenska.", audio: "Jag läser, tränar och studerar svenska." },
    { module: "intro", q: "Which phrase politely closes a conversation?", options: ["Det var trevligt att prata med dig.", "Vad kostar det?", "Jag bor kaffe."], answer: "Det var trevligt att prata med dig.", audio: "Det var trevligt att prata med dig." },
    { module: "intro", q: "Choose the natural first-meeting order.", options: ["Hej. Vad heter du? Trevligt att träffas.", "Vad kostar det? Hej. Klockan är två.", "Jag bor kaffe. Vi ses."], answer: "Hej. Vad heter du? Trevligt att träffas.", audio: "Hej. Vad heter du? Trevligt att träffas." },

    { module: "wordorder", q: "Choose the correct 'where' question.", options: ["Var bor du?", "Du bor var?", "Bor var du?"], answer: "Var bor du?", audio: "Var bor du?" },
    { module: "wordorder", q: "Choose the correct 'what do you study?' question.", options: ["Vad studerar du?", "Du studerar vad?", "Studerar vad du?"], answer: "Vad studerar du?", audio: "Vad studerar du?" },
    { module: "wordorder", q: "Choose the sentence with time first and verb second.", options: ["I dag studerar jag svenska.", "I dag jag studerar svenska.", "Jag i dag studerar svenska."], answer: "I dag studerar jag svenska.", audio: "I dag studerar jag svenska." },
    { module: "wordorder", q: "Which word means but?", options: ["men", "också", "här"], answer: "men", audio: "men" },
    { module: "wordorder", q: "Choose the correct contrast sentence.", options: ["Jag talar engelska, men jag studerar svenska.", "Jag engelska talar, men svenska jag studerar.", "Talar jag engelska men svenska."], answer: "Jag talar engelska, men jag studerar svenska.", audio: "Jag talar engelska, men jag studerar svenska." },

    { module: "verbs", q: "Which sentence means 'I live here'?", options: ["Jag bor här.", "Jag heter här.", "Jag talar här."], answer: "Jag bor här.", audio: "Jag bor här." },
    { module: "verbs", q: "Translate: We live here.", options: ["Vi bor här.", "Vi heter här.", "Vi förstår här."], answer: "Vi bor här.", audio: "Vi bor här." },
    { module: "verbs", q: "Which sentence is negative?", options: ["Jag talar inte svenska.", "Jag talar svenska.", "Jag svenska talar."], answer: "Jag talar inte svenska.", audio: "Jag talar inte svenska." },
    { module: "verbs", q: "Which pronoun means they?", options: ["de", "du", "ni"], answer: "de", audio: "de" },
    { module: "verbs", q: "Translate: They study Swedish.", options: ["De studerar svenska.", "De talar Indien.", "De bor engelska."], answer: "De studerar svenska.", audio: "De studerar svenska." },

    { module: "numbers", q: "Translate: It costs thirty kronor.", options: ["Det kostar trettio kronor.", "Klockan är trettio.", "Jag heter trettio kronor."], answer: "Det kostar trettio kronor.", audio: "Det kostar trettio kronor." },
    { module: "numbers", q: "What is 55 in Swedish?", options: ["femtiofem", "femton", "femtio"], answer: "femtiofem", audio: "femtiofem" },
    { module: "numbers", q: "Which phrase asks for a price?", options: ["Vad kostar det?", "Vad heter du?", "Var bor du?"], answer: "Vad kostar det?", audio: "Vad kostar det?" },
    { module: "numbers", q: "Translate: It is three o'clock.", options: ["Klockan är tre.", "Klockan är tretton.", "Klockan kostar tre."], answer: "Klockan är tre.", audio: "Klockan är tre." },
    { module: "numbers", q: "Which word means Swedish kronor?", options: ["kronor", "klockan", "kommer"], answer: "kronor", audio: "kronor" },

    { module: "food", q: "Which means a sandwich?", options: ["en smörgås", "ett vatten", "en fråga"], answer: "en smörgås", audio: "en smörgås" },
    { module: "food", q: "Which means an apple?", options: ["ett äpple", "en kaffe", "ett språk"], answer: "ett äpple", audio: "ett äpple" },
    { module: "food", q: "Translate: Thank you very much.", options: ["Tack så mycket.", "Ha en bra dag.", "Vad kostar det?"], answer: "Tack så mycket.", audio: "Tack så mycket." },
    { module: "food", q: "Translate: Have a good day.", options: ["Ha en bra dag.", "Jag har en dag.", "Varsågod dag."], answer: "Ha en bra dag.", audio: "Ha en bra dag." },
    { module: "food", q: "Which phrase asks for the bill?", options: ["Kan jag få notan?", "Kan jag heta notan?", "Notan talar svenska?"], answer: "Kan jag få notan?", audio: "Kan jag få notan?" },

    { module: "workbook", q: "Translate: I write the mistake.", options: ["Jag skriver felet.", "Jag läser felet.", "Jag kostar felet."], answer: "Jag skriver felet.", audio: "Jag skriver felet." },
    { module: "workbook", q: "Which phrase means correct answer?", options: ["rätt svar", "gammalt fel", "ny fråga"], answer: "rätt svar", audio: "rätt svar" },
    { module: "workbook", q: "Translate: I review old mistakes first.", options: ["Jag repeterar gamla fel först.", "Jag skriver nya fel först.", "Jag läser svenska kostar."], answer: "Jag repeterar gamla fel först.", audio: "Jag repeterar gamla fel först." },
    { module: "workbook", q: "Which word means exercises?", options: ["övningar", "frågan", "boken"], answer: "övningar", audio: "övningar" },
    { module: "workbook", q: "What should workbook answers become?", options: ["Speaking practice", "Only silent reading", "Only answer-key checking"], answer: "Speaking practice", audio: "Jag säger svaret." }
  ];

  addUnique(quiz, moreQuiz, (item) => `${item.module}:${item.q}`);
})();

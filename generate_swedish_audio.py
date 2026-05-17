import asyncio
import hashlib
import json
import re
from pathlib import Path

import edge_tts


VOICE = "sv-SE-SofieNeural"
OUT_DIR = Path("assets/audio/generated")
MANIFEST = Path("assets/audio/generated_manifest.json")
MANIFEST_JS = Path("assets/audio/generated_manifest.js")

TEXTS = [
    "a", "be", "se", "de", "e", "eff", "ge", "hå", "i", "ji", "kå", "ell", "emm", "enn", "o", "pe",
    "ku", "err", "ess", "te", "u", "ve", "dubbel-ve", "eks", "y", "säta", "å", "ä", "ö",
    "Hej!", "Vad heter du?", "Jag heter Rony.", "Varifrån kommer du?", "Jag kommer från Indien.",
    "Vad talar du för språk?", "Jag talar engelska och lite svenska.", "Trevligt att träffas.",
    "Jag förstår lite.", "Ursäkta, vad betyder det?", "Vad är klockan?", "Jag skulle vilja ha kaffe.",
    "Jag heter ...", "Jag kommer från ...", "Jag talar engelska.", "Talar du svenska?",
    "Jag bor i Stockholm.", "Jag studerar svenska.", "Tack.", "Varsågod", "Varsågod.",
    "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, Å, Ä, Ö",
    "Play the alphabet, then click the individual letter cards below.",
    "Compare tak and tack. The double consonant usually shortens the vowel.",
    "Spend 3 minutes on Å, Ä, Ö before each study session.",
    "Hej! Jag heter Rony. Jag kommer från Indien. Jag talar engelska och lite svenska.",
    "Varifrån kommer du?", "Jag kommer från ...",
    "Vad heter du? Talar du svenska? Jag talar engelska.",
    "Bor du i Stockholm?", "Vad heter du?",
    "Jag bor i Stockholm. Jag studerar svenska. Jag förstår lite.",
    "jag, du, han, hon, vi, ni, de", "heter, kommer, talar, förstår, bor, studerar",
    "Vi talar engelska.",
    "Vad är klockan? Klockan är ett. Klockan är två.",
    "noll, en, två, tre, fyra, fem", "sex, sju, åtta, nio, tio", "Klockan är ...",
    "Jag skulle vilja ha kaffe, tack. Vad kostar det?", "Vad kostar det?", "vatten", "bröd", "mjölk",
    "Jag övar svenska varje dag.",
    "Hej! Jag heter Rony.\nJag kommer från Indien.\nNu bor jag i Stockholm.\nJag talar engelska och lite svenska.\nJag studerar svenska.",
    "Hej! Jag heter Rony. Jag kommer från Indien. Nu bor jag i Stockholm. Jag talar engelska och lite svenska. Jag studerar svenska.",
    "Nu bor jag i Stockholm.",
    "Write, check, then speak aloud", "Say it aloud", "Review missed items tomorrow", "Clear and slow",
    "språk", "svenska", "träffas", "kommer", "bok", "förstår", "kaffe", "penna",
    "två", "tre", "tio", "sju", "sex", "åtta", "Klockan är ett.",
]

TEXTS += [
    "hå", "kå", "säta", "å", "ä", "ö", "tak", "tack", "mat", "matt", "kök",
    "Vi ses!", "Du talar svenska.", "I dag studerar jag svenska.",
    "Jag förstår inte.", "Hon kommer från Sverige.", "noll", "en", "två", "fyra",
    "fem", "nio", "elva", "tolv", "tjugo", "Klockan är ett.", "Klockan är två.",
    "Jag skulle vilja ha vatten.", "en kaffe", "ett vatten", "en bok", "ett språk",
    "boken", "språket", "Jag skriver svaret.", "Jag läser högt.",
    "Jag övar svenska varje dag.", "Vad kostar det?", "Varsågod.", "vatten",
    "bröd", "mjölk", "språk", "träffas", "förstår", "Talar du svenska?",
    "Studerar du svenska?", "Vad talar du?", "Jag kommer från Indien.",
    "Vad talar du för språk?", "Varifrån kommer du?", "Trevligt att träffas.",
    "Vad är klockan?", "Jag talar engelska och lite svenska.",
]

TEXTS += [
    "tretton", "fjorton", "femton", "sexton", "sjutton", "arton", "nitton",
    "tjugoen", "tjugotvå", "trettio", "trettiofem", "fyrtio", "fyrtioåtta",
    "femtio", "femtiotvå", "sextio", "sextiosex", "sjuttio", "sjuttiosju",
    "åttio", "åttiofyra", "nittio", "nittionio", "hundra",
    "etthundra", "tvåhundra", "tvåhundrafyrtiofem", "femhundrasextio",
    "niohundranittionio", "ett tusen",
    "Mitt telefonnummer är noll sju noll, ett två tre, fyrtiofem, sextiosju.",
]

SWEDISH_HINTS = re.compile(
    r"[åäöÅÄÖ]|\b("
    r"jag|du|han|hon|vi|ni|de|hej|tack|heter|kommer|från|talar|svenska|"
    r"engelska|lite|trevligt|träffas|förstår|ursäkta|vad|var|varifrån|"
    r"språk|klockan|skulle|vilja|ha|kaffe|bor|studerar|varsågod|vatten|"
    r"bröd|mjölk|noll|en|ett|två|tre|fyra|fem|sex|sju|åtta|nio|tio|"
    r"elva|tolv|tjugo|trettio|fyrtio|femtio|kostar|kronor|smörgås|äpple|"
    r"svar|fråga|övningar|här|men|och|kan|säger|felet|rätt|lyssna|"
    r"repetera|sedan|långsamt|åka|år|är|läser|träd|öl|öga|glas|glass|"
    r"notan|dag|gamla|fel|först|bok|penna|tak|mat|matt|indien|stockholm|"
    r"sverige|rony|morgon|kväll|dig|vilka|jobbar|med|gör|på|fritiden|"
    r"tränar|ännu|prata|anna|ja|nej"
    r")\b",
    re.IGNORECASE,
)

ENGLISH_HINTS = re.compile(
    r"\b("
    r"the|what|where|which|translate|choose|means|english|question|answer|"
    r"listen first|repeat aloud|correct|wrong|audio|practice|letters|word|"
    r"sentence|module|swedish alphabet|learn|hear|notice|memorize|starter|"
    r"common|guidance|vowels|central|short|long|daily|routine|which|how|"
    r"now|my|are|called|live|speak|only|book|roof|thanks|food|tired|dull|"
    r"use|before|after|with|they|everyday|pronounced|number|basic|price|"
    r"nouns|possible|study|session|spend|minutes|combines|ones|when|is|"
    r"simple|way|ask|about|multiple|languages|common|casual|greeting|"
    r"can you say that again\\?"
    r")\b",
    re.IGNORECASE,
)


def looks_like_swedish(text: str) -> bool:
    clean = text.strip()
    if not clean or len(clean) > 220:
        return False
    if clean.startswith(("http", "assets/", "../", "#")):
        return False
    if ENGLISH_HINTS.search(clean):
        return False
    return bool(SWEDISH_HINTS.search(clean))


def js_strings(path: Path) -> list[str]:
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    values = []
    for quote, body in re.findall(r"(['\"])((?:\\.|(?!\1).)*?)\1", text):
        if "\\" in body:
            try:
                value = bytes(body, "utf-8").decode("unicode_escape")
            except UnicodeDecodeError:
                value = body
        else:
            value = body
        if looks_like_swedish(value):
            values.append(value)
    return values


TEXTS += js_strings(Path("course_data.js"))
TEXTS += js_strings(Path("course_enhancements.js"))


def filename_for(text: str) -> str:
    digest = hashlib.sha1(text.encode("utf-8")).hexdigest()[:12]
    return f"sv_{digest}.mp3"


async def generate_one(text: str, out_path: Path) -> None:
    communicate = edge_tts.Communicate(text, VOICE, rate="-8%")
    await communicate.save(str(out_path))


async def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = {}
    if MANIFEST.exists():
        manifest.update(json.loads(MANIFEST.read_text(encoding="utf-8")))
    unique_texts = []
    for text in TEXTS:
      if text in manifest or looks_like_swedish(text):
        if text not in unique_texts:
          unique_texts.append(text)

    for index, text in enumerate(unique_texts, start=1):
        filename = filename_for(text)
        out_path = OUT_DIR / filename
        manifest[text] = f"assets/audio/generated/{filename}"
        if out_path.exists() and out_path.stat().st_size > 0:
            continue
        print(f"{index}/{len(unique_texts)} {text}")
        await generate_one(text, out_path)
        MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    MANIFEST_JS.write_text(
        "window.GENERATED_SWEDISH_AUDIO = "
        + json.dumps(manifest, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {MANIFEST} with {len(manifest)} items")


if __name__ == "__main__":
    asyncio.run(main())

const LOCALE_MAP = {
  'pt-BR': { country: 'Brasil', flag: '🇧🇷' },
  'pt-PT': { country: 'Portugal', flag: '🇵🇹' },
  'en-US': { country: 'Estados Unidos', flag: '🇺🇸' },
  'en-GB': { country: 'Reino Unido', flag: '🇬🇧' },
  'en-AU': { country: 'Austrália', flag: '🇦🇺' },
  'en-IN': { country: 'Índia (Inglês)', flag: '🇮🇳' },
  'en-IE': { country: 'Irlanda', flag: '🇮🇪' },
  'en-ZA': { country: 'África do Sul', flag: '🇿🇦' },
  'es-ES': { country: 'Espanha', flag: '🇪🇸' },
  'es-MX': { country: 'México', flag: '🇲🇽' },
  'es-AR': { country: 'Argentina', flag: '🇦🇷' },
  'es-US': { country: 'Estados Unidos (Espanhol)', flag: '🇺🇸' },
  'fr-FR': { country: 'França', flag: '🇫🇷' },
  'fr-CA': { country: 'Canadá (Francês)', flag: '🇨🇦' },
  'de-DE': { country: 'Alemanha', flag: '🇩🇪' },
  'de-AT': { country: 'Áustria', flag: '🇦🇹' },
  'it-IT': { country: 'Itália', flag: '🇮🇹' },
  'ja-JP': { country: 'Japão', flag: '🇯🇵' },
  'ko-KR': { country: 'Coreia do Sul', flag: '🇰🇷' },
  'zh-CN': { country: 'China', flag: '🇨🇳' },
  'zh-TW': { country: 'Taiwan', flag: '🇹🇼' },
  'zh-HK': { country: 'Hong Kong', flag: '🇭🇰' },
  'ru-RU': { country: 'Rússia', flag: '🇷🇺' },
  'ar-SA': { country: 'Arábia Saudita', flag: '🇸🇦' },
  'hi-IN': { country: 'Índia (Hindi)', flag: '🇮🇳' },
  'nl-NL': { country: 'Países Baixos', flag: '🇳🇱' },
  'sv-SE': { country: 'Suécia', flag: '🇸🇪' },
  'da-DK': { country: 'Dinamarca', flag: '🇩🇰' },
  'nb-NO': { country: 'Noruega', flag: '🇳🇴' },
  'no-NO': { country: 'Noruega', flag: '🇳🇴' },
  'fi-FI': { country: 'Finlândia', flag: '🇫🇮' },
  'pl-PL': { country: 'Polônia', flag: '🇵🇱' },
  'tr-TR': { country: 'Turquia', flag: '🇹🇷' },
  'th-TH': { country: 'Tailândia', flag: '🇹🇭' },
  'vi-VN': { country: 'Vietnã', flag: '🇻🇳' },
  'id-ID': { country: 'Indonésia', flag: '🇮🇩' },
  'el-GR': { country: 'Grécia', flag: '🇬🇷' },
  'he-IL': { country: 'Israel', flag: '🇮🇱' },
  'cs-CZ': { country: 'República Tcheca', flag: '🇨🇿' },
  'hu-HU': { country: 'Hungria', flag: '🇭🇺' },
  'ro-RO': { country: 'Romênia', flag: '🇷🇴' },
  'uk-UA': { country: 'Ucrânia', flag: '🇺🇦' },
  'ms-MY': { country: 'Malásia', flag: '🇲🇾' },
  'sk-SK': { country: 'Eslováquia', flag: '🇸🇰' },
  'bn-IN': { country: 'Índia (Bengali)', flag: '🇮🇳' },
  'ca-ES': { country: 'Espanha (Catalão)', flag: '🇪🇸' },
  'bg-BG': { country: 'Bulgária', flag: '🇧🇬' },
  'hr-HR': { country: 'Croácia', flag: '🇭🇷' },
  'kn-IN': { country: 'Índia (Canarim)', flag: '🇮🇳' },
  'si-LK': { country: 'Sri Lanka (Cingalês)', flag: '🇱🇰' },
  'ta-IN': { country: 'Índia (Tâmil)', flag: '🇮🇳' },
  'te-IN': { country: 'Índia (Telugu)', flag: '🇮🇳' },
  'yue-HK': { country: 'Hong Kong (Cantonês)', flag: '🇭🇰' }
};

export function getLocaleInfo(locale) {
  if (!locale) {
    return { code: 'unknown', country: 'Outro', flag: '🌐' };
  }

  if (LOCALE_MAP[locale]) {
    return { code: locale, ...LOCALE_MAP[locale] };
  }

  const langPrefix = locale.split(/[-_]/)[0];
  const partial = Object.entries(LOCALE_MAP).find(([key]) =>
    key.startsWith(`${langPrefix}-`)
  );
  if (partial) {
    return { code: locale, country: `${partial[1].country} (${locale})`, flag: partial[1].flag };
  }

  return { code: locale, country: locale, flag: '🌐' };
}

export function sortLocaleEntries([codeA], [codeB]) {
  if (codeA === 'pt-BR') return -1;
  if (codeB === 'pt-BR') return 1;
  if (codeA.startsWith('pt') && !codeB.startsWith('pt')) return -1;
  if (codeB.startsWith('pt') && !codeA.startsWith('pt')) return 1;
  return codeA.localeCompare(codeB);
}

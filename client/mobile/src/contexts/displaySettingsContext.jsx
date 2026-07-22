import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@caa_display_settings";

const DEFAULT_COLUMNS = {
  phone: 2,
  tabletPortrait: 4,
  tabletLandscape: 5,
};

const COLUMN_LIMITS = {
  phone: { min: 1, max: 3 },
  tabletPortrait: { min: 2, max: 6 },
  tabletLandscape: { min: 3, max: 7 },
};

const FONT_SCALE_LIMITS = { min: 0.8, max: 1.4, step: 0.1 };
const BORDER_WIDTH_LIMITS = { min: 2, max: 8, step: 1 };
const IMAGE_SCALE_LIMITS = { min: 0.7, max: 1.3, step: 0.1 };

export const CONTRAST_MODES = {
  normal: {
    id: "normal",
    label: "Normal",
    description: "Cores originais das categorias",
    swatch: { bg: "#FFFFFF", fg: "#0b5c74" },
    screenBackground: "#AFC0CB",
    sectionBackground: "#ebf1f8",
    cellBackground: "#FFFFFF",
    cellBorder: null,
    cellBorderFallback: "#ccc",
    previewBorder: "#0b5c74",
    text: "#1C1C1E",
    textBold: false,
    featureBarBackground: "#FFFFFF",
    boardTitleBackground: "#0b5c74",
    writeBar: "#FFFFFF",
    buttonBackground: "#D1E3EE", 
    buttonBorderColor: "#0b5c74",
    iconStroke: "#000000"
  },
  alto: {
    id: "alto",
    label: "Alto contraste",
    description: "Preto sobre branco, bordas reforçadas",
    swatch: { bg: "#FFFFFF", fg: "#000000" },
    screenBackground: "#AFC0CB",
    sectionBackground: "#FFFFFF",
    cellBackground: "#FFFFFF",
    cellBorder: "#000000",
    cellBorderFallback: "#000000",
    previewBorder: "#000000",
    text: "#000000",
    textBold: true,
    featureBarBackground: "#FFFFFF",
    boardTitleBackground: "#0b5c74",
    writeBar: "#FFFFFF",
    buttonBackground: "#D1E3EE", 
    buttonBorderColor: "#0b5c74",
    iconStroke: "#000000"
  },
  invertido: {
    id: "invertido",
    label: "Invertido",
    description: "Branco sobre preto, reduz brilho da tela",
    swatch: { bg: "#000000", fg: "#FFFFFF" },
    screenBackground: "#457788ff",
    sectionBackground: "#111111",
    cellBackground: "#000000",
    cellBorder: "#FFFFFF",
    cellBorderFallback: "#FFFFFF",
    previewBorder: "#FFFFFF",
    text: "#FFFFFF",
    textBold: true,
    featureBarBackground: "#084059",
    boardTitleBackground: "#032545",
    writeBar: "#032545",
    buttonBackground: "#000000", 
    buttonBorderColor: "#ffffffff",
    iconStroke: "#ffffffff"
  },
  amareloPreto: {
    id: "amareloPreto",
    label: "Amarelo sobre preto",
    description: "Contraste máximo, indicado para baixa visão",
    swatch: { bg: "#000000", fg: "#FFFF00" },
    screenBackground: "#457788ff",
    sectionBackground: "#111111",
    cellBackground: "#000000",
    cellBorder: "#FFFF00",
    cellBorderFallback: "#FFFF00",
    previewBorder: "#FFFF00",
    text: "#FFFF00",
    textBold: true,
    featureBarBackground: "#084059",
    boardTitleBackground: "#032545",
    writeBar: "#032545",
    buttonBackground: "#000000", 
    buttonBorderColor: "#FFFF00",
    iconStroke: "#ffffffff"
  },
};

const DEFAULT_SETTINGS = {
  contrast: "normal", 
  fontScale: 1,
  borderWidth: 4,
  imageScale: 1,
  columns: DEFAULT_COLUMNS,
};

const DisplaySettingsContext = createContext();

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getContrastTheme(contrastId) {
  return CONTRAST_MODES[contrastId] || CONTRAST_MODES.normal;
}

export function DisplaySettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const contrast = CONTRAST_MODES[parsed.contrast] ? parsed.contrast : "normal";
          setSettings((prev) => ({
            ...prev,
            ...parsed,
            contrast,
            columns: { ...prev.columns, ...(parsed.columns || {}) },
          }));
        }
      } catch (err) {
        console.error("DisplaySettings: falha ao carregar configurações:", err);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  const persist = useCallback(async (next) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("DisplaySettings: falha ao salvar configurações:", err);
    }
  }, []);

  const updateSettings = useCallback((updater) => {
    setSettings((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      persist(next);
      return next;
    });
  }, [persist]);

  const setContrast = useCallback((contrast) => {
    if (!CONTRAST_MODES[contrast]) return;
    updateSettings((prev) => ({ ...prev, contrast }));
  }, [updateSettings]);

  const setFontScale = useCallback((value) => {
    updateSettings((prev) => ({
      ...prev,
      fontScale: clamp(Math.round(value * 10) / 10, FONT_SCALE_LIMITS.min, FONT_SCALE_LIMITS.max),
    }));
  }, [updateSettings]);

  const setBorderWidth = useCallback((value) => {
    updateSettings((prev) => ({
      ...prev,
      borderWidth: clamp(value, BORDER_WIDTH_LIMITS.min, BORDER_WIDTH_LIMITS.max),
    }));
  }, [updateSettings]);

  const setImageScale = useCallback((value) => {
    updateSettings((prev) => ({
      ...prev,
      imageScale: clamp(Math.round(value * 10) / 10, IMAGE_SCALE_LIMITS.min, IMAGE_SCALE_LIMITS.max),
    }));
  }, [updateSettings]);

  const setColumnsForDevice = useCallback((deviceType, value) => {
    const limits = COLUMN_LIMITS[deviceType];
    if (!limits) return;
    updateSettings((prev) => ({
      ...prev,
      columns: { ...prev.columns, [deviceType]: clamp(value, limits.min, limits.max) },
    }));
  }, [updateSettings]);

  const resetSettings = useCallback(() => {
    updateSettings(() => DEFAULT_SETTINGS);
  }, [updateSettings]);

  const contrastTheme = useMemo(() => getContrastTheme(settings.contrast), [settings.contrast]);

  const value = useMemo(() => ({
    ...settings,
    isLoaded,
    contrastTheme,
    contrastModes: CONTRAST_MODES,
    setContrast,
    setFontScale,
    setBorderWidth,
    setImageScale,
    setColumnsForDevice,
    resetSettings,
    limits: {
      font: FONT_SCALE_LIMITS,
      border: BORDER_WIDTH_LIMITS,
      image: IMAGE_SCALE_LIMITS,
      columns: COLUMN_LIMITS,
    },
  }), [settings, isLoaded, contrastTheme, setContrast, setFontScale, setBorderWidth, setImageScale, setColumnsForDevice, resetSettings]);

  return (
    <DisplaySettingsContext.Provider value={value}>
      {children}
    </DisplaySettingsContext.Provider>
  );
}

export function useDisplaySettings() {
  const context = useContext(DisplaySettingsContext);
  if (!context) {
    throw new Error("useDisplaySettings must be used within a DisplaySettingsProvider");
  }
  return context;
}

export function getDeviceColumnType(isTablet, isLandscape) {
  if (isTablet && isLandscape) return "tabletLandscape";
  if (isTablet && !isLandscape) return "tabletPortrait";
  return "phone";
}
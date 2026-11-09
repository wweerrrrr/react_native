import { createContext, useContext } from "react";
import {
    Text as RNText,
    TextInput as RNTextInput,
    StyleSheet,
} from "react-native";

// true only when Sora has finished loading
export const FontsReadyContext = createContext(false);

const FAMILY_BY_WEIGHT = {
  normal: "Sora_400Regular",
  400: "Sora_400Regular",
  500: "Sora_500Medium",
  600: "Sora_600SemiBold",
  bold: "Sora_700Bold",
  700: "Sora_700Bold",
};

function useFontStyle(style) {
  const ready = useContext(FontsReadyContext);
  const flat = StyleSheet.flatten(style) || {};

  // If Sora isn't loaded, keep the style as written:
  // the device font is used and fontWeight still makes text bold.
  if (!ready) return flat;

  const { fontWeight, ...rest } = flat;
  return {
    ...rest,
    fontFamily:
      flat.fontFamily ??
      FAMILY_BY_WEIGHT[fontWeight ?? "normal"] ??
      "Sora_400Regular",
  };
}

export function Text({ style, ...props }) {
  return <RNText {...props} style={useFontStyle(style)} />;
}

export function TextInput({ style, ...props }) {
  return <RNTextInput {...props} style={useFontStyle(style)} />;
}

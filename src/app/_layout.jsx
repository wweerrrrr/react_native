import {
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  useFonts,
} from "@expo-google-fonts/sora";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { FontsReadyContext } from "../components/AppText";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
  });

  // After 4 seconds, stop waiting and open the app anyway
  const [gaveUp, setGaveUp] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setGaveUp(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Stay blank only while loading, with no error, and before the timer ends
  if (!fontsLoaded && !fontError && !gaveUp) return null;

  return (
    <FontsReadyContext.Provider value={fontsLoaded}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="registering" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </FontsReadyContext.Provider>
  );
}

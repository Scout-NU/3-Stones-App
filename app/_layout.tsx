import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{headerShown: false}}
        initialRouteName="signup" 
      >
        <Stack.Screen name="signup" />
        <Stack.Screen name="index" />
        <Stack.Screen name="input-email" />
        <Stack.Screen name="input-password" />
        <Stack.Screen name="input-name" />
        <Stack.Screen name="input-legal" />
        <Stack.Screen name="input-quiz" />
        <Stack.Screen name="filter" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
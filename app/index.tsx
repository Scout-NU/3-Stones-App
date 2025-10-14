import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  const router = useRouter();

  // Timer to simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Background grey circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      
      {/* 3 Stones Logo */}
      <Image 
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Overall Styling
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Circle Styling
  circle1: {
    position: 'absolute',
    width: 390,
    height: 400,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  circle2: {
    position: 'absolute',
    width: 590,
    height: 600,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  circle3: {
    position: 'absolute',
    width: 790,
    height: 800,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  // Logo Styling
  logo: {
    width: 150,
    height: 150,
    zIndex: 1,
  },
});
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Background Circles */}
      <View style={styles.circlesContainer}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        <View style={styles.circle4} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>3 Stones</Text>
        <Text style={styles.subtitle}>
          Providing the tools you need to make your first investments in real estate.
        </Text>

        <Image 
          source={require('@/assets/images/loginlogo.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  // Overall Styling
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  // Circle Styling
  circlesContainer: {
    position: 'absolute',
    right: -100,
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1: {
    position: 'absolute',
    width: 280,
    height: 270,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  circle2: {
    position: 'absolute',
    width: 480,
    height: 470,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  circle3: {
    position: 'absolute',
    width: 680,
    height: 670,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  circle4: {
    position: 'absolute',
    width: 880,
    height: 870,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  // Body Styling
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  illustration: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  // Button Styling
  buttonContainer: {
    gap: 16,
    paddingBottom: 40,
  },
  signUpButton: {
    backgroundColor: '#2D5F5D',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D5F5D',
  },
  loginText: {
    color: '#2D5F5D',
    fontSize: 16,
    fontWeight: '600',
  },
});
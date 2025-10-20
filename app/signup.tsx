import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image} from 'react-native';
import { useRouter } from 'expo-router';

const googleLogo = require('@/assets/images/google.png');
const appleLogo = require('@/assets/images/apple.png');

export default function SignUpScreen() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Close Button */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => router.back()}
        >
        <Text style={styles.closeIcon}>✕</Text>
    </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.brandText}>3 Stones</Text>
        <Text style={styles.descriptionText}>
          Providing the tools you need to make your first investments in real estate.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/input-email')}
        >
          <Text style={styles.primaryButtonText}>Continue with email</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>OR</Text>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={googleLogo}style={styles.googleIcon}></Image>
          <Text style={styles.socialButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={appleLogo}style={styles.appleIcon}></Image>
          <Text style={styles.socialButtonText}>Sign up with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -40, // Adjust to center better
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  brandText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 23,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#2F5B52',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
    fontWeight: '500',
  },
  socialButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  appleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  socialButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});
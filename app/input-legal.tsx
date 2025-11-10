import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function InputLegalScreen() {
  const router = useRouter();
  const [ssn, setSSN] = useState('');
  const [address, setAddress] = useState('');
  const [showManualAddress, setShowManualAddress] = useState(false);
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  const formatSSN = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Apply formatting
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 5) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
    }
  };

  const handleSSNChange = (text: string) => {
    const formatted = formatSSN(text);
    setSSN(formatted);
  };

  const canContinue = ssn.replace(/\D/g, '').length === 9 && (
    showManualAddress 
      ? (addressLine.trim() !== '' && city.trim() !== '' && zipCode.trim() !== '' && country.trim() !== '')
      : address.trim() !== ''
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back Button and Progress Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Some legal information</Text>
        <Text style={styles.subtitle}>
          We need this information to get you started investing in 3 Stones.
        </Text>

        {/* SSN Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Social Security Number</Text>
          <TextInput
            style={styles.input}
            value={ssn}
            onChangeText={handleSSNChange}
            placeholder="XXX-XX-XXXX"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            autoCorrect={false}
            autoFocus={true}
            maxLength={11}
          />
        </View>

        {/* Address Input */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
          {!showManualAddress ? (
            <>
              <View style={styles.addressInputWrapper}>
                <TextInput
                  style={styles.addressInput}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Start typing your address..."
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.searchIcon}>
                  <Text style={styles.searchIconText}>🔍</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={styles.manualLink}
                onPress={() => setShowManualAddress(true)}
              >
                <Text style={styles.manualLinkText}>Enter Address Manually</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.manualAddressContainer}>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder=""
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.searchIconManual}>
                  <Text style={styles.searchIconText}>🔍</Text>
                </TouchableOpacity>
              </View>
              
              <TextInput
                style={styles.input}
                value={addressLine}
                onChangeText={setAddressLine}
                placeholder="Address Line"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
              />
              
              <View style={styles.rowInputs}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  value={city}
                  onChangeText={setCity}
                  placeholder="City"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  value={zipCode}
                  onChangeText={setZipCode}
                  placeholder="Zip Code"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  maxLength={5}
                />
              </View>
              
              <TextInput
                style={styles.input}
                value={country}
                onChangeText={setCountry}
                placeholder="Country"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
              />
            </>
          )}
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={() => canContinue && router.push('/input-quiz')}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 28,
    color: '#000',
    fontWeight: '300',
  },
  progressContainer: {
    flex: 1,
    maxWidth: 300,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2F5B52',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 52,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  manualAddressContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  searchIconManual: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  addressInputWrapper: {
    position: 'relative',
  },
  addressInput: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  searchIconText: {
    fontSize: 18,
  },
  manualLink: {
    marginTop: 12,
  },
  manualLinkText: {
    fontSize: 14,
    color: '#2F5B52',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: '#2F5B52',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#D0D0D0',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
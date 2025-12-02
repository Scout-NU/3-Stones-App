import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EditPasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <LabelledInput
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <LabelledInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <View style={styles.passwordHint}>
          <Text style={styles.hintText}>• At least 8 characters</Text>
          <Text style={styles.hintText}>• Contains a number</Text>
          <Text style={styles.hintText}>• Contains a special character</Text>
        </View>
        <LabelledInput
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save New Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---- FIX: add explicit prop types for the inline-destructured params ---- */
type LabelledInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
};

function LabelledInput({
  label,
  value,
  onChangeText,
  showPassword,
  setShowPassword,
}: LabelledInputProps) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#999"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  form: { paddingHorizontal: 16, paddingTop: 12 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: { flex: 1, fontSize: 16 },
  passwordHint: { marginTop: 4, marginBottom: 12 },
  hintText: { fontSize: 13, color: '#777' },
  saveButton: {
    backgroundColor: '#295b48',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 10,
  },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

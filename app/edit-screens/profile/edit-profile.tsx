import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const PROFILE_KEY = 'userProfile';

type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  photoUri?: string | null;
};

export default function EditProfileScreen() {
  const [form, setForm] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    photoUri: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(PROFILE_KEY);
        if (raw) setForm(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load profile', e);
      }
    })();
  }, []);

  const save = async () => {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(form));
      router.replace('/profile'); // always return to Profile tab
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/profile')}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={save}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Photo stub (picker can be added later) */}
        <View style={styles.photoSection}>
          <View style={styles.photoCircle}>
            <Text style={styles.photoText}>Photo</Text>
          </View>
          <TouchableOpacity style={styles.changeImageButton} onPress={() => { /* TODO: image picker */ }}>
            <Text style={styles.changeImageText}>Change Image</Text>
            <Ionicons name="pencil" size={14} color="#0a3729" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* Contact Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Contact Details</Text>

          <Field
            label="Name"
            value={form.name}
            onChangeText={(t) => setForm((s) => ({ ...s, name: t }))}
          />
          <Field
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => setForm((s) => ({ ...s, email: t }))}
          />
          <Field
            label="Mobile"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(t) => setForm((s) => ({ ...s, phone: t }))}
          />
          <Field
            label="Mailing Address"
            value={form.address}
            onChangeText={(t) => setForm((s) => ({ ...s, address: t }))}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={save}>
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholder={`Enter ${label.toLowerCase()}`}
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  saveText: { color: '#0a3729', fontWeight: '600', fontSize: 16 },

  photoSection: { alignItems: 'center', marginTop: 24, marginBottom: 32 },
  photoCircle: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#295b48',
    alignItems: 'center', justifyContent: 'center',
  },
  photoText: { color: '#fff', fontWeight: '600' },
  changeImageButton: {
    marginTop: 12, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#295b48', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  changeImageText: { color: '#295b48', fontWeight: '500' },

  detailsContainer: { borderTopWidth: 1, borderTopColor: '#e0e0e0', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },

  field: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  label: { color: '#555', fontSize: 14, marginBottom: 6 },
  input: {
    backgroundColor: '#fff', borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16,
  },

  primaryButton: {
    marginTop: 20, backgroundColor: '#295b48', borderRadius: 12,
    paddingVertical: 12, alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

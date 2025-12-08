import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
  const [cookiesEnabled, setCookiesEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Account Access */}
        <Text style={styles.sectionTitle}>Account Access</Text>
        {/* Link to Edit Password Screen */}
        <Link href="/edit-screens/profile/edit-password" asChild>
            <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                    <Ionicons name="key-outline" size={20} color="#0a3729" />
                    <Text style={styles.rowText}>Change Password</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
        </Link>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Language', 'Coming soon')}>
          <View style={styles.rowLeft}>
            <Ionicons name="language-outline" size={20} color="#0a3729" />
            <Text style={styles.rowText}>Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#0a3729" />
            <Text style={styles.rowText}>Cookies</Text>
          </View>
          <Switch value={cookiesEnabled} onValueChange={setCookiesEnabled} />
        </View>

        {/* Legal & Investment Documents */}
        <Text style={styles.sectionTitle}>Legal & Investment Documents</Text>

        <DocRow title="Investment Guide" onPress={() => Alert.alert('Open', 'Investment Guide')} />
        <DocRow title="Project Documents" onPress={() => Alert.alert('Open', 'Project Documents')} />
        <DocRow title="Tax Documents" onPress={() => Alert.alert('Open', 'Tax Documents')} />
        <DocRow title="Platform Terms" onPress={() => Alert.alert('Open', 'Platform Terms')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DocRow({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.docRow} onPress={onPress}>
      <Text style={styles.docRowText}>{title}</Text>
      <Ionicons name="open-outline" size={20} color="#0a3729" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },

  content: { paddingHorizontal: 16, paddingBottom: 24 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },

  row: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowText: { fontSize: 16 },

  docRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  docRowText: { fontSize: 16 },
});

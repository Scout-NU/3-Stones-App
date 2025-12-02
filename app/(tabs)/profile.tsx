import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
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

const defaultProfile: Profile = {
  name: 'Your Name',
  email: 'yourname@gmail.com',
  phone: '123-456-7890',
  address: '400 Huntington Ave',
  photoUri: null,
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const loadProfile = async () => {
    try {
      const raw = await AsyncStorage.getItem(PROFILE_KEY);
      if (raw) setProfile({ ...defaultProfile, ...JSON.parse(raw) });
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Text style={styles.header}>Your Profile</Text>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: profile.photoUri || 'https://via.placeholder.com/120',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>

          <Link href="/edit-screens/profile/edit-profile" asChild>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Connected Bank */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Connected Bank</Text>
            <Ionicons name="pencil" size={20} color="#000" />
          </View>

          <View style={styles.bankInfo}>
            <View style={styles.bankLogo}>
              <Ionicons name="logo-usd" size={26} color="#fff" />
            </View>
            <View style={styles.bankDetails}>
              <Text style={styles.bankName}>Chase Bank</Text>
              <Text style={styles.accountNumber}>xxxxxxx</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Action Items */}
        <View style={styles.actionGroup}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Ionicons name="arrow-down-circle-outline" size={22} color="#000" />
              <Text style={styles.actionText}>Deposit</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Ionicons name="arrow-up-circle-outline" size={22} color="#000" />
              <Text style={styles.actionText}>Withdraw</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        
        {/* Settings (clickable) */}
        <Link href="/detail-screens/profile/settings" asChild>
            <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionLeft}>
                    <Ionicons name="settings-outline" size={22} color="#000" />
                    <Text style={styles.actionText}>Settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    fontSize: 26,
    fontWeight: '700',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: '#e0e0e0',
  },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  email: { fontSize: 15, color: '#666', marginBottom: 14 },
  editButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  editButtonText: { fontSize: 14, fontWeight: '500' },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  bankInfo: { flexDirection: 'row', alignItems: 'center' },
  bankLogo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bankDetails: { flex: 1 },
  bankName: { fontSize: 15, fontWeight: '600' },
  accountNumber: { fontSize: 14, color: '#777' },

  actionGroup: { backgroundColor: '#fff', marginTop: 6 },
  actionItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 16, marginLeft: 12 },
});

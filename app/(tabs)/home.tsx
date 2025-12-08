import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
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

type Investment = {
  id: string;
  address: string;
  location: string;
  amount: string;
  status: string;
  image: string;
};

const investments: Investment[] = [
  {
    id: '1',
    address: '931 1st Street',
    location: 'Venice Beach, CA',
    amount: '$550.00',
    status: 'Funding',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
  },
  {
    id: '2',
    address: '742 2nd Street',
    location: 'Los Angeles, CA',
    amount: '$300.00',
    status: 'Funding',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
  },
  {
    id: '3',
    address: '553 3rd Street',
    location: 'San Francisco, CA',
    amount: '$200.00',
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
  },
  {
    id: '4',
    address: '364 4th Street',
    location: 'Sacramento, CA',
    amount: '$150.00',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
  },
];

export default function HomeScreen() {
    const [userName, setUserName] = useState('there');
  
    const loadProfile = async () => {
      try {
        const raw = await AsyncStorage.getItem(PROFILE_KEY);
        if (raw) {
          const profile: Profile = JSON.parse(raw);
          // Extract first name only
          const firstName = profile.name.split(' ')[0] || 'there';
          setUserName(firstName);
        }
      } catch (error) {
        console.log('Error loading profile:', error);
      }
    };
  
    useFocusEffect(
      useCallback(() => {
        loadProfile();
      }, [])
    );
  
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello {userName}!</Text>
            <Text style={styles.welcomeBack}>Welcome back</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#2F5B52" />
          </TouchableOpacity>
        </View>

        {/* Portfolio Value Card */}
        <View style={styles.portfolioCard}>
          <Text style={styles.portfolioLabel}>Portfolio Value</Text>
          <View style={styles.portfolioValueRow}>
            <Text style={styles.portfolioValue}>$12,345.67</Text>
            <TouchableOpacity>
              <Ionicons name="bar-chart-outline" size={24} color="#2F5B52" />
            </TouchableOpacity>
          </View>
          <View style={styles.changeRow}>
            <Ionicons name="arrow-up" size={16} color="#10B981" />
            <Text style={styles.changeText}>$350.23</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryActionButton}>
              <Text style={styles.primaryActionText}>Portfolio</Text>
              <Ionicons name="chevron-forward" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryActionButton}>
              <Text style={styles.secondaryActionText}>Add Funds</Text>
              <Ionicons name="cash-outline" size={20} color="#2F5B52" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Investments Section */}
        <View style={styles.investmentsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Investments</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {investments.map((investment) => (
            <TouchableOpacity key={investment.id} style={styles.investmentCard}>
              <Image
                source={{ uri: investment.image }}
                style={styles.investmentImage}
              />
              <View style={styles.investmentInfo}>
                <Text style={styles.investmentAddress}>{investment.address}</Text>
                <Text style={styles.investmentLocation}>{investment.location}</Text>
              </View>
              <View style={styles.investmentRight}>
                <Text style={styles.investmentAmount}>{investment.amount}</Text>
                <Text style={styles.investmentStatus}>{investment.status}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F5B52',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
  },
  welcomeBack: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 32,
  },
  portfolioLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  portfolioValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  changeText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: '#2F5B52',
    borderRadius: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryActionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryActionText: {
    color: '#2F5B52',
    fontSize: 16,
    fontWeight: '600',
  },
  investmentsSection: {
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllText: {
    fontSize: 16,
    color: '#2F5B52',
    fontWeight: '500',
  },
  investmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  investmentImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  investmentLocation: {
    fontSize: 14,
    color: '#666',
  },
  investmentRight: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  investmentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  investmentStatus: {
    fontSize: 13,
    color: '#666',
  },
});
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type ProjectPosition = {
  id: string;
  address: string;
  location: string;
  type: string;
  status: string;
  statusColor: string;
  finalValue: string;
  initialValue: string;
  totalReturn: string;
  image: string;
};

type Update = {
  id: string;
  address: string;
  status: string;
  statusColor: string;
  statusIcon: string;
  message: string;
  timestamp: string;
  price?: string;
  image: string;
};

const projectPositions: ProjectPosition[] = [
  {
    id: '1',
    address: '333 Market Street',
    location: 'San Francisco, CA',
    type: 'Commercial Development',
    status: 'Sold',
    statusColor: '#10B981',
    finalValue: '$350.00',
    initialValue: '$250.00',
    totalReturn: '0',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
  },
  {
    id: '2',
    address: '700 Bourke Street',
    location: 'Melbourne, VIC',
    type: 'Residential Building',
    status: 'Construction Underway',
    statusColor: '#F59E0B',
    finalValue: '$1,200.00',
    initialValue: '$800.00',
    totalReturn: '50',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
  },
  {
    id: '3',
    address: '931 1st Street',
    location: 'Venice Beach, CA',
    type: 'Residential Property',
    status: 'Funding',
    statusColor: '#2F5B52',
    finalValue: '$550.00',
    initialValue: '$500.00',
    totalReturn: '10',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
  },
];

const updates: Update[] = [
  {
    id: '1',
    address: '931 1st Street',
    status: 'Operational',
    statusColor: '#10B981',
    statusIcon: 'home',
    message: 'Construction has completed, inspections are complete and the building is now operational.',
    timestamp: 'Yesterday 1:54 PM',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
  },
  {
    id: '2',
    address: '232 4th Avenue',
    status: 'Sold',
    statusColor: '#10B981',
    statusIcon: 'checkmark-circle',
    message: 'Routine maintenance completed, building systems are functioning optimally.',
    timestamp: '3 days ago 10:23 AM',
    price: '+$534.00',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
  },
  {
    id: '3',
    address: '577 7th Road',
    status: 'Design Complete',
    statusColor: '#9CA3AF',
    statusIcon: 'hammer',
    message: 'Design phase has been completed and approved.',
    timestamp: 'Last week 9:17 AM',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
  },
];

export default function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState<'positions' | 'updates'>('positions');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Your Portfolio</Text>

        {/* Net Portfolio Value Card */}
        <View style={styles.portfolioCard}>
          <View style={styles.netValueHeader}>
            <Text style={styles.netValueLabel}>Net Portfolio Value</Text>
            <Ionicons name="eye-outline" size={20} color="#666" />
          </View>
          <Text style={styles.netValue}>$12,345.67</Text>
          <View style={styles.returnRow}>
            <Text style={styles.returnPositive}>+$350.23</Text>
            <Text style={styles.returnPositive}>+9.70%</Text>
            <Text style={styles.returnLabel}>Total Return</Text>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Market Value</Text>
              <Text style={styles.statValue}>$10,000.00</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cash Value</Text>
              <Text style={styles.statValue}>$2,345.67</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Projects</Text>
              <Text style={styles.statValue}>11</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.maturityLabel}>
                <Text style={styles.statLabel}>Exp. Maturity</Text>
                <Ionicons name="information-circle-outline" size={16} color="#666" />
              </View>
              <Text style={styles.statValue}>12.5 Years</Text>
            </View>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'positions' && styles.tabActivePositions]}
            onPress={() => setActiveTab('positions')}
          >
            <Text style={[styles.tabText, activeTab === 'positions' && styles.tabTextActive]}>
              Your Positions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'updates' && styles.tabActiveUpdates]}
            onPress={() => setActiveTab('updates')}
          >
            <Text style={[styles.tabText, activeTab === 'updates' && styles.tabTextActive]}>
              Updates
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'positions' ? (
          <View style={styles.positionsContent}>
            <Text style={styles.sectionTitle}>8 Total Projects</Text>

            {projectPositions.map((project) => (
              <TouchableOpacity key={project.id} style={styles.projectCard}>
                <View style={styles.projectLeft}>
                  <Text style={styles.projectAddress}>{project.address}</Text>
                  <Text style={styles.projectLocation}>{project.location}</Text>
                  <Text style={styles.projectType}>{project.type}</Text>

                  <View style={[styles.statusBadge, { backgroundColor: project.statusColor }]}>
                    <Ionicons name="checkmark-circle" size={14} color="#FFF" />
                    <Text style={styles.statusText}>{project.status}</Text>
                  </View>

                  <View style={styles.projectValues}>
                    <View style={styles.valueItem}>
                      <Text style={styles.valueLabel}>Final Value</Text>
                      <Text style={styles.valueFinal}>{project.finalValue}</Text>
                    </View>
                    <View style={styles.valueItem}>
                      <Text style={styles.valueLabel}>Initial Value</Text>
                      <Text style={styles.valueInitial}>{project.initialValue}</Text>
                    </View>
                    <View style={styles.valueItem}>
                      <Text style={styles.valueLabel}>Total Return</Text>
                      <Text style={styles.valueReturn}>{project.totalReturn}</Text>
                    </View>
                  </View>
                </View>

                <Image source={{ uri: project.image }} style={styles.projectImage} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.updatesContent}>
            {updates.map((update) => (
              <TouchableOpacity key={update.id} style={styles.updateCard}>
                <Image source={{ uri: update.image }} style={styles.updateImage} />
                <View style={styles.updateContent}>
                  <View style={styles.updateHeader}>
                    <Text style={styles.updateAddress}>{update.address}</Text>
                    <Text style={styles.updateTimestamp}>{update.timestamp}</Text>
                  </View>
                  
                  <View style={styles.updateBadgeRow}>
                    <View style={[styles.updateStatusBadge, { backgroundColor: `${update.statusColor}20` }]}>
                      <Ionicons name={update.statusIcon as any} size={14} color={update.statusColor} />
                      <Text style={[styles.updateStatusText, { color: update.statusColor }]}>
                        {update.status}
                      </Text>
                    </View>
                    {update.price && (
                      <Text style={styles.updatePrice}>{update.price}</Text>
                    )}
                  </View>

                  <Text style={styles.updateMessage}>{update.message}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  portfolioCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  netValueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  netValueLabel: {
    fontSize: 16,
    color: '#666',
  },
  netValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  returnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  returnPositive: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  returnLabel: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '47%',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  maturityLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  tabActivePositions: {
    backgroundColor: '#2F5B52',
  },
  tabActiveUpdates: {
    backgroundColor: '#2F5B52',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  positionsContent: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  projectCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  projectLeft: {
    flex: 1,
  },
  projectAddress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  projectLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  projectType: {
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  projectValues: {
    flexDirection: 'row',
    gap: 24,
  },
  valueItem: {
    gap: 4,
  },
  valueLabel: {
    fontSize: 12,
    color: '#666',
  },
  valueFinal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  valueInitial: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  valueReturn: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  projectImage: {
    width: 160,
    height: 120,
    borderRadius: 12,
  },
  updatesContent: {
    paddingHorizontal: 24,
  },
  updateCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  updateImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  updateContent: {
    flex: 1,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  updateAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  updateTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  updateBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  updateStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  updateStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  updatePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  updateMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
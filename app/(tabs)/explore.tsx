import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type RecentSearch = {
  id: string;
  address: string;
  location: string;
  status: 'Funding' | 'In Progress' | 'Sold';
  image: string;
};

type Property = {
  id: string;
  address: string;
  location: string;
  type: string;
  status: string;
  statusColor: string;
  statusIcon: string;
  expReturn: string;
  estCompletion: string;
  totalAmount: string;
  fundingProgress?: string;
  image: string;
};

type Category = {
  id: string;
  title: string;
  image: string;
};

const recentSearches: RecentSearch[] = [
  {
    id: '1',
    address: '931 1st Street',
    location: 'Venice Beach, CA',
    status: 'Funding',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
  },
  {
    id: '2',
    address: '823 Main St.',
    location: 'Santa Monica, CA',
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
  },
  {
    id: '3',
    address: '456 Ocean Ave.',
    location: 'Malibu, CA',
    status: 'Funding',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
  },
  {
    id: '4',
    address: '709 Sunset Blvd.',
    location: 'Hollywood, CA',
    status: 'Sold',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
  },
  {
    id: '5',
    address: '123 Rodeo Dr.',
    location: 'Beverly Hills, CA',
    status: 'Sold',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
  },
];

const searchResults: Property[] = [
  {
    id: '1',
    address: '123 Maple St.',
    location: 'Springfield, IL',
    type: 'Commercial Development',
    status: 'Land Control Secured',
    statusColor: '#9CA3AF',
    statusIcon: 'checkmark-circle',
    expReturn: '8 %',
    estCompletion: '2.5 years',
    totalAmount: '$1,432,522 total',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
  },
  {
    id: '2',
    address: '356 Oak Ave.',
    location: 'Dallas, TX',
    type: 'Commercial Development',
    status: 'Funding',
    statusColor: '#2F5B52',
    statusIcon: 'cash',
    expReturn: '10%',
    estCompletion: '4 years',
    totalAmount: '$2,500,000 total',
    fundingProgress: '90%',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
  },
  {
    id: '3',
    address: '333 Market St.',
    location: 'Denver, CO',
    type: 'Commercial Development',
    status: 'Construction Started',
    statusColor: '#F59E0B',
    statusIcon: 'hammer',
    expReturn: '7%',
    estCompletion: '6 years',
    totalAmount: '$7,432,100 total',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
  },
  {
    id: '4',
    address: '90 Birch Ln.',
    location: 'Portland, OR',
    type: 'Commercial Development',
    status: 'Construction Complete',
    statusColor: '#10B981',
    statusIcon: 'home',
    expReturn: '6 %',
    estCompletion: '2 years',
    totalAmount: '$3,250,000 total',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400',
  },
];

const categories: Category[] = [
  {
    id: '1',
    title: 'Residential',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
  },
  {
    id: '2',
    title: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
  },
  {
    id: '3',
    title: 'Newly Added',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
  },
  {
    id: '4',
    title: 'Popular',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setHasSearched(true);
      setIsSearchFocused(false);
      Keyboard.dismiss();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    setIsSearchFocused(false);
  };

  const removeRecentSearch = (id: string) => {
    // In a real app, you'd update state/storage here
    console.log('Remove search:', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Funding':
        return '#2F5B52';
      case 'In Progress':
        return '#F59E0B';
      case 'Sold':
        return '#10B981';
      default:
        return '#666';
    }
  };

  // Show recently searched when search is focused but no search has been made
  if (isSearchFocused && !hasSearched) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Search Bar */}
          <View style={styles.searchContainerFocused}>
            <View style={styles.searchBarFocused}>
              <TextInput
                style={styles.searchInput}
                placeholder=""
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              <TouchableOpacity onPress={handleClearSearch}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recently Searched */}
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recently Searched</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {recentSearches.map((item) => (
              <View key={item.id} style={styles.recentItem}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <View style={styles.recentInfo}>
                  <Text style={styles.recentAddress}>{item.address}</Text>
                  <Text style={styles.recentLocation}>{item.location}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(item.status)}20` },
                  ]}
                >
                  <Ionicons
                    name={item.status === 'Funding' ? 'cash' : item.status === 'Sold' ? 'checkmark-circle' : 'hammer'}
                    size={14}
                    color={getStatusColor(item.status)}
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeRecentSearch(item.id)}>
                  <Ionicons name="close" size={24} color="#999" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Show search results after searching
  if (hasSearched) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Text style={styles.header}>Explore</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="search" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={() => router.push('/filter')}>
                <Ionicons name="options-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Sort Dropdown */}
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Sort by: {sortBy}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {/* Search Results */}
          <View style={styles.resultsContainer}>
            {searchResults.map((property) => (
              <TouchableOpacity key={property.id} style={styles.propertyCard}>
                <View style={styles.propertyLeft}>
                  <Text style={styles.propertyAddress}>{property.address}</Text>
                  <Text style={styles.propertyLocation}>{property.location}</Text>
                  <Text style={styles.propertyType}>{property.type}</Text>

                  <View style={[styles.propertyStatusBadge, { backgroundColor: `${property.statusColor}20` }]}>
                    <Ionicons name={property.statusIcon as any} size={14} color={property.statusColor} />
                    <Text style={[styles.propertyStatusText, { color: property.statusColor }]}>
                      {property.status}
                    </Text>
                  </View>

                  <View style={styles.propertyDetails}>
                    <View style={styles.propertyDetail}>
                      <Text style={styles.detailLabel}>Exp. Return</Text>
                      <Text style={styles.detailValue}>{property.expReturn}</Text>
                    </View>
                    <View style={styles.propertyDetail}>
                      <Text style={styles.detailLabel}>Est. Completion</Text>
                      <Text style={styles.detailValue}>{property.estCompletion}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.propertyRight}>
                  <Image source={{ uri: property.image }} style={styles.propertyImage} />
                  <Text style={styles.propertyAmount}>{property.totalAmount}</Text>
                  {property.fundingProgress && (
                    <Text style={styles.fundingProgress}>{property.fundingProgress}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Default explore view
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Explore</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Ionicons name="search" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => router.push('/filter')}>
            <Ionicons name="options-outline" size={20} color="#000" />
            </TouchableOpacity>
        </View>

        {/* Sort Dropdown */}
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by: {sortBy}</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="layers-outline" size={80} color="#D0D0D0" />
          </View>
          <Text style={styles.emptyTitle}>No recent searches yet.</Text>
          <Text style={styles.emptySubtitle}>
            Try searching for something or explore the categories to find what you are looking for.
          </Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
            >
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 16,
  },
  searchContainerFocused: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchBarFocused: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    padding: 4,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 24,
  },
  sortText: {
    fontSize: 16,
    color: '#000',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  // Recently Searched Styles
  recentSection: {
    paddingHorizontal: 24,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllText: {
    fontSize: 16,
    color: '#2F5B52',
    fontWeight: '500',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  recentInfo: {
    flex: 1,
  },
  recentAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  recentLocation: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  // Search Results Styles
  resultsContainer: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 24,
  },
  propertyCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  propertyLeft: {
    flex: 1,
  },
  propertyAddress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  propertyType: {
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  propertyStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    gap: 4,
  },
  propertyStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  propertyDetails: {
    flexDirection: 'row',
    gap: 24,
  },
  propertyDetail: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  propertyRight: {
    alignItems: 'flex-end',
  },
  propertyImage: {
    width: 160,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  propertyAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  fundingProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
});
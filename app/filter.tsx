import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type PropertyType = 'Residential' | 'Commercial Development' | 'Mixed-Use' | 'Land';
type ProjectStage = 'Funding' | 'Land Control Secured' | 'Design Complete' | 'Permitting Secured' | 'Construction Started' | 'Construction Complete' | 'Operational' | 'Sold';

export default function FilterScreen() {
  const router = useRouter();
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<PropertyType[]>([]);
  const [projectDuration, setProjectDuration] = useState(1);
  const [selectedProjectStages, setSelectedProjectStages] = useState<ProjectStage[]>([]);

  const propertyTypes: PropertyType[] = ['Residential', 'Commercial Development', 'Mixed-Use', 'Land'];
  const projectStages: ProjectStage[] = [
    'Funding',
    'Land Control Secured',
    'Design Complete',
    'Permitting Secured',
    'Construction Started',
    'Construction Complete',
    'Operational',
    'Sold'
  ];

  const togglePropertyType = (type: PropertyType) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  const toggleProjectStage = (stage: ProjectStage) => {
    if (selectedProjectStages.includes(stage)) {
      setSelectedProjectStages(selectedProjectStages.filter(s => s !== stage));
    } else {
      setSelectedProjectStages([...selectedProjectStages, stage]);
    }
  };

  const applyFilters = () => {
    // In a real app, you'd pass these filters back to the explore screen
    console.log('Filters:', { selectedPropertyTypes, projectDuration, selectedProjectStages });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Property Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          {propertyTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.checkboxRow}
              onPress={() => togglePropertyType(type)}
            >
              <View style={styles.checkbox}>
                {selectedPropertyTypes.includes(type) && (
                  <Ionicons name="checkmark" size={18} color="#2F5B52" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Project Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Duration</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1 year</Text>
              <Text style={styles.sliderLabel}>30+ years</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              value={projectDuration}
              onValueChange={setProjectDuration}
              minimumTrackTintColor="#2F5B52"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#2F5B52"
            />
          </View>
        </View>

        {/* Project Stage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Stage</Text>
          {projectStages.map((stage) => (
            <TouchableOpacity
              key={stage}
              style={styles.checkboxRow}
              onPress={() => toggleProjectStage(stage)}
            >
              <View style={styles.checkbox}>
                {selectedProjectStages.includes(stage) && (
                  <Ionicons name="checkmark" size={18} color="#2F5B52" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>{stage}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 36,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
  },
  sliderContainer: {
    paddingVertical: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  applyButton: {
    backgroundColor: '#2F5B52',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
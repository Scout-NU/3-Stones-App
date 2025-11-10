import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

type QuestionOption = {
  label: string;
  value: string;
};

type Question = {
  id: number;
  question: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "When making a long-term investment, I plan to keep the money invested for...",
    type: 'single',
    options: [
      { label: "1 - 2 years", value: "1-2" },
      { label: "3 - 4 years", value: "3-4" },
      { label: "5 - 6 years", value: "5-6" },
      { label: "More than 6 years", value: "6+" }
    ]
  },
  {
    id: 2,
    question: "When it comes to investing in stocks I would describe myself as...",
    type: 'single',
    options: [
      { label: "Inexperienced", value: "inexperienced" },
      { label: "Somewhat inexperienced", value: "somewhat-inexperienced" },
      { label: "Somewhat experienced", value: "somewhat-experienced" },
      { label: "Experienced", value: "experienced" }
    ]
  },
  {
    id: 3,
    question: "My current and future income sources are...",
    type: 'single',
    options: [
      { label: "Unstable", value: "unstable" },
      { label: "Somewhat stable", value: "somewhat-stable" },
      { label: "Stable", value: "stable" },
      { label: "Very stable", value: "very-stable" }
    ]
  },
  {
    id: 4,
    question: "Select the type of real estate investments that interest you...",
    type: 'multiple',
    options: [
      { label: "Commercial Real Estate", value: "commercial" },
      { label: "Residential Real Estate", value: "residential" },
      { label: "Development Real Estate", value: "development" },
      { label: "Land Speculation", value: "land" }
    ]
  }
];

export default function InvestorQuestionnaireScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const question = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  const handleSingleSelect = (value: string) => {
    setAnswers({
      ...answers,
      [question.id]: value
    });
  };

  const handleMultipleSelect = (value: string) => {
    const currentAnswers = (answers[question.id] as string[]) || [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(v => v !== value)
      : [...currentAnswers, value];
    
    setAnswers({
      ...answers,
      [question.id]: newAnswers
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to the tabs screen or next screen after quiz
      router.push('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      router.back();
    }
  };

  const handleSaveForLater = () => {
    // Save progress and navigate to tabs or home
    // You might want to save the answers to AsyncStorage here
    router.push('/(tabs)');
  };

  const isAnswered = () => {
    if (question.type === 'single') {
      return !!answers[question.id];
    } else {
      const multiAnswers = answers[question.id] as string[];
      return multiAnswers && multiAnswers.length > 0;
    }
  };

  const isOptionSelected = (value: string) => {
    if (question.type === 'single') {
      return answers[question.id] === value;
    } else {
      const multiAnswers = (answers[question.id] as string[]) || [];
      return multiAnswers.includes(value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back Button and Progress Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress + 25}%` }]} />
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Last but not least!</Text>
        <Text style={styles.subtitle}>
          Take a second to answer questions to better understand you as an investor.
        </Text>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardScrollContent}>
            {/* Question Header with Number */}
            <View style={styles.questionHeader}>
              <Text style={styles.questionText}>{question.question}</Text>
              <Text style={styles.questionNumber}>{currentQuestion + 1}/{questions.length}</Text>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {question.options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    isOptionSelected(option.value) && styles.optionButtonSelected
                  ]}
                  onPress={() => 
                    question.type === 'single' 
                      ? handleSingleSelect(option.value)
                      : handleMultipleSelect(option.value)
                  }
                >
                  <Text style={[
                    styles.optionText,
                    isOptionSelected(option.value) && styles.optionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  <View style={[
                    question.type === 'single' ? styles.radioButton : styles.checkbox,
                    isOptionSelected(option.value) && (question.type === 'single' ? styles.radioButtonSelected : styles.checkboxSelected)
                  ]}>
                    {isOptionSelected(option.value) && (
                      question.type === 'single' 
                        ? <View style={styles.radioButtonInner} />
                        : <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Spacer to push buttons to bottom */}
            <View style={styles.spacer} />

            {/* Bottom Buttons */}
            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity onPress={handleSaveForLater}>
                <Text style={styles.saveForLaterText}>Save for later</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.nextButton, !isAnswered() && styles.nextButtonDisabled]}
                onPress={handleNext}
                disabled={!isAnswered()}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
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
    paddingTop: 20,
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
    marginBottom: 30,
    lineHeight: 20,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: -24,
  },
  cardScrollContent: {
    flexGrow: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    lineHeight: 24,
    flex: 1,
    paddingRight: 10,
  },
  questionNumber: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 12,
  },
  optionButtonSelected: {
    backgroundColor: '#FFF',
    borderColor: '#2F5B52',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    color: '#000',
    fontWeight: '500',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#2F5B52',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2F5B52',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#2F5B52',
    borderColor: '#2F5B52',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },
  bottomButtonsContainer: {
    paddingTop: 20,
  },
  saveForLaterText: {
    fontSize: 16,
    color: '#2F5B52',
    textAlign: 'center',
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#2F5B52',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D0D0D0',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
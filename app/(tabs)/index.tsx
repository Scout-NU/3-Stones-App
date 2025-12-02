import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Header */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome 👋</ThemedText>
        <ThemedText type="default">Your quick actions and recent items live here.</ThemedText>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Quick Actions</ThemedText>
        <View style={styles.actionsRow}>
          <Link href="/profile" asChild>
            <Pressable style={styles.actionButton}>
              <ThemedText type="defaultSemiBold">Open Profile</ThemedText>
            </Pressable>
          </Link>
          <Link href="/explore" asChild>
            <Pressable style={styles.actionButton}>
              <ThemedText type="defaultSemiBold">Explore</ThemedText>
            </Pressable>
          </Link>
        </View>
      </ThemedView>

      {/* Highlights */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Highlights</ThemedText>
        <ThemedText>
          • Customize your profile in the <ThemedText type="defaultSemiBold">Profile</ThemedText> tab.
        </ThemedText>
        <ThemedText>
          • Learn what’s included in this starter in <ThemedText type="defaultSemiBold">Explore</ThemedText>.
        </ThemedText>
      </ThemedView>

      {/* Placeholder for future content */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Recent Activity</ThemedText>
        <ThemedText>No recent activity yet. Make some changes to see them here.</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    gap: 6,
    marginBottom: 12,
  },
  card: {
    gap: 8,
    marginTop: 12,
    paddingVertical: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
});


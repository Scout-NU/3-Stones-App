import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen: React.FC = () => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canContinue = useMemo(() => {
    if (step === "email") return /.+@.+\..+/.test(email.trim());
    return password.trim().length >= 6; // simple demo rule
  }, [step, email, password]);

  const onNext = () => {
    if (step === "email" && canContinue) {
      setStep("password");
    } else if (step === "password" && canContinue) {
      // Submit credentials here
      console.log("Login with:", { email, password });
    }
  };

  const goBack = () => {
    if (step === "password") setStep("email");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.headerRow}>
            {step === "password" ? (
              <TouchableOpacity
                onPress={goBack}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.headerIconArea}
              >
                <Text style={styles.headerIconText}>◀︎</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Close"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.headerIconArea}
              >
                <Text style={styles.headerIconText}>×</Text>
              </TouchableOpacity>
            )}
            <View style={styles.headerIconArea} />
          </View>

          {/* Brand welcome */}
          <View style={styles.welcomeBlock}>
            <Text style={styles.welcomeSmall}>Welcome to</Text>
            <Text style={styles.brand}>3 Stones</Text>
          </View>

          {step === "email" ? (
            <View>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                returnKeyType="next"
                onSubmitEditing={onNext}
              />

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity style={styles.oauthBtn} onPress={() => {}}>
                <Text style={styles.oauthText}>🟦 Sign in with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} onPress={() => {}}>
                <Text style={styles.oauthText}>⬛️ Sign in with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.link}>Forgot Login?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.emailPillWrap}>
                <Text style={styles.emailPillText}>{email}</Text>
                <Text style={styles.emailPillEdit}> ✎</Text>
              </View>

              <TextInput
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                returnKeyType="go"
                onSubmitEditing={onNext}
              />

              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={[styles.link, { alignSelf: "center", marginTop: 8 }]}
                >
                  Forgot Login?
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.nextBtn, !canContinue && styles.nextBtnDisabled]}
            onPress={onNext}
            disabled={!canContinue}
            accessibilityRole="button"
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  card: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    minHeight: 680,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  headerIconArea: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIconText: {
    fontSize: 18,
    color: "#1f3a37",
  },
  back: {
    fontSize: 18,
    color: "#1f3a37",
    width: 24,
    textAlign: "left",
  },
  pageTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
  welcomeBlock: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  welcomeSmall: {
    fontSize: 18,
    fontWeight: "600",
    color: "#243b37",
  },
  brand: {
    fontSize: 40,
    fontWeight: "800",
    color: "#243b37",
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d8e1df",
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#e6ecea",
    flex: 1,
  },
  dividerText: {
    color: "#a0adab",
    fontSize: 12,
  },
  oauthBtn: {
    borderWidth: 1,
    borderColor: "#1f3a37",
    borderRadius: 16,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  oauthText: {
    color: "#1f3a37",
    fontWeight: "600",
  },
  link: {
    color: "#1f3a37",
    textAlign: "center",
    marginTop: 12,
    textDecorationLine: "underline",
  },
  emailPillWrap: {
    alignSelf: "center",
    backgroundColor: "#e7f1ef",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  emailPillText: {
    color: "#1f3a37",
    fontWeight: "600",
  },
  emailPillEdit: {
    color: "#1f3a37",
    marginLeft: 4,
  },
  nextBtn: {
    backgroundColor: "#1f3a37",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    opacity: 1,
  },
  nextBtnDisabled: {
    backgroundColor: "#c8cfcd",
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LoginScreen;

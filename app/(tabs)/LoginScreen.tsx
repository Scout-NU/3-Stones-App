import React, { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const googleIcon = require("../../assets/images/Google_SSO_Icon.png");
const appleIcon = require("../../assets/images/Apple_SSO_Icon.png");
const closeIcon = require("../../assets/images/close.png");
const editIcon = require("../../assets/images/edit.png");
const backIcon = require("../../assets/images/Back_Button.png");
const errorIcon = require("../../assets/images/error_outline.png");

const LoginScreen: React.FC = () => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const canContinue = useMemo(() => {
    if (step === "email") return /.+@.+\..+/.test(email.trim());
    return password.trim().length >= 6; // simple demo rule
  }, [step, email, password]);

  const onNext = () => {
    // reset errors on attempt
    setEmailError(false);
    setPasswordError(false);

    // Always validate first, even when Next is grayed out
    if (step === "email") {
      if (!/.+@.+\..+/.test(email.trim())) {
        setEmailError(true);
        return;
      }
      setStep("password");
      return;
    }

    if (step === "password") {
      if (password.trim().length < 6) {
        setPasswordError(true);
        return;
      }
    }
  };

  const goBack = () => {
    if (step === "password") setStep("email");
    setPasswordError(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="interactive"
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
                <Image source={backIcon} style={styles.headerIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Close"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.headerIconArea}
              >
                <Image source={closeIcon} style={styles.headerIcon} />
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
                placeholderTextColor="#DDDDDD"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (emailError && /.+@.+\..+/.test(t.trim()))
                    setEmailError(false);
                }}
                style={[styles.input, emailError && styles.inputError]}
                returnKeyType="next"
                onSubmitEditing={onNext}
                onBlur={() => {
                  if (!/.+@.+\..+/.test(email.trim())) {
                    setEmailError(true);
                  }
                }}
              />
              {emailError && (
                <View style={styles.errorRow}>
                  <Image source={errorIcon} style={styles.errorIcon} />
                  <Text style={styles.errorText}>
                    Invalid username or password
                  </Text>
                </View>
              )}

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity
                style={styles.oauthBtn}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Continue with Google"
              >
                <View style={styles.oauthBtnContent}>
                  <Image source={googleIcon} style={styles.oauthIcon} />
                  <Text style={styles.oauthText}>Continue with Google</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.oauthBtn}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Continue with Apple"
              >
                <View style={styles.oauthBtnContent}>
                  <Image source={appleIcon} style={styles.oauthIcon} />
                  <Text style={styles.oauthText}>Continue with Apple</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.link}>Forgot Login?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.emailPillWrap}>
                <Text style={styles.emailPillText}>{email}</Text>
                <Image source={editIcon} style={styles.emailPillEditIcon} />
              </View>

              <TextInput
                placeholder="Password"
                placeholderTextColor="#DDDDDD"
                secureTextEntry
                textContentType="password"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (passwordError && t.trim().length >= 6)
                    setPasswordError(false);
                }}
                style={[styles.input, passwordError && styles.inputError]}
                returnKeyType="go"
                onSubmitEditing={onNext}
                onBlur={() => {
                  if (password.trim().length < 6) {
                    setPasswordError(true);
                  }
                }}
              />
              {passwordError && (
                <View style={styles.errorRow}>
                  <Image source={errorIcon} style={styles.errorIcon} />
                  <Text style={styles.errorText}>
                    Invalid username or password
                  </Text>
                </View>
              )}

              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={[styles.link, { alignSelf: "center", marginTop: 8 }]}
                >
                  Forgot Login?
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Pressable
            style={[styles.nextBtn, !canContinue && styles.nextBtnDisabled]}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => {
              if (!canContinue) {
                if (step === "email") {
                  setEmailError(true);
                } else {
                  setPasswordError(true);
                }
                return;
              }
              onNext();
            }}
            accessibilityRole="button"
          >
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: "#FAFAFC",
    padding: 16,
  },
  card: {
    flexGrow: 1,
    backgroundColor: "#FAFAFC",
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
    paddingLeft: 12,
    paddingRight: 24,
    paddingVertical: 24,
    marginBottom: 12,
  },
  headerIconArea: {
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerIconText: {
    fontSize: 18,
    color: "#282828",
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
    fontSize: 24,
    fontFamily: "NunitoSans_700Bold",
    color: "#000000",
  },
  brand: {
    fontSize: 48,
    fontFamily: "NunitoSans_800ExtraBold",
    color: "#000000",
    paddingBottom: 32,
    marginBottom: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    fontSize: 18,
    fontFamily: "SourceSans3_400Regular",
    color: "#727272",
    marginBottom: 12,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    flex: 1,
    marginBottom: 12,
  },
  dividerText: {
    color: "#DDDDDD",
    fontSize: 12,
    fontFamily: "SourceSans3_600SemiBold",
    marginBottom: 12,
  },
  oauthBtn: {
    borderWidth: 1,
    borderColor: "#285852",
    borderRadius: 50,
    height: 40,
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 24,
  },
  oauthBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  oauthIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  oauthText: {
    color: "#285852",
    fontWeight: "600",
  },
  link: {
    color: "#285852",
    textAlign: "center",
    marginTop: 60,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
  },
  emailPillWrap: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#285852",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  emailPillText: {
    color: "#285852",
    fontWeight: "600",
  },
  emailPillEdit: {
    color: "#285852",
    marginLeft: 4,
  },
  emailPillEditIcon: {
    width: 16,
    height: 16,
    marginLeft: 4,
    resizeMode: "contain",
    tintColor: "#285852",
  },
  nextBtn: {
    backgroundColor: "#285852",
    height: 42,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    opacity: 1,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
  },
  nextBtnDisabled: {
    backgroundColor: "#c8cfcd",
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "NunitoSans_700Bold",
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  inputError: {
    borderColor: "#D32246",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    marginBottom: 8,
    paddingLeft: 2,
  },
  errorIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: "#D32246",
  },
  errorBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D32246",
    alignItems: "center",
    justifyContent: "center",
  },
  errorBadgeMark: {
    color: "#D32246",
    fontSize: 12,
    lineHeight: 12,
    textAlign: "center",
    includeFontPadding: false,
    fontFamily: "SourceSans3_600SemiBold",
  },
  errorText: {
    color: "#D32246",
    fontSize: 16,
    fontFamily: "SourceSans3_400Regular",
  },
});

export default LoginScreen;

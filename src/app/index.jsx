import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IP_ADDRESS } from "../config";

const backgroundImage = require("../../assets/images/background.png");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setshowPassword] = useState("false");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(`${IP_ADDRESS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //   Alert.alert("Success", data.message);
        router.replace("/(tabs)/dashboard");
      } else {
        //    Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert(
        "Connection Error",
        "Could not reach the server. Make sure your laptop server is running.",
      );
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        cover
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>PhastCare</Text>
            <View style={styles.card}>
              <Text style={styles.Emaillabel}>Email</Text>
              <TextInput
                style={styles.EmailInput}
                placeholder="Enter your email"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.Passwordlabel}>Password</Text>
              <TextInput
                style={styles.PasswordInput}
                placeholder="Enter your password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={{ alignSelf: "flex-end", marginTop: 5 }}
                onPress={() => setshowPassword(!showPassword)}
              >
                <Text style={{ color: "#492fae" }}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Touch} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.forgot}>Forgot your password?</Text>

              <Text style={styles.forgot}>Don't have an account?</Text>
              <Link href="/registering" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Register</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e1e2d",
    marginBottom: 20,
  },
  Emaillabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  EmailInput: {
    backgroundColor: "#edf2f7",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 20,
    color: "#1e1e2d",
  },
  Passwordlabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  PasswordInput: {
    backgroundColor: "#edf2f7",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 20,
    color: "#1e1e2d",
  },
  Touch: {
    marginTop: 60,
    backgroundColor: "#492fae",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    padding: 8,
    fontSize: 15,
    color: "#fff",
  },
  forgot: {
    fontSize: 12,
    color: "#020202",
    padding: 12,
  },
  link: {
    color: "#492fae",
    fontWeight: "bold",
  },
});

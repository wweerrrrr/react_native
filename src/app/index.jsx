import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "../components/AppText";
import { IP_ADDRESS } from "../config";

const backgroundImage = require("../../assets/images/background.png");
const logo = require("../../assets/images/logo .png");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setshowPassword] = useState(false);

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
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Customer Feedback System</Text>
            <View style={styles.card}>
              <Text style={styles.cardlabel}>Log into your account</Text>
              <Text style={styles.cardlabel2}>Enter your credentials</Text>
              <Text style={styles.Emaillabel}>Email</Text>
              <TextInput
                style={styles.EmailInput}
                placeholder="name@gmail.com"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.Passwordlabel}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.PasswordInput}
                  placeholder="Password"
                  placeholderTextColor="#6b7280"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setshowPassword(!showPassword)}
                >
                  <Text style={styles.toggleText}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.Touch} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.forgot}>Forgot your password?</Text>

              <Text style={styles.forgot2}>
                Don't have an account?{" "}
                <Link href="/registering" style={styles.link}>
                  Register
                </Link>
              </Text>
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
  cardlabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1e2d",
    marginBottom: 10,
  },
  cardlabel2: {
    fontSize: 14,
    color: "#1e1e2d",
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    padding: 15,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1e2d",
    marginBottom: 20,
  },
  Emaillabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    paddingVertical: 10,
  },
  EmailInput: {
    borderWidth: 0.5,
    borderColor: "#040404",
    borderRadius: 9,
    padding: 20,
    color: "#1e1e2d",
  },
  Passwordlabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    paddingVertical: 10,
  },
  Touch: {
    marginTop: 40,
    backgroundColor: "#710196",
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
    fontSize: 14,
    color: "#020202",
    marginTop: 10,
  },
  link: {
    fontSize: 14,
    color: "#710196",
    fontFamily: "Sora_600SemiBold",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#040404",
    borderRadius: 9,
    paddingHorizontal: 16,
  },
  PasswordInput: {
    flex: 1,
    paddingVertical: 20,
    color: "#1e1e2d",
  },
  toggleText: {
    color: "#710196",
    fontWeight: "bold",
  },
  forgot2: {
    fontSize: 14,
    color: "#020202",
    marginTop: 10,
  },
});

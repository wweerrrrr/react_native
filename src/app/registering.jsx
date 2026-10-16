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

export default function RegisterScreen() {
  //State variables to capture typed text
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [showPassword, setshowPassword] = useState("false");

  //Function to call your  backend
  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${IP_ADDRESS}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
        router.push("/");
      } else {
        Alert.alert("Registration Failed", data.message);
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
            <Text style={styles.title}>PhastCare</Text>
            <View style={styles.card}>
              <Text style={styles.FirstNamelabel}>First Name</Text>
              <TextInput
                style={styles.FirstNameinput}
                placeholder="Enter your firstname"
                placeholderTextColor="#94a3b8"
                value={firstName}
                onChangeText={setFirstName}
              />

              <Text style={styles.LastNamelabel}>Last Name</Text>
              <TextInput
                style={styles.LastNameinput}
                placeholder="Enter your lastname"
                placeholderTextColor="#94a3b8"
                value={lastName}
                onChangeText={setLastName}
              />
              <Text style={styles.Emaillabel}>Email</Text>
              <TextInput
                style={styles.Emailinput}
                placeholder="Enter your Email"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.Passwordlabel}>Password</Text>
              <TextInput
                style={styles.Passwordinput}
                placeholder="Enter your Password"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={{ alignSelf: "flex-end", marginTop: 5 }}
                onPress={() => setshowPassword(!showPassword)}
              >
                <Text style={{ color: "#492fae" }}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
              <Text style={styles.ConfirmPasswordlabel}>Confirm Password</Text>
              <TextInput
                style={styles.ConfirmPasswordinput}
                placeholder="Confirm your Password"
                placeholderTextColor="#94a3b8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.Touch} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Link href="/" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Login</Text>
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
    backgroundColor: "#f8f9fe",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e1e2d",
  },
  card: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  FirstNamelabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  FirstNameinput: {
    backgroundColor: "#edf2f7",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 20,
    color: "#1e1e2d",
  },
  LastNamelabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  LastNameinput: {
    backgroundColor: "#edf2f7",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 20,
    color: "#1e1e2d",
  },
  Emaillabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  Emailinput: {
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
  Passwordinput: {
    backgroundColor: "#edf2f7",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 20,
    color: "#1e1e2d",
  },
  ConfirmPasswordlabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  ConfirmPasswordinput: {
    backgroundColor: "#edf2f7",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 20,
    color: "#1e1e2d",
  },
  Touch: {
    marginTop: 80,
    backgroundColor: "#492fae",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 12,
    color: "#020202",
    padding: 12,
  },
  link: {
    color: "#492fae",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import SearchableDropdown from "@/components/SearchableDropdown";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "../../components/AppText";
import { IP_ADDRESS } from "../../config";

const backgroundImage = require("../../../assets/images/background.png");

export default function CreateTicketsScreen() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const [priorities, setPriorities] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");

  useEffect(() => {
    const API_URL = `${IP_ADDRESS}`;

    fetch(`${API_URL}/clients`)
      .then((res) => res.json())
      .then((data) => setClients(data.options))
      .catch((err) => console.error("Clients fetch failed:", err));

    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.options))
      .catch((err) => console.error("Categories fetch failed:", err));

    fetch(`${API_URL}/channels`)
      .then((res) => res.json())
      .then((data) => setChannels(data.options))
      .catch((err) => console.error("Channels fetch failed:", err));

    fetch(`${API_URL}/priorities`)
      .then((res) => res.json())
      .then((data) => setPriorities(data.options))
      .catch((err) => console.error("Priorities fetch failed:", err));

    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.options))
      .catch((err) => console.error("Products fetch failed:", err));
  }, []);

  const handleCreateTicket = async () => {
    if (
      !customerName ||
      !customerPhoneNumber ||
      !selectedClient ||
      !selectedCategory ||
      !selectedChannel ||
      !selectedPriority ||
      !selectedProduct
    ) {
      Alert.alert("Error", "Please enter all fields.");
      return;
    }

    // TODO: send the ticket to your backend here
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Create Tickets</Text>

            <View style={styles.card}>
              <Text style={styles.groupHeading}>Customer Information</Text>
              <Text style={styles.label}>Customer Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Customer name"
                placeholderTextColor="#6b7280"
                value={customerName}
                onChangeText={setCustomerName}
              />

              <Text style={styles.label}>Customer Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#6b7280"
                value={customerPhoneNumber}
                onChangeText={setCustomerPhoneNumber}
                keyboardType="phone-pad"
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
              />

              <Text style={styles.label}>Client</Text>
              <SearchableDropdown
                label="Client"
                options={clients}
                selectedValue={selectedClient}
                onSelect={setSelectedClient}
              />

              <Text style={styles.label}>Category</Text>
              <SearchableDropdown
                label="Category"
                options={categories}
                selectedValue={selectedCategory}
                onSelect={setSelectedCategory}
              />

              <Text style={styles.label}>Channel</Text>
              <SearchableDropdown
                label="Channel"
                options={channels}
                selectedValue={selectedChannel}
                onSelect={setSelectedChannel}
              />

              <Text style={styles.label}>Priority</Text>
              <SearchableDropdown
                label="Priority"
                options={priorities}
                selectedValue={selectedPriority}
                onSelect={setSelectedPriority}
              />

              <Text style={styles.label}>Product</Text>
              <SearchableDropdown
                label="Product"
                options={products}
                selectedValue={selectedProduct}
                onSelect={setSelectedProduct}
              />

              <TouchableOpacity
                style={styles.Touch}
                onPress={handleCreateTicket}
              >
                <Text style={styles.buttonText}>Create Ticket</Text>
              </TouchableOpacity>
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1e2d",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    paddingVertical: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#040404",
    borderRadius: 9,
    padding: 20,
    color: "#1e1e2d",
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
    fontSize: 15,
    color: "#fff",
  },
  groupHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1e2d",
    marginBottom: 10,
    marginTop: 20,
  },
});

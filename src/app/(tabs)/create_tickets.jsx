import SearchableDropdown from "@/components/SearchableDropdown";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
    const API_URL = "http://192.168.68.121:3000";

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
  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Create Tickets</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <Text style={styles.customersNameLabel}>Customer Name:</Text>
                  <TextInput
                    style={styles.customersNameInput}
                    placeholder="Enter customer name"
                    placeholderTextColor="#010102"
                    value={customerName}
                    onChangeText={setCustomerName}
                  />
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.customersPhoneNumberLabel}>
                    Customers Phone:{" "}
                  </Text>
                  <TextInput
                    style={styles.customersPhoneNumberInput}
                    placeholder="Enter customers phone number"
                    placeholderTextColor="#f0f1f3"
                    value={customerPhoneNumber}
                    onChangeText={setCustomerPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <Text style={styles.customersNameLabel}>Client</Text>
              <SearchableDropdown
                label="Client"
                options={clients}
                selectedValue={selectedClient}
                onSelect={setSelectedClient}
              />
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <Text style={styles.customersNameLabel}>Category</Text>
                  <SearchableDropdown
                    label="Category"
                    options={categories}
                    selectedValue={selectedCategory}
                    onSelect={setSelectedCategory}
                  />
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.customersNameLabel}>Channel</Text>
                  <SearchableDropdown
                    label="Channel"
                    options={channels}
                    selectedValue={selectedChannel}
                    onSelect={setSelectedChannel}
                  />
                </View>
              </View>

              <Text style={styles.customersNameLabel}>Priority</Text>
              <SearchableDropdown
                label="Priority"
                options={priorities}
                selectedValue={selectedPriority}
                onSelect={setSelectedPriority}
              />
              <Text style={styles.customersNameLabel}>Product</Text>
              <SearchableDropdown
                label="Product"
                options={products}
                selectedValue={selectedProduct}
                onSelect={setSelectedProduct}
              />

              {/*  <Picker
                  selectedValue={selectedClient}
                  onValueChange={(Value) => setSelectedClient(Value)}
                >
                  <Picker.Item label="Select Client" value="" />
                  <Picker.Item label="3M&C" value="3M&C" />
                  <Picker.Item label="ADB" value="ADB" />
                  <Picker.Item label="COY25" value="COY25" />
                  <Picker.Item label="COY6" value="COY6" />
                  <Picker.Item
                    label="KUMASI FOUNDATION"
                    value="KUMASI FOUNDATION"
                  />
                </Picker>  */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e1e2d",
  },
  card: {
    width: "90%",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  customersNameLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  customersPhoneNumberLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1e2d",
    padding: 10,
  },
  customersPhoneNumberInput: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    color: "#1e1e2d",
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },

  rowItem: {
    flex: 1,
    marginRight: 10,
  },
  customersNameInput: {
    backgroundColor: "#edf2f7",
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderRadius: 5,
    padding: 20,
    paddingHorizontal: 30,
    fontSize: 16,
    color: "#1e1e2d",
    overflow: "hidden",
  },
});

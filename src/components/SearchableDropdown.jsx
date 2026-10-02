import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SearchableDropdown({
  label,
  options,
  selectedValue,
  onSelect,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View>
      <TouchableOpacity style={styles.field} onPress={() => setOpen(!open)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.fieldText}>
            {selectedValue || `Select ${label}`}
          </Text>
          <Text style={{ color: "#94a3b8", fontSize: 16 }}>
            {open ? "▴" : "▾"}
          </Text>
        </View>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <TextInput
            placeholder="Search page options..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            autoFocus
          />
          <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled>
            {filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.option}
                onPress={() => {
                  onSelect(item.name);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  fieldText: {
    color: "#1e1e2d",
    fontSize: 15,
  },
  dropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
    maxHeight: 280,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    padding: 12,
    margin: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
});

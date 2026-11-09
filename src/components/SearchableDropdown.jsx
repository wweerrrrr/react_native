import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Text, TextInput } from "./AppText";

const MENU_MAX_HEIGHT = 240;

export default function SearchableDropdown({
  label = "",
  options,
  selectedValue,
  onSelect,
}) {
  const list = Array.isArray(options) ? options : [];
  const triggerRef = useRef(null);
  const { height: screenHeight } = useWindowDimensions();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const showSearch = list.length > 7;
  const filtered = search
    ? list.filter((opt) =>
        opt.name.toLowerCase().includes(search.toLowerCase()),
      )
    : list;

  const openMenu = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setPos({ x, y, width, height });
      setSearch("");
      setOpen(true);
    });
  };

  const closeMenu = () => setOpen(false);

  const choose = (name) => {
    onSelect(name);
    closeMenu();
  };

  // Open upward if there isn't room below the field
  const opensUp = pos.y + pos.height + MENU_MAX_HEIGHT + 24 > screenHeight;
  const menuPosition = opensUp
    ? { bottom: screenHeight - pos.y + 4 }
    : { top: pos.y + pos.height + 4 };

  return (
    <>
      <Pressable
        ref={triggerRef}
        collapsable={false}
        onPress={openMenu}
        style={[styles.field, open && styles.fieldOpen]}
      >
        <Text
          style={selectedValue ? styles.valueText : styles.placeholderText}
          numberOfLines={1}
        >
          {selectedValue || `Select ${label.toLowerCase()}`}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#6b7280"
        />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
        <View
          style={[
            styles.dropdown,
            { left: pos.x, width: pos.width },
            menuPosition,
          ]}
        >
          {showSearch && (
            <TextInput
              placeholder="Search"
              placeholderTextColor="#6b7280"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              autoCapitalize="none"
            />
          )}
          <ScrollView
            style={{ maxHeight: MENU_MAX_HEIGHT }}
            keyboardShouldPersistTaps="handled"
          >
            {filtered.length === 0 ? (
              <Text style={styles.empty}>No options</Text>
            ) : (
              filtered.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => choose(item.name)}
                  style={({ pressed }) => [
                    styles.option,
                    (item.name === selectedValue || pressed) &&
                      styles.optionActive,
                  ]}
                >
                  <Text style={styles.optionText}>{item.name}</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#040404",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  fieldOpen: {
    borderColor: "#710193",
  },
  placeholderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
    marginRight: 8,
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#1e1e2d",
    marginRight: 8,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#1e1e2d",
    marginBottom: 6,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  optionActive: {
    backgroundColor: "#f1f3f4",
  },
  optionText: {
    fontSize: 14,
    color: "#1e1e2d",
  },
  empty: {
    fontSize: 14,
    color: "#6b7280",
    padding: 12,
  },
});

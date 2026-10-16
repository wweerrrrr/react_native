import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.name}>Madison</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Support Staff</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatCard value="—" label="Opened" />
          <StatCard value="—" label="Resolved" />
          <StatCard value="—" label="Assigned" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F6F5" },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: "700", color: "#11292E" },

  header: { alignItems: "center", marginTop: 24 },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#0E5A63",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#FFFFFF", fontSize: 28, fontWeight: "700" },
  name: { marginTop: 12, fontSize: 22, fontWeight: "700", color: "#11292E" },
  roleBadge: {
    marginTop: 6,
    paddingHorizontal: 12,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#DDEFEF",
    justifyContent: "center",
  },
  roleText: { fontSize: 12, fontWeight: "600", color: "#0A4A52" },

  statsRow: { flexDirection: "row", gap: 10, marginTop: 20 },
  statCard: {
    flex: 1,
    height: 80,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DCE5E4",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  statValue: { fontSize: 22, fontWeight: "700", color: "#0E5A63" },
  statLabel: { fontSize: 12, fontWeight: "500", color: "#53686C" },
});

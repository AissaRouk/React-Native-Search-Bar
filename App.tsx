import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Akcijos from "./Akcijos";
import SearchBar from "./SearchBar";

export default function App() {
  const [searchResult, setSearchResult] = useState<readonly any[] | null>();

  return (
    <SafeAreaView style={styles.container}>
      {/* SearchBar */}
      <SearchBar
        border={true}
        placeholder="Search"
        data={Akcijos}
        onSearchResultsChange={(result) => setSearchResult(result)}
      />
      {/* Render search results */}
      <ScrollView contentContainerStyle={styles.resultContainer}>
        {searchResult?.map((item) => (
          <View style={styles.resultItemView} key={item.id}>
            <Text style={styles.resultItemText}>{item.name}</Text>
            <Text style={{ color: "red" }}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  resultContainer: {
    flex: 1,
    marginTop: 20,
  },
  resultItemView: { flexDirection: "row" },
  resultItemText: { marginHorizontal: 10 },
});

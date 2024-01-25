import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Akcijos from "./Akcijos";
import SearchBar from "./SearchBar";

export default function App() {
  const [text, setText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<readonly any[] | null>();

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        border={true}
        placeholder="Search"
        data={Akcijos}
        onSearchResultsChange={(result) => setSearchResult(result)}
      />
      <ScrollView contentContainerStyle={styles.resultContainer}>
        {searchResult?.map((item) => (
          <Text key={item.id} style={styles.resultItem}>
            {item.name}
          </Text>
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
    // borderColor: "black",
    // borderWidth: 1,
  },
  resultItem: {},
});

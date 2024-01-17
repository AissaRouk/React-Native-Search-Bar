import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import Akcijos from './Akcijos';

export default function App() {

  const [text, setText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<(readonly any[] | null)>()


  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <SearchBar textInputProps={{placeholder: "hola", onChangeText: (s) => setText(s)}} data={Akcijos} onSearchResultsChange={(data) => setSearchResult(data)} />
      <View style={{borderColor: "black", borderWidth: 1}}>
        {searchResult?.map((item) => <Text id={item.id}>{item.name}</Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
    borderColor: "black"
  },
});

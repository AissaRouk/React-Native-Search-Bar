import { useEffect, useState } from "react";
import { useMiniSearch } from "react-minisearch";
import {
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  Text,
  TextInputProps,
} from "react-native";

interface SearchBarProps {
  border?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  textInputProps?: TextInputProps;
  data: readonly any[]; // change this to madatory later
  onChangeText?: (text: string) => void;
  onSearchResultsChange: (searchResult: readonly any[] | null) => void;
}

export default function SearchBar({
  border = true,
  containerStyles,
  textInputProps,
  onChangeText,
  data,
  onSearchResultsChange
}: SearchBarProps): JSX.Element {
  //text introduced in the search bar
  const [text, setText] = useState<string>("");

  //minisearch engine
  const { autoSuggest, suggestions, removeAll, addAll, clearSuggestions, search, searchResults, clearSearch } =
    useMiniSearch(data, {
      // search through the 'name' field
      //change this if required
      fields: ["name"],
      idField: "id",
      // allow options of error typing
      searchOptions: {
        prefix: true,
        fuzzy: true,
      },
      // same errors
      autoSuggestOptions: {
        prefix: true,
        fuzzy: true,
      },
    });

  //update data when changes
  useEffect(() => {
    removeAll();
    if (data) {
      addAll(data);
    }
  }, [data]);

  //suggest everytime the text changes
  useEffect(() => {
    if (text) autoSuggest(text);
    else clearSuggestions()
  }, [text]);

  //update the resultChange to the user
  useEffect(()=> {
    onSearchResultsChange(searchResults);
  }, [searchResults])

  //handle when clicking on the enter button
  const handleOnBlur = () => {
    if (!text) return 1;
    clearSuggestions();
    //search
    search(text);
  };


  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          maxHeight: 30,
          width: 150,
        },
        containerStyles,
      ]}
    >
      <TextInput
        style={[
          border && {
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            paddingHorizontal: 10,
          },
        ]}
        // All other props that the user puts
        {...textInputProps}

        onChangeText={(s) => 
          setText(s)
        }
        // When clicked enter
        onBlur={() => 
          handleOnBlur() // Your onBlur function
        }
      />
      {/* show suggestions */}
      {suggestions &&
        suggestions.map((item) => (
          <Text key={item.suggestion}>
            {item.suggestion}
          </Text>
        ))}
    </View>
  );
}

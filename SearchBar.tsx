import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useMiniSearch } from "react-minisearch";
import sortResultsByPrice from "./sortFunction";

// Defining types of props
interface SearchBarProps {
  border?: boolean;
  placeholder?: string;
  data: readonly any[];
  onSearchResultsChange?: (searchResult: readonly any[] | null) => void;
  autofocus?: boolean;

  // Additional customization props
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  placeholderTextColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  suggestionBoxStyle?: StyleProp<ViewStyle>;
  fontSize?: number;
  clearIcon?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  border = false,
  placeholder = "Search",
  data,
  autofocus = false,
  onSearchResultsChange,
  backgroundColor = "white",
  textColor = "black",
  borderColor = "black",
  borderWidth = 1,
  borderRadius = 7,
  placeholderTextColor = "grey",
  inputStyle,
  suggestionBoxStyle,
  fontSize = 16,
  clearIcon,
  onFocus,
  onBlur,
}: SearchBarProps) {
  // State for managing suggestions visibility
  const [showSuggestions, setShowSuggestions] = useState(false);

  // State for saving sorted search results
  const [sortedSearchResults, setSortedSearchResults] = useState<any[]>([]);

  // MiniSearch hook for handling search functionality
  const {
    autoSuggest,
    suggestions,
    clearSuggestions,
    search,
    searchResults,
    removeAll,
    addAll,
  } = useMiniSearch(data, {
    fields: ["name"],
    idField: "id",
    searchOptions: {
      prefix: true,
      fuzzy: true,
    },
    autoSuggestOptions: {
      prefix: true,
      fuzzy: true,
    },
  });

  // State for the text introduced in the searchBar
  const [searchValue, setSearchValue] = useState("");

  // Show suggestions every time the text changes
  const onChangeText = (text: string) => {
    setSearchValue(text);
    if (!text) {
      setShowSuggestions(false);
      clearSuggestions();
      return;
    }
    autoSuggest(text);
    setShowSuggestions(true);
  };

  // Search when clicked enter (onBlur) in the searchBar
  const handleOnBlur = () => {
    if (searchValue) {
      clearSuggestions();
      search(searchValue);
      setShowSuggestions(false);
      onBlur && onBlur();
    }
  };

  // Function to handle pressing on one of the suggestions
  const handleOnSuggestionPress = (item: any) => {
    // Save the value
    setSearchValue(item.suggestion);
    // Clear the suggestions
    setShowSuggestions(false);
    clearSuggestions();
    // Search for the result
    search(item.suggestion);
  };

  // Do something when the results change
  useEffect(() => {
    // Update MiniSearch data when data prop changes
    if (data) {
      removeAll();
      addAll(data);
    }
  }, [data]);

  // Do something when the results change
  useEffect(() => {
    // Sort the results by price order
    if (searchResults) {
      setSortedSearchResults(sortResultsByPrice(searchResults));
      onSearchResultsChange && onSearchResultsChange(searchResults);
    }
  }, [searchResults]);

  return (
    <View>
      {/* Search bar container */}
      <View
        style={[
          styles.searchbarView,
          styles.searchBarMargins,
          styles.searchBarBackground,
          border && styles.searchBarBorder,
          showSuggestions && {
            borderBottomEndRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomWidth: 0,
          },
          {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
          },
        ]}
      >
        {/* Search bar text input */}
        <TextInput
          style={[
            styles.searchBarText,
            inputStyle,
            { color: textColor, fontSize: fontSize },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={searchValue}
          onChangeText={onChangeText}
          blurOnSubmit={true}
          onBlur={() => {
            handleOnBlur();
          }}
          onFocus={() => {
            setShowSuggestions(true);
            onFocus && onFocus();
          }}
          autoFocus={autofocus}
        />
        {/* Clear icon */}
        {clearIcon && (
          <TouchableOpacity onPress={() => setSearchValue("")}>
            {clearIcon}
          </TouchableOpacity>
        )}
      </View>

      {/* Conditional rendering of line based on showSuggestions */}
      {showSuggestions && (
        <View style={[styles.line, { marginHorizontal: 25 }]}></View>
      )}

      {/* Suggestions container */}
      {showSuggestions && (
        <View
          style={[
            styles.searchBarMargins,
            styles.searchBarBackground,
            styles.searchBarBorder,
            suggestionBoxStyle,
            {
              borderTopWidth: 0,
              borderTopStartRadius: 0,
              borderTopEndRadius: 0,
              paddingBottom: 5,
            },
          ]}
        >
          {/* Render suggestions */}
          {suggestions &&
            suggestions.map((item) => (
              <TouchableOpacity
                style={[styles.suggestionItem]}
                onPress={() => handleOnSuggestionPress(item)}
                key={item.suggestion}
              >
                <Text style={[styles.searchBarText, { fontSize: fontSize }]}>
                  {item.suggestion}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  searchbarView: {
    overflow: "hidden",
    height: 35,
    marginTop: 30,
    borderColor: "black",
    borderWidth: 1,
    minWidth: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBarBackground: {
    backgroundColor: "white",
  },
  searchBarMargins: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  searchBarBorder: {
    borderRadius: 7,
  },
  searchBarText: {
    flex: 1,
    color: "black",
  },
  line: { borderBottomWidth: 0.2, borderColor: "grey" },
  suggestionItem: {
    height: 20,
  },
});

# React Native SearchBar Component

A simple and customizable search bar component for React Native.
Overview

The SearchBar component provides a flexible search input with suggestions for React Native applications. It's designed to be easily integrated into your project, allowing users to perform searches efficiently.
Features

- Search Suggestions: Display suggestions as the user types for a user-friendly experience.
- Customizable: Easily customize the appearance of the search bar to match your app's design.
- Search Result Handling: Retrieve and handle search results effortlessly.

## How to Use

### Installation

Copy and paste the contents of SearchBar.tsx into your React Native project.
Basic Usage

```jsx

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from './path-to/SearchBar';

const YourComponent = () => {
  const [searchResult, setSearchResult] = useState<readonly any[] | null>();

  return (
    <View>
      <SearchBar
        placeholder="Search"
        data={yourDataArray}
        onSearchResultsChange={(result) => setSearchResult(result)}
      />
      {searchResult?.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

export default YourComponent;
```

### Props

- **border** (optional, default: false): Show/hide the border around the search bar.
- **placeholder** (optional, default: "Search"): Placeholder text for the search bar.
- **data** (required): An array of data to search through.
- **onSearchResultsChange** (optional): Callback function triggered when search results change.
- **autofocus** (optional, default: false): Autofocus the search bar on component mount.
- **backgroundColor** (optional, default: "white"): Background color of the search bar.
- **textColor** (optional, default: "black"): Text color of the search bar.
- **borderColor** (optional, default: "black"): Border color of the search bar.
- **borderWidth** (optional, default: 1): Border width of the search bar.
- **borderRadius** (optional, default: 7): Border radius of the search bar.
- **placeholderTextColor** (optional, default: "grey"): Text color of the placeholder.
- **inputStyle** (optional): Additional style for the input.
- **suggestionBoxStyle** (optional): Additional style for the suggestion box.
- **fontSize** (optional, default: 16): Font size of the text in the search bar.
- **clearIcon** (optional): Custom component to clear the search input.
- **onFocus** (optional): Callback function triggered when the search bar gains focus.
- **onBlur** (optional): Callback function triggered when the search bar loses focus.

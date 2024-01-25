import {
  StyleSheet, Platform,
  StatusBar,
} from 'react-native';

export const stylesSheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alingItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
});
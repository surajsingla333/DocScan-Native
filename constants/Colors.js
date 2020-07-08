// import { withSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from 'react-native';

export default {
  primary: '#333D79FF',
  accent: '#FAEBEFFF',

  SET_COLOR: Platform.OS === 'android' ? '#333D79FF' : '#FAEBEFFF',
  SET_COLOR_INVERSE: Platform.OS === 'android' ? '#FAEBEFFF' : '#333D79FF',
}

// linear-gradient(-45deg, 0%, 100%)
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const getFlattenedStyles = styles => StyleSheet.flatten(styles);

const useStyleSheetFlatten = ([...styles]) => {
  const flattenedStyles = useMemo(() => getFlattenedStyles(styles), [styles]);

  return flattenedStyles;
};

export default useStyleSheetFlatten;

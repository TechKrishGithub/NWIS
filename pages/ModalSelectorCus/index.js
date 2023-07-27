import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector-searchable';
import styles from './style';

const ModalSelectorCus = ({ data,field, initValue, onChange, value,myBorder, myText }) => {
  const handleChange = option => {
    onChange(option.label);
  };

  const uniqueLabels = Array.from(new Set(data.map(item => item[field])));
  return (
    <View style={{margin:5}}>
    <ModalSelector
     data={uniqueLabels.map((label, index) => ({ key: index, label }))} 
      // data={data.map((region, index) => ({
      //   key: index,
      //   label: region,
      // }))}
      initValue={initValue}
      initValueTextStyle={{color: "black"}}
      selectStyle={{borderColor: "black"}}
      selectTextStyle={{color: "green"}}
      onChange={handleChange}
      animationType="fade"
      scrollViewAccessibilityLabel={'Scrollable options'}
      cancelButtonAccessibilityLabel={'Cancel Button'}
      style={myBorder?styles.border:styles.dropdownContainer}
      optionTextStyle={styles.dropdownOptionText}
      cancelStyle={styles.dropdownCancel}
      cancelTextStyle={styles.dropdownCancelText}
      searchStyle={styles.searchInput} // Style the search input as needed
    >
      <TextInput
        style={[styles.inputCell]}
        value={value}
        mode='outlined'
        placeholder={initValue}
        placeholderTextColor={myText?myText:'#ccc'}
        editable={false}
        label={initValue}
      />
    </ModalSelector>
    </View>
  );
};

export default ModalSelectorCus;

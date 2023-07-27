import { MultiSelect } from 'react-native-element-dropdown';
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import styles from './style';

export const MultiSelectCust=({data,selected,setSelected})=>
{
          const renderDataItem = (item) => {
        
            const check=selected.some(v=>v==item.value);
            return (
                <View style={styles.item}>
                    <Text style={[styles.selectedTextStyle]}>{item.label}</Text>
                    {check&&<AntDesign name="checkcircle" size={18} color="blue" style={styles.icon}/>}
                    
                </View>
            );
        };
      
  return(
    <View style={styles.container}>
<MultiSelect
style={styles.dropdown}
placeholderStyle={styles.placeholderStyle}
selectedTextStyle={styles.selectedTextStyle}
inputSearchStyle={styles.inputSearchStyle}
maxHeight={180}
iconStyle={styles.iconStyle}
data={data}
labelField="label"
valueField="value"
placeholder="Type of Inspection"
value={selected}
search
searchPlaceholder="Search Type of Inspection..."
onChange={item => {setSelected(item)}}
renderLeftIcon={() => (
    <Feather name="inbox" size={20} color="black"  style={styles.icon}/>
)}
renderItem={renderDataItem}
renderSelectedItem={(item, unSelect) => (
    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
        <View style={styles.selectedStyle}>
            <Text style={styles.textSelectedStyle}>{item.label}</Text>
            <AntDesign color="red" name="delete" size={17} />
        </View>
    </TouchableOpacity>
)}
/>
</View>
  )      
}

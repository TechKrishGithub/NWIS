import React from "react";
import {View,Text} from 'react-native';
import { TextInput } from "react-native-paper";

const TextFocusInput=({lable,myValue,value,disabled,keyboardType})=>
{
    const handleChange=(text)=>
    {
        if(keyboardType=='numeric')
        {
        const sanitizedText = text.replace(/^0+/, '');
            
        // Allow only one decimal point
        if (sanitizedText.indexOf('.') !== -1 && text.slice(-1) === '.') {
          // Check if the input already contains a second decimal point
          const decimalIndex = sanitizedText.indexOf('.');
          const secondDecimalIndex = sanitizedText.indexOf('.', decimalIndex + 1);
          
          if (secondDecimalIndex !== -1) {
            // If a second decimal point is found, do not update the input value
            return;
          }
      }
      myValue(text)
    }
   
      else
      {
        myValue(text)
      }
      
    }
    return(
        <View style={{margin:10}}>
        <TextInput
        label={lable}
        placeholder={lable}
        placeholderTextColor="#ccc"
        mode='outlined'
        style={{backgroundColor:'#fff'}}
        value={value}
        onChangeText={(text)=>handleChange(text)}
        disabled={disabled}
        keyboardType={keyboardType}
        
        />
        </View>
    )
}

export default TextFocusInput;
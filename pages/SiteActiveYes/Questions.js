import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './style';

const Questions=(props)=>
{
    const {
        question,
        accessGranted,
        setAccessGranted
    }=props

    const handleYesClick = () => {
        setAccessGranted(true);
      };
    
      const handleNoClick = () => {
        setAccessGranted(false);
        // Perform any actions or logic for denying access
      };
    
    return(
        <View>
            <View style={styles.AuthYesCon}>
       <View style={{width:'50%'}}>
      <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, accessGranted && styles.selectedButton]}
          onPress={handleYesClick}
          disabled={accessGranted}
        >
          <Text style={[styles.buttonText, accessGranted && styles.selectedButtonText]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !accessGranted && styles.unSelectedButton]}
          onPress={handleNoClick}
          disabled={!accessGranted}
        >
          <Text style={[styles.buttonText, !accessGranted && styles.selectedButtonText]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
        </View>
    )
}

export default Questions;
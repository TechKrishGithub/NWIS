import React,{useState,useEffect} from "react";
import {View,Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from "react-native-paper";
import moment from 'moment';


const TimePicker=({label,selectedTime,setSelectedTime})=>
{
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleTimeChange = (_, selectedTime) => {
        const currentTime = selectedTime || new Date();
        // const formattedTime = moment(currentTime).format('HH:mm')
        setSelectedTime(currentTime);
        setShowTimePicker(false);
       
      };

    return(
        <View>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{margin:10}}>
            <TextInput
            label={label}
            value={selectedTime.toLocaleTimeString()}
            mode="outlined"
            readOnly
            style={{backgroundColor:'#fff'}}
            right={<TextInput.Icon icon="clock" color="#888" onPress={() => setShowTimePicker(true)}/>}
            />
        </TouchableOpacity>
          
        {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="spinner"
          TextInput={TextInput}
          onChange={handleTimeChange}
        />
      )}

        </View>
    )
}

export default TimePicker;
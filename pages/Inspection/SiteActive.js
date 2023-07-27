import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import TextFocusInput from '../TextFocusInput';
import { selectData } from '../../constants/DataBaseHandle';

const SiteActive = ({wetDetails,navigation,activeData,siteNotActive,setSiteNotActive,accessGranted,setAccessGranted}) => {
  const [ifSiteActive,SetIfSiteActive]=useState('');

  const handleYesClick = () => {
    setAccessGranted(true);
    navigation.navigate('Site Active',{wetDetails:wetDetails})
  };
  const myAccess=activeData?.length>0?true:false;

  selectData('SiteActiveDev').then(data=>
    {
      if(data)
      {
        const filter=data.filter(v=>v.planId==wetDetails[0].planid);
        setAccessGranted(filter.length>0?true:false)
      }
    })



  const handleNoClick = () => {
    setAccessGranted(false);
    // Perform any actions or logic for denying access
  };

  return (
    <View style={{
      borderColor:'#888',
      borderWidth:1,
      borderRadius:5,
      margin:10,
    }}>
    <View style={{
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center',
         padding:10,
         marginBottom:10
    }}>
       <View style={{width:'50%'}}>
      <Text style={styles.questionText}>Is site active ?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button,( accessGranted || myAccess ) && styles.selectedButton]}
          onPress={handleYesClick}
          disabled={accessGranted || myAccess}
        >
          <Text style={[styles.buttonText, (accessGranted || myAccess) && styles.selectedButtonText]}>Yes</Text>
        </TouchableOpacity>
      {!myAccess&&
       <TouchableOpacity
       style={[styles.button, !accessGranted && styles.unSelectedButton]}
       onPress={handleNoClick}
       disabled={!accessGranted}
     >
       <Text style={[styles.buttonText, !accessGranted && styles.selectedButtonText]}>No</Text>
     </TouchableOpacity>
      }

    {myAccess &&
     <TouchableOpacity
     style={[styles.button,{backgroundColor:'blue'}]}
     onPress={()=>{navigation.navigate('Site Active',{wetDetails:wetDetails,activeData:activeData})}}
   >
     <Text style={[styles.buttonText,{color:'white'}]}>Edit</Text>
   </TouchableOpacity>
    }
       
      </View>
    </View>
    
    {/* <TextFocusInput
  lable="(Yes)Provide on Going Activities Onsite"
  myValue={SetIfSiteActive}
  value={ifSiteActive}
  disabled={!accessGranted}
  /> */}

  <TextFocusInput
  lable="If (NO)What were The Previous Activities Onsite"
  myValue={setSiteNotActive}
  value={siteNotActive}
  disabled={accessGranted||myAccess}
  />

    </View>
  
  );
};

export default SiteActive;

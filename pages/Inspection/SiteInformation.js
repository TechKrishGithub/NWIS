import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,ScrollView,Image,Alert,Modal} from 'react-native';
import TextFocusInput from "../TextFocusInput";
import SiteActive from "./SiteActive";
import styles from "./style";
import { Button } from 'react-native-elements';
import ModalSelectorCus from "../ModalSelectorCus";
import { getLocationAsync } from "../LocalGps";
import { InsertData, selectData, deleteFromTable } from "../../constants/DataBaseHandle";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const SiteInformation=({route,navigation})=>
{
  const { wetDetails, checkSaved } = route.params;

   const [WetlandSection,setWetlandSection]=useState('');
   const [WetlandSystem,setWetlandSystem]=useState('');
   const [ApproximateSizeOfWetlandSystem,setApproximateSizeOfWetlandSystem]= useState('');
   const [Vilage,setVilage]=useState('');
   const [SubCountry,setSubCountry]=useState('');
   const [Region,setRegion]=useState('');
   const [Municipality,setMunicipality]=useState('');
   const [District,setDistrict]=useState('');
   const [City,setCity]=useState('');
   const [remarks,setRemarks]=useState('');
   const [recommendations,setRecommendations]=useState('');
   const [Easting,setEasting]=useState('');
   const [Northing,setNorthing]=useState('');
   const [error,setError]=useState('');
   const [success,setSuccess]=useState('');
   const [loading,setLoading]=useState(false);
   const [activeData,setActiveData]=useState(null);
   const [noSiteActive,setNoSiteActive]=useState('');
   const [siteStat,setSiteStat]=useState(false);
   const [LoadForEdit,setLoadForEdit]=useState(false);


   useEffect(()=>
   {
    getLocationAsync(setEasting,setNorthing);
    if(checkSaved.length>0)
    {
     setLoadForEdit(true);
      GetData();
    }
   },[])

   useFocusEffect(
    React.useCallback(() => {
      if(!checkSaved.length>0)
      {
        selectData('SiteActiveDev').then(data=>setActiveData(data?.filter(v=>v.planId==wetDetails[0].planid)));
        
      }
      
    }, [])
  );

   const GetData=()=>
   {
    selectData('SiteActiveDev').then(data=>setActiveData(data?.filter(v=>v.planId==wetDetails[0].planid)));
    selectData('SiteBasicInfo').then(data=>
      {
        const filteredData=data?.find(v=>v.planId==wetDetails[0].planid);
        if(filteredData)
        {
          SetData(filteredData)
        }
      }
      )
   }

   const handleUpdate=async () =>
   {
    switch ('') {
      case WetlandSection:
        setError('Please enter Wetland Section');
        break;
      case WetlandSystem:
         setError('Please enter Wetland System');
         break;
      case ApproximateSizeOfWetlandSystem:
        setError('Please enter Approximate Size of Wetland System');
        break;
      case Region:
        setError('Please enter Region');
        break;
      case District:
        setError('Please enter District');
        break;
      case Vilage:
        setError('Please enter County');
        break;
      case SubCountry:
        setError('Please enter SubCountry');
        break;
      case Municipality:
        setError('Please enter Parish');
        break;
      case City:
        setError('Please enter City');
        break;
      case remarks:
        setError('Please enter Remarks');
        break;
      case recommendations:
        setError('Please enter Recommendations');
        break;
      default:
        // If all fields are filled, show success message
        setError('');
        setLoading(true);
        myUpdate();
      break;
  };
 
   }

   const myUpdate=async () =>
   {
    try { 
      const isDeleted=deleteFromTable('SiteBasicInfo','planId = ?', [wetDetails[0].planid]);
        if(isDeleted)
          {
            InsertMyData();
          }
    } catch (error) {
      console.error(error);
    }
   }



   const SetData=(filteredData)=>
   {
    setWetlandSystem(filteredData.wetlandSystem);
    setWetlandSection(filteredData.wetlandSection);
    setApproximateSizeOfWetlandSystem(filteredData.appSizeOfSyst);
    setRegion(filteredData.region);
    setDistrict(filteredData.district);
    setVilage(filteredData.county);
    setSubCountry(filteredData.subCounty);
    setMunicipality(filteredData.parish);
    setCity(filteredData.city);
    setRemarks(filteredData.remarks);
    setRecommendations(filteredData.recommendations);
    setEasting(filteredData.east);
    setNorthing(filteredData.north);
    setNoSiteActive(filteredData.SiteActiveNo);
    setTimeout(()=>
    {
      setLoadForEdit(false);
    },1000)
   }

   const handleSubmit = () => {
    selectData('GeneralInfo').then(data=>{
      const filteredData=data.some(v=>v.planId==wetDetails[0].planid)
      if(filteredData)
      {
      switch ('') {
        case WetlandSection:
          setError('Please enter Wetland Section');
          break;
        case WetlandSystem:
           setError('Please enter Wetland System');
           break;
        case ApproximateSizeOfWetlandSystem:
          setError('Please enter Approximate Size of Wetland System');
          break;
        case Region:
          setError('Please enter Region');
          break;
        case District:
          setError('Please enter District');
          break;
        case Vilage:
          setError('Please enter County');
          break;
        case SubCountry:
          setError('Please enter SubCountry');
          break;
        case Municipality:
          setError('Please enter Parish');
          break;
        case City:
          setError('Please enter City');
          break;
        case !siteStat && noSiteActive:
          setError('Please enter Previous Activites');
          break;
        case remarks:
          setError('Please enter Remarks');
          break;
        case recommendations:
          setError('Please enter Recommendations');
          break;
        default:
          // If all fields are filled, show success message
          setError('');
         setLoading(true);
        InsertMyData();
        break;
    };
  }
  else
  {
    
    Alert.alert('Apologies','Sorry Please Save General Information !');
  }
});
  };

  const InsertMyData=()=>
  {
    const dataInsert={
      typeofProccess:'Inspection',
      planId:wetDetails[0].planid,
      wetlandSection:WetlandSection,
      wetlandSystem:WetlandSystem,
      appSizeOfSyst:ApproximateSizeOfWetlandSystem,
      east:Easting,
      north:Northing,
      region:Region,
      district:District,
      county:Vilage,
      subCounty:SubCountry,
      parish:Municipality,
      city:City,
      SiteActiveNo:noSiteActive,
      remarks:remarks,
      recommendations:recommendations
    }
    console.log(dataInsert)
    InsertData('SiteBasicInfo',dataInsert)
    setSuccess('Data Submitted Successfully !')
    setTimeout(()=>
    {
      setLoading(false);
      navigation.navigate('Dashboard')
    },2000)
  }




return(
<ScrollView  style={styles.Container} keyboardShouldPersistTaps='always'>

       <Modal 
          visible={LoadForEdit}      
          animationType="fade"
          transparent={true}
          >
         <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:"rgba(0,0,0,0.5)"}}>
          <ActivityIndicator size="small" color="white"/>
          <Text style={{color:'white'}}>Loading ...</Text>
        </View>
         </Modal>

  {/* {checkSaved&&
    <View style={styles.container}>
    <Text style={styles.title}>Note</Text>
    <Text style={styles.content}>Sorry Data Already Saved On this Plan !</Text>
  </View>
  } */}
  <TextFocusInput
  lable="Wetland Section"
  myValue={setWetlandSection}
  value={WetlandSection}
  />
  
  <TextFocusInput
  lable="Wetland System"
  myValue={setWetlandSystem}
  value={WetlandSystem}
  />
  
  <TextFocusInput
  lable="Approximate Size Of Wetland System/Section(KM)"
  myValue={setApproximateSizeOfWetlandSystem}
  value={ApproximateSizeOfWetlandSystem}
  />


  <Text style={styles.CoorLabel}>Coordinates</Text>

  <View style={styles.coordinates}>

<View style={{width:'50%'}}>

  <TextFocusInput
  lable="Easting"
  myValue={setEasting}
  value={Easting}
  keyboardType="numeric"
  />

  </View>

  <View style={{width:'50%'}}>
  <TextFocusInput
  lable="Northing"
  myValue={setNorthing}
  value={Northing}
  keyboardType="numeric"
  />
  </View>

</View>

         <ModalSelectorCus
              data={wetDetails}
              initValue="Region"
              onChange={setRegion}
              value={Region}
              myBorder='#888'
              myText='black'
              field='region'
            />
            <ModalSelectorCus
              data={wetDetails}
              initValue="District"
              onChange={setDistrict}
              value={District}
              myBorder='#888'
              myText='black'
              field='district'
            />
            <ModalSelectorCus
              data={wetDetails}
              initValue="County"
              onChange={setVilage}
              value={Vilage}
              myBorder='#888'
              myText='black'
              field='county'
            />
            <ModalSelectorCus
              data={wetDetails}
              initValue="SubCounty"
              onChange={setSubCountry}
              value={SubCountry}
              myBorder='#888'
              myText='black'
              field='subcounty'
            />

            <ModalSelectorCus
              data={wetDetails}
              initValue="Parish"
              onChange={setMunicipality}
              value={Municipality}
              myBorder='#888'
              myText='black'
              field='parish'
            />

             <TextFocusInput
                lable="City"
                myValue={setCity}
                value={City}
             />

<Text style={styles.CoorLabel}>Site Is Active</Text>

 <SiteActive 
 navigation={navigation} 
 wetDetails={wetDetails}
 activeData={activeData} 
 siteNotActive={noSiteActive} 
 setSiteNotActive={setNoSiteActive}
 accessGranted={siteStat}
 setAccessGranted={setSiteStat}
 />

 <TextFocusInput
  lable="Remarks"
  myValue={setRemarks}
  value={remarks}
  />

<TextFocusInput
  lable="Recommendations"
  myValue={setRecommendations}
  value={recommendations}
  />

  {error&&
  <Text style={{margin:10,color:'red'}}>{error}</Text>
  }
  {success&&
  <Text style={{margin:10,color:'green'}}>{success}</Text>
  }
  {
    loading?
    <View style={{flex:1,justifyContent:'center',alignItems:'center',margin:10}}>
    <ActivityIndicator color="blue" size="small" />
    <Text>saving ....</Text>
    </View>
    :
    !checkSaved.length>0 &&
    <Button
    title="Submit"
    onPress={handleSubmit}
    buttonStyle={{ backgroundColor: '#4caf50', margin:10 }}
    containerStyle={{ marginBottom:20 }}
  />
  
  }

  {checkSaved.length>0 &&
  <Button
  title="Update"
  onPress={handleUpdate}
  buttonStyle={{ backgroundColor: '#4caf50', margin:10 }}
  containerStyle={{ marginBottom:20 }}
/>
  
  }
  
 
        </ScrollView>
    )
}

export default SiteInformation;
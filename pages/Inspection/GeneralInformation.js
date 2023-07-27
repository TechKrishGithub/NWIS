 import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal
  }
  from "react-native"
import TextFocusInput from '../TextFocusInput';
import styles from './style';
import React,{useState,useEffect} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import data from '../../constants'
import TimePicker from '../TimePicker';
import InspectionOfficerTable from './InspectionOfficerTable';
import EppuOfficerTable from './EppuOfficer';
import { Button } from 'react-native-elements';
import { selectData, InsertData, deleteFromTable } from '../../constants/DataBaseHandle';
import { Time,myDate } from '../ChangeDateTime';
import { useFocusEffect } from "@react-navigation/native";
import { MultiSelectCust } from "../MultSelectCus";





  const GeneralInformation=({route,navigation})=>{
    
    const { wetDetails, checkSaved } = route.params;

    useFocusEffect(React.useCallback(() => {if(!checkSaved){GetData()}}, []));

    useEffect(()=>{setMyLoad(true);GetData()},[]);



    const GetData=()=>
    {
      selectData('GeneralInfo').then(data=>{
        const filteredData=data.find(v=>v.planId==wetDetails[0].planid)
        if(filteredData)
        {
          SetMyData(filteredData);
          setUpdate(true);
        }
      });
      selectData('InspectionOfficer').then(data=>
        {
          const filteredData=data.filter(v=>v.planId==wetDetails[0].planid) 
          if(filteredData.length>0)
          {
            SetIns(filteredData);
          }
          setMyLoad(false);
        });
    }


    const [dateBeClosed, setDateBeClosed] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [VehicleNumber,setVehicleNumber]=useState('');
    const [textInputValue, setTextInputValue] = useState([]);
    const [InspOff,setInspOff]=useState([{index:'',officer: '',role: '',region: '',district: '',country: '',subCountry: '',parish: '',village: ''}]);
    const [EppuOff,setEppuOff]=useState([{index:'',officer: '',role: '',region: '',district: '',country: '',subCountry: '',parish: '',village: ''}]);
    const [error,setError]=useState('');
    const [saving,setSaving]=useState(false);
    const [success,setSuccess]=useState('');
    const [disabled,setDisabled]=useState(false);
    const [myLoad,setMyLoad]=useState(false);
    const [update,setUpdate]=useState(false);

    const SetMyData=(savedData)=>
    {
      if(savedData)
      {
        console.log(savedData)
        setDateBeClosed(new Date(myDate(savedData.dateOfInpsection)));
        setStartTime( new Date(Time(savedData.startTime)));
        setEndTime(new Date(Time(savedData.endTime)));
        setVehicleNumber(savedData.vehicleNumber);
        const keys = savedData.typeOfInspection.split(",");
        setTextInputValue(keys)
      }
    }



    const SetIns=(my)=>
    {
      const InspDet=my.filter(v=>v.officerType=='InspectionOfficer');
      const EppuDet=my.filter(v=>v.officerType=='EPPUOfficer');
      Inset(InspDet,setInspOff);
      Inset(EppuDet,setEppuOff);
    }

    const Inset=(data,Object)=>
    {
      const filteredData = data.map(item => ({
        index: item.id,
        officer: item.officer,
        role: item.role,
        region: item.region,
        district: item.district,
        country: item.county,
        subCountry: item.subCounty,
        parish: item.parish,
        village: item.village,
      }));
      Object(filteredData)
    }


  const handleUpdate=async()=>
  {
    try { 
      
      const isDeleted = await deleteFromTable('GeneralInfo','planId = ?', [wetDetails[0].planid]);
       if(isDeleted)
         {
          const isSecDel=deleteFromTable('InspectionOfficer','planId = ?', [wetDetails[0].planid]);
          if(isSecDel)
          {
            handleSave();
          }
         }
   } catch (error) {
     console.error(error);
   }
  }


const handleSavef=()=>
{
  navigation.navigate('Active')
}

  const handleSave= () => {
     setError('');
    if(VehicleNumber=='')
    {
      setError('Please Enter Vehicle Number !')
    }
    else
    {
      if(textInputValue.length==0)
      {
        
        setError('Please Select Type of Inspection !')
        return;
      }
      if(checkData(InspOff)==''&&checkData(EppuOff)=='')
      {
        setSaving(true);
        setError('');
        const dataToInsert = {
          typeofProccess: 'Inspection',
          planId: wetDetails[0].planid,
          dateOfInpsection: dateBeClosed.toLocaleDateString(),
          startTime: startTime.toLocaleTimeString(),
          endTime: endTime.toLocaleTimeString(),
          vehicleNumber: VehicleNumber,
          typeOfInspection: textInputValue.toString(),
        };
        
        InsertData('GeneralInfo', dataToInsert)
          .then(async (resultSet) => {
            try {
              const Insp = await InsertToInsp(InspOff, 'InspectionOfficer');
              if (Insp) {
                const res = await InsertToInsp(EppuOff, 'EPPUOfficer');
                if (res) {
                  setSuccess('Data Saved Successfully !');
                  setTimeout(() => {
                    setSaving(false);
                    setDisabled(true);
                    navigation.navigate('SiteInformation');
                  }, 1000);
                }
                else {setError('Sorry Something wrong please try Again !')}
              }
              else {setError('Sorry Something wrong please try Again !')}
            } catch (error) {
              console.error('Error:', error);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        
      }
      else
      {
        checkData(InspOff)!==''?setError('Inspection Officer '+checkData(InspOff)):checkData(EppuOff)!==''?setError('EPPU Officer '+checkData(EppuOff)):'';
      }
    }
   
  };



  const InsertToInsp = (object, type) => {
    return new Promise((resolve, reject) => {
      const insertPromises = object.map((v) => {
        const dataToInsert = {
          typeofProccess: 'Inspection',
          planId: wetDetails[0].planid,
          officerType: type,
          officer: v.officer,
          role: v.role,
          region: v.region,
          district: v.district,
          county: v.country,
          subCounty: v.subCountry,
          parish: v.parish,
          village: v.village,
        };
        return InsertData('InspectionOfficer', dataToInsert);
      });
  
      Promise.all(insertPromises)
        .then((results) => {
          console.log('All data inserted:', results);
          resolve(true);
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
          reject(false);
        });
    });
  };
  

  const checkData=(data)=>
  {
    const lastRow = data[data.length - 1];
    let errorMessage = '';
    switch (true) {
      case lastRow.officer === '':
        errorMessage = 'Please enter Officer!';
        break;
      case lastRow.role === '':
        errorMessage = 'Please enter Role!';
        break;
      case lastRow.region === '':
        errorMessage = 'Please enter Region!';
        break;
      case lastRow.district === '':
        errorMessage = 'Please enter District!';
        break;
      case lastRow.country === '':
        errorMessage = 'Please enter Country!';
        break;
      case lastRow.subCountry === '':
        errorMessage = 'Please enter Sub Country!';
        break;
      case lastRow.parish === '':
        errorMessage = 'Please enter Parish!';
        break;
      case lastRow.village === '':
        errorMessage = 'Please enter Village!';
        break;
      default:
        errorMessage = '';
        // If all required fields are filled, proceed to update the rows state
    return '';
    }
    return errorMessage;
  }



    const handleDateChange = (event, selectedDate) => {
      setShowPicker(false);
      if (selectedDate) {
        setDateBeClosed(selectedDate);
      }
    };


    return(
      
        <ScrollView style={styles.Container}  keyboardShouldPersistTaps="always">
         <Modal 
          visible={myLoad}      
          animationType="fade"
          transparent={true}
          >
         <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:"rgba(0,0,0,0.5)"}}>
          <ActivityIndicator size="small" color="white"/>
          <Text style={{color:'white'}}>Loading ...</Text>
        </View>
         </Modal>
        <View style={styles.Container}>

        <TouchableOpacity   onPress={() => setShowPicker(true)} >
         <TextInput
         label="Date of Inspection"
         value={dateBeClosed.toLocaleDateString()}
         mode='outlined'
         style={{backgroundColor:'#fff'}}
         readOnly
         right={<TextInput.Icon icon="calendar" onPress={() => setShowPicker(true)}/>}
         />
      
       </TouchableOpacity>
       </View>
  
             {showPicker && (
         <DateTimePicker
           testID="DatePicker"
           value={dateBeClosed}
           mode="date"
           minimumDate={new Date()}
           display="default"
           onChange={handleDateChange}
         />
  
       )}    
  


  <TimePicker
  label="Start Time"
  setSelectedTime={setStartTime}
  selectedTime={startTime}
  />
  
  <TimePicker
  label="End Time"
  setSelectedTime={setEndTime}
  selectedTime={endTime}
  />

  <InspectionOfficerTable wetDetails={wetDetails} setRows={setInspOff} rows={InspOff}/>

  <EppuOfficerTable wetDetails={wetDetails} setRows={setEppuOff} rows={EppuOff}/>
  
  <TextFocusInput
  lable="Vehicle Number"
  myValue={setVehicleNumber}
  value={VehicleNumber}
  />


        <View style={{margin:10}}>
         <MultiSelectCust data={data.TypeOfInsp} selected={textInputValue} setSelected={setTextInputValue} />
         </View>

      {error&&(
        <Text style={{color:'red',margin:5}}>{error}</Text>
      )}

      {success&&(
        <Text style={{color:'green',margin:10}}>{success}</Text>
      )}

      {saving&&
      (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <ActivityIndicator size="small" color='blue'/>
        </View>
      )
      }
  {!(saving || checkSaved.length>0 || update) ? (
        <Button
          title="Save"
          onPress={handleSave}
          buttonStyle={{ backgroundColor: '#1e88e5', margin: 10 }}
          containerStyle={{  marginTop: 20,marginBottom: 20 }}
          disabled={disabled}
        />
      ) : 
      ( checkSaved || update ) &&
      <Button
      title="Update"
      onPress={handleUpdate}
      buttonStyle={{ backgroundColor: '#1e88e5', margin: 10 }}
      containerStyle={{ marginTop: 20,marginBottom: 20 }}
    />
      }
     
  </ScrollView>
 
  
  
    )
  }

  
  export default GeneralInformation;
  
  
  
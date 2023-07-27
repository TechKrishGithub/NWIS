import React, { useEffect } from "react";
import {View,Text,StyleSheet, TextInput,TouchableOpacity, Alert,Button,Image} from 'react-native';
import {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../../NWisDb";
import logo from '../../assets/logo-removebg-preview.png'
import wiselogo from '../../assets/wiselogo.png';
import styles from "./style";
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import { ActivityIndicator } from "react-native-paper";
import { createTable,InsertData } from "../../constants/DataBaseHandle";
import * as Location from "expo-location";


const Login=({navigation})=>
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [success,setSuccess]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

    
useEffect(()=>
{
  setSuccess('');
  setError('');
  setLoading(false);
    getData();
    createTables();
    setTimeout(()=>
    {
      getData();
    },500)

},[]);

useEffect(()=>
{
  getLocPer();
},[])

const getLocPer=async ()=>
{
  let { status } = await Location.requestForegroundPermissionsAsync();
  status !=='granted' ? await Location.requestForegroundPermissionsAsync() : console.log('Permission to access location success');
}


const createTables=()=>
{
  const USER_MASTER_COLUMNS = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT' },{ name: 'username', type: 'TEXT' },{ name: 'password', type: 'TEXT' },{ name: 'userid', type: 'INTEGER' },{ name: 'token', type: 'VARCHAR' }];
  const GET_FIELDOFFICER_PLAN_DETAILS_COLUMNS = [{ name: 'activitystatus', type: 'VARCHAR' },{ name: 'allchked_remarks', type: 'VARCHAR' },{ name: 'btnval', type: 'VARCHAR' },{ name: 'color', type: 'VARCHAR' },{ name: 'createdby', type: 'VARCHAR' },{ name: 'createddate', type: 'DATETIME' },{ name: 'createdname', type: 'VARCHAR' },{ name: 'fieldesignation', type: 'VARCHAR' },{ name: 'fieldteamid', type: 'VARCHAR' },{ name: 'fromdate', type: 'DATETIME' },{ name: 'monitoring', type: 'VARCHAR' },{ name: 'observation', type: 'VARCHAR' },{ name: 'officername', type: 'VARCHAR' },{ name: 'officername_desk', type: 'VARCHAR' },{ name: 'planid', type: 'VARCHAR' },{ name: 'quaterlyid', type: 'VARCHAR' },{ name: 'remarks', type: 'VARCHAR' },{ name: 'remarkstype', type: 'VARCHAR' },{ name: 'rwoofficer', type: 'VARCHAR' },{ name: 'status', type: 'VARCHAR' },{ name: 'todate', type: 'DATETIME' },{ name: 'totalarea', type: 'VARCHAR' },{ name: 'typeofprocess', type: 'VARCHAR' },{ name: 'updateddate', type: 'DATETIME' },{ name: 'wetname', type: 'VARCHAR' }];
  const GET_PLAN_DETAILS_COLUMNS = [{ name: 'typeofprocess', type: 'VARCHAR' },{ name: 'createdname', type: 'VARCHAR' },{ name: 'planid', type: 'INTEGER' },{ name: 'wetland_category', type: 'VARCHAR' },{ name: 'wetland_category_id', type: 'INTEGER' },{ name: 'planwetlandid', type: 'INTEGER' },{ name: 'wet_landid', type: 'INTEGER' },{ name: 'wet_syst', type: 'VARCHAR' },{ name: 'drn_syst', type: 'VARCHAR' },{ name: 'wet_name', type: 'VARCHAR' },{ name: 'region', type: 'VARCHAR' },{ name: 'district', type: 'VARCHAR' },{ name: 'wet_code', type: 'VARCHAR' },{ name: 'county', type: 'VARCHAR' },{ name: 'subcounty', type: 'VARCHAR' },{ name: 'parish', type: 'VARCHAR' },{ name: 'district_2', type: 'VARCHAR' },{ name: 'ftype', type: 'VARCHAR' },{ name: 'district_3', type: 'VARCHAR' },{ name: 'seasonalit', type: 'VARCHAR' },{ name: 'class_name', type: 'VARCHAR' },{ name: 'complexity', type: 'VARCHAR' },{ name: 'shape_leng', type: 'VARCHAR' },{ name: 'area_ha', type: 'VARCHAR' },{ name: 'area_inmsq', type: 'VARCHAR' },{ name: 'easting_x', type: 'VARCHAR' },{ name: 'northing_y', type: 'VARCHAR' },{ name: 'eastings', type: 'VARCHAR' },{ name: 'northings', type: 'VARCHAR' },{ name: 'wetlandid', type: 'VARCHAR' },{ name: 'status', type: 'VARCHAR' }];
  const COLUMN_NAMES_SitInfo = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'wetlandSection', type: 'VARCHAR' },{ name: 'wetlandSystem', type: 'VARCHAR' },{ name: 'appSizeOfSyst', type: 'VARCHAR' },{ name: 'east', type: 'VARCHAR' },{ name: 'north', type: 'VARCHAR' },{ name: 'region', type: 'VARCHAR' },{ name: 'district', type: 'VARCHAR' },{ name: 'county', type: 'VARCHAR' },{ name: 'subCounty', type: 'VARCHAR' },{ name: 'parish', type: 'VARCHAR' },{ name: 'city', type: 'VARCHAR' },{ name: 'SiteActiveNo', type: 'VARCHAR' },{ name: 'remarks', type: 'VARCHAR' },{ name: 'recommendations', type: 'VARCHAR' }]
  const COLUMN_NAMES_GEN = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'dateOfInpsection', type: 'DATETIME' },{ name: 'startTime', type: 'TIME' },{ name: 'endTime', type: 'TIME' },{ name: 'vehicleNumber', type: 'VARCHAR' },{ name: 'typeOfInspection', type: 'VARCHAR' }];
  const COLUMN_NAMES_Off = [{ name: 'id', type: 'INTEGER', constrain: 'PRIMARY KEY AUTOINCREMENT'},{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'officerType', type: 'VARCHAR' },{ name: 'officer', type: 'VARCHAR' },{ name: 'role', type: 'VARCHAR' },{ name: 'region', type: 'VARCHAR' },{ name: 'district', type: 'TIME' },{ name: 'county', type: 'TIME' },{ name: 'subCounty', type: 'VARCHAR' },{ name: 'parish', type: 'VARCHAR' },{ name: 'village', type: 'VARCHAR' }];

  const COLUMN_NAMES_SiteActiveActivites = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'YesActivity', type: 'VARCHAR' }]
  const COLUMN_NAMES_SiteActiveDev = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'Identity', type: 'VARCHAR' },{ name: 'Name', type: 'VARCHAR' },{ name: 'Address', type: 'VARCHAR' }]
  const COLUMN_NAMES_SiteActive_Auth = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'Document', type: 'BLOB' },{ name: 'NameOfDocument', type: 'VARCHAR' },{name:'fileForRetrive'},{type: 'VARCHAR'}]
  const COLUMN_NAMES_SiteActive_Arrests = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'NoOfSus', type: 'INTEGER' },{ name: 'NameOfSusp', type: 'VARCHAR' }]
  const COLUMN_NAMES_SiteActive_PlcCase = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'SDno', type: 'INTEGER' },{ name: 'file', type: 'BLOB' },{name:'fileForRetrive'},{type: 'VARCHAR'}]
  const COLUMN_NAMES_SiteActive_Impounds = [{ name: 'typeofProccess', type: 'VARCHAR' },{ name: 'planId', type: 'INTEGER' },{ name: 'NameOfImpon', type: 'VARCHAR' }]


  createTable('User_Master',USER_MASTER_COLUMNS);
  createTable('GetFieldofficerplandetails',GET_FIELDOFFICER_PLAN_DETAILS_COLUMNS);
  createTable('GetPlanDetails',GET_PLAN_DETAILS_COLUMNS);
  createTable('GeneralInfo', COLUMN_NAMES_GEN);
  createTable('InspectionOfficer', COLUMN_NAMES_Off);
  createTable('SiteBasicInfo',COLUMN_NAMES_SitInfo);
  createTable('SiteActiveActivites',COLUMN_NAMES_SiteActiveActivites);
  createTable('SiteActiveDev',COLUMN_NAMES_SiteActiveDev)
  createTable('SiteActiveAuth',COLUMN_NAMES_SiteActive_Auth)
  createTable('SiteActiveArrests',COLUMN_NAMES_SiteActive_Arrests)
  createTable('SiteActivePlcCase',COLUMN_NAMES_SiteActive_PlcCase)
  createTable('SiteActiveImpounds',COLUMN_NAMES_SiteActive_Impounds)
}



    const getData=async ()=>
    {
        try{
         await AsyncStorage.getItem('Username').then(
            async value=>
            {
                if(value!=null)
                {
                    await AsyncStorage.getItem('Password').then(
                        value=>{
                            if(value!=null)
                            {
                                navigation.replace('PinGeneration');
                            }
                        }
                    )
                }
            }
         )

        }
        catch(error)
        {
            console.log(error);
        }
    }
  
   
    const Validate=async ()=>
    {
     
      const netInfo = await NetInfo.fetch();
      const isConnected = netInfo.isConnected;    
      if (isConnected==false) {
        Alert.alert(
          'No Network Connection',
          'Please connect to a network and try again.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
      else
      {
        try{
          if(username!=''&&password!='')
          { 
        setLoading(true);
        setError('');
        fetch('http://182.18.181.115:8084/api/login/loginservice?username='+username+'&password='+password+'').
        then(response=>response.json()).
        then(responseText=>JSON.parse(responseText)).
        then(async (result)=>{
    
          if(result.length!==0)
          {
            console.log(result[0].userid);
            console.log(result[0].token);
            const hasDetails = await  getWetlandDetails(result[0].userid);
               if (hasDetails) {
                setSuccess('Login Success Please Wait....');
                setLoading(true);
                setTimeout(()=>
                {
                  setLoading(false);
                  setSuccess('');
                },2000)
                await AsyncStorage.setItem('Username',username);
                await AsyncStorage.setItem('Password',password);
                const dataInsert={
                  username:username,
                  password:password,
                  userid:result[0].userid,
                  token:result[0].token
                }
                InsertData('User_Master', dataInsert)
                .then((resultSet) => {
                  console.log(resultSet)
                })
                navigation.navigate('PinGeneration');
                setUsername('');
                setPassword('');
               }
               else
                {
                   setLoading(false);
                   setError('Apologies, no user activity found.');
                 }
  
          }
          else
          {
            // Alert.alert('warning','Username and password wrong');
            setLoading(false)
            setError('Sorry,Please Enter Valid Username and password')
          }
        }).catch(error=>{ 
          console.log(error)
        })
          }
          else
          {
            //  Alert.alert('warning','Please Entered Username and Password')
            setError('Sorry, Please Entered Username and Password')
          }
         }
         catch(error)
         {
          console.log(error);
         }

      }
     

    }

    const getWetlandDetails = (userid) => {
      return fetch('http://182.18.181.115:776/api/Nwis/GetFieldofficerplandetails?userid=' + userid)
        .then(response => response.json())
        .then(responseText => JSON.parse(responseText))
        .then(async (result) => {
          if (result && result !== "No Details") {
            InsertWetalnds(result, userid); 
            return true; // Data available, return true
          } else {
            return false; // No data available or "No Details" returned, return false
          }
        })
        .catch(error => {
          console.error("Error:", error);
          return false; // Error occurred, return false
        });
    };
    
    



  const InsertWetalnds = (v,userid) => {
    v.map((data)=>
      {
        if(data.createdby==userid)
        {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO GetFieldofficerplandetails (activitystatus,allchked_remarks,btnval,color,createdby,createddate,createdname,fieldesignation,fieldteamid,fromdate,monitoring,observation,officername,officername_desk,planid,quaterlyid,remarks,remarkstype,rwoofficer,status,todate,totalarea,typeofprocess,updateddate,wetname)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [data.activitystatus,data.allchked_remarks,data.btnval,data.color,data.createdby,data.createddate,data.createdname,data.fieldesignation,data.fieldteamid,data.fromdate,data.monitoring,data.observation,data.officername,data.officername_desk,data.planid,data.quaterlyid,data.remarks,data.remarkstype,data.rwoofficer,data.status,data.todate,data.totalarea,data.typeofprocess,data.updateddate,data.wetname],
              (_, result) => {
               console.log(result)
              },
              (_, error) => console.error('Error inserting data: ', error)
            );
          });
          fetch('http://182.18.181.115:776/api/Nwis/Getwetalnds?planid='+data.planid+'').
          then(response=>response.json()).
          then(responseText=>JSON.parse(responseText)).
          then(result=>
            {
              InsertFieldofficerplandetails(result)
            })
        }
      })
     
  };


  const InsertFieldofficerplandetails=v=>
  {
    v.map(data=>
      {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO GetPlanDetails (typeofprocess,createdname,planid,wetland_category,wetland_category_id,planwetlandid,wet_landid,wet_syst,drn_syst,wet_name,region,district,wet_code,county,subcounty,parish,district_2,ftype,district_3,seasonalit,class_name,complexity,shape_leng,area_ha,area_inmsq,easting_x,northing_y,eastings,northings,wetlandid,status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [data.typeofprocess,data.createdname,data.planid,data.wetland_category,data.wetland_category_id,data.planwetlandid,data.wet_landid,data.wet_syst,data.drn_syst,data.wet_name,data.region,data.district,data.wet_code,data.county,data.subcounty,data.parish,data.district_2,data.ftype,data.district_3,data.seasonalit,data.class_name,data.complexity,data.shape_leng,data.area_ha,data.area_inmsq,data.easting_x,data.northing_y,data.eastings,data.northings,data.wetlandid,data.status],
            (_, result) => {
              console.log('Data inserted successfully!');
              // 'result' will contain information about the insert operation, if needed.
            },
            (_, error) => console.error('Error inserting data: ', error)
          );
        });
      })
    
  }
    
    
    // Rest of your component's rendering logic
    


  return(
    <View style={styles.user}>
     <View style={{height:'10%',width:'20%',justifyContent:'center',alignItems:'center',backgroundColor:'white',borderRadius:60}}>
     <Image source={logo} style={{height:'70%',width:'70%'}}/>
     </View>
     <Text></Text> 
      <View style={styles.Field}>
      <Image source={wiselogo} style={{height:'15%',width:'30%',marginTop:-20}}/>     
        <Text></Text>
        <Text style={{fontWeight:'500'}}>Please login when you are online</Text>
      <Text></Text>
      <View style={styles.InputContainer}>
      <TextInput placeholder="Enter username" placeholderTextColor='grey' style={styles.FieldInput} 
      onChangeText={
        (e)=>
        {
          setUsername(e);
          if(error)
          {
            setError('');
          }
          if(success)
          {
            setSuccess('')
          }}}
       value={username}/>
      <Icon name="user" size={20} color="#000" style={{ marginRight: 10 }} />
      </View>
      <Text></Text>
      <View style={styles.InputContainer}>
      <TextInput placeholder="Enter password" placeholderTextColor='gray'  secureTextEntry={true}  style={styles.FieldInput} onChangeText={(e)=>{setPassword(e);if(error){setError('')}if(success){setSuccess('')}}} value={password} />
      <Icon name="lock" size={20} color="#000" style={{ marginRight: 10 }} />
      </View>
      <Text></Text>
      {!loading &&
      <TouchableOpacity style={styles.button} onPress={Validate}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
      }
        <Text></Text>
        {error?<Text style={{color:'red'}}>{error}</Text>:null}
        {loading?<ActivityIndicator size="small" color="blue"/>:null}
        {success?<Text style={{color:'green'}}>{success}</Text>:null}
      </View>
        {/* <Warning visible={warningVis} change={WarningMessage}/> */}
        
    </View>
  )
}



export default Login;
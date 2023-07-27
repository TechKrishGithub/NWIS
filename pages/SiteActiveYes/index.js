import { View,Text, ScrollView ,Alert,Modal} from "react-native";
import styles from "./style";
import TextFocusInput from "../TextFocusInput";
import DevTable from "./DevTable";
import AuthYes from "./AuthYes";
import React,{useState,useEffect} from "react";
import { Button } from "react-native-elements";
import { createTable,InsertData, selectData,deleteFromTable } from "../../constants/DataBaseHandle";
import { ActivityIndicator, FAB } from "react-native-paper";

const SiteActiveYes=({route,navigation})=>
{
  const { wetDetails,activeData } = route.params;
    const [ifSiteActive,SetIfSiteActive]=useState('');
    const [devData, setDevData] = useState([{ Identity: '', Name: '', Address:'' }]);
    const [auth,setAuth]= useState([{ Documents: null, 	NameOfDocuments: '' }]);
    const [arrest,setArrest]= useState([{ NameOfSuspect: '' }]);
    const [Impon,setImpon]=useState([{ Name: '' }]);
    const [SDNumber,setSDNumber]=useState('');
    const [plcCaseOpen,setPlcOpenFile]=useState(null);
    const  [authStatus,setAuthStatus]=useState(false);
    const [arrestStat,setArrestStat]=useState(false);
    const [plcCaseStat,setPlcCaseStat]=useState(false);
    const [ImponStat,setImponStat]=useState(false);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState('');
    const [mySize,setMySize]=useState(3072);
    const [plcSize,setPlcSize]=useState(1024);
    const [myLoad,setMyLoad]=useState(false);


    React.useEffect(()=>
    {
      activeData?setMyLoad(true):setMyLoad(false);
      selectData('SiteActivePlcCase').then((data)=>
      {
        const Plc=data.find(v=>v.planId==wetDetails[0].planid);
        if(Plc){
        setPlcOpenFile(JSON.parse(Plc.fileForRetrive))
        }
      })
      if(activeData)
      {
        
        selectData('SiteActiveActivites').then(data=>
          {
            const myActive=data.find(v=>v.planId==wetDetails[0].planid);
            SetIfSiteActive(myActive.YesActivity);
          })
        selectData('SiteActiveDev').then(data=>{
          const myActive=data.filter(v=>v.planId==wetDetails[0].planid);
          const filteredData = myActive.map(item => ({
            Address: item.Address,
            Identity: item.Identity,
            Name: item.Name,
          }));
          setDevData(filteredData);
          setTimeout(() => {
            setMyLoad(false)
          }, 2000);
        })
       
          selectData('SiteActiveAuth').then((data)=>{
            const AuthData=data.filter(v=>v.planId==wetDetails[0].planid);
            if(AuthData.length>0)
            {
              SetMyAuth(AuthData);
              setAuthStatus(true);
            }
            else{
              selectData('SiteActiveArrests').then((data)=>
              {
                const ArrestData=data.filter(v=>v.planId==wetDetails[0].planid);
                if(ArrestData.length>0)
                {
                  SetMyArrest(ArrestData);
                  setArrestStat(true);
                }
              })
                selectData('SiteActivePlcCase').then((data)=>
                {
                  const Plc=data.find(v=>v.planId==wetDetails[0].planid)
                  if(Plc)
                  {
                    setPlcCaseStat(true);
                    
                    setSDNumber(Plc.SDno.toString());
                    const file=JSON.parse(Plc.fileForRetrive);
                    setPlcOpenFile(file)
                  }
                })
                selectData('SiteActiveImpounds').then((data)=>
                {
                  const Impon=data.filter(v=>v.planId==wetDetails[0].planid);
                  if(Impon.length>0)
                  {
                    setImponStat(true);
                    SetDataToImpon(Impon)
                  }
                })
            }
          })
        }
       
    },[])


    const SetMyAuth=(data)=>
    {
        let minSize=3072;
        const filteredData = data.map(item => 
          ({
          Documents:  JSON.parse(item.fileForRetrive),
          NameOfDocuments: item.NameOfDocument
        }
        ));
        setAuth(filteredData);
      data.map(v=>
        {
          const my=JSON.parse(v.fileForRetrive).size;
          minSize=minSize-my;
         setMySize(minSize);
        })
    }

    const SetMyArrest=(data)=>
    {
      const fiteredData=data.map(item=>
        ({
          NameOfSuspect: item.NameOfSusp
        }))
        setArrest(fiteredData);
    }

    const SetDataToImpon=(data)=>
    {
      const filteredData=data.map(item=>
        ({
          Name:item.NameOfImpon
        }))
        setImpon(filteredData)
    }


    const handleSave = async () => {
      let errorMessage = '';
    
      if(ifSiteActive=='')
      {
        setError('Please Enter Going Activities Onsite !')
      }
      else
      {
        if (devData[devData.length-1].Identity === "" || devData[devData.length-1].Name === "" || devData[devData.length-1].Address === "") {
          errorMessage = 'Sorry Please Enter Developer Details !';
        } else {
          setError('');
      
          switch (true) {
            case authStatus && (auth[auth.length-1].Documents === '' || auth[auth.length-1].NameOfDocuments === ''):
              errorMessage = 'Please Enter Documents Details';
              break;
            case arrestStat && arrest[arrest.length-1].NameOfSuspect === '':
              errorMessage = 'Please Enter Name of Suspect !';
              break;
            case plcCaseStat && (plcCaseOpen === '' || SDNumber === '' || plcCaseOpen === null):
              errorMessage = 'Sorry Please Enter Police Case Details !';
              break;
            case ImponStat && Impon[Impon.length-1].Name === '':
              errorMessage = 'Sorry Please Enter Name/Type of Impoundments !';
              break;
            default:
              break;
          }
        }
      
        if (errorMessage) {
          setError(errorMessage);
        } else {
          setLoading(true);     
            deleteFromTable('SiteActiveActivites','planId = ?', [wetDetails[0].planid]);  
          deleteFromTable('SiteActiveAuth','planId = ?', [wetDetails[0].planid]);
          deleteFromTable('SiteActiveArrests','planId = ?', [wetDetails[0].planid]);
          deleteFromTable('SiteActivePlcCase','planId = ?', [wetDetails[0].planid]);
          deleteFromTable('SiteActiveImpounds','planId = ?', [wetDetails[0].planid]);
         deleteFromTable('SiteActiveDev','planId = ?', [wetDetails[0].planid]);
          try {
            await Promise.all([
              authStatus && InsertAuth(),
              arrestStat && InsertArrest(),
              plcCaseStat && InsertPlcCase(),
              ImponStat && InsertImpon(),
              InsertDev(),
              InsertYes()
            ]);
            setSuccess('Data Saved successfully !');
            setTimeout(()=>
            {
              setSuccess('');
              navigation.goBack();
            },500)
          } catch (error) {
            Alert.alert('An error occurred while inserting data.');
            console.error(error);
          }
        }
      }
    };
  

    const InsertYes=()=>
    {
        const dataInsert = {
          typeofProccess: 'Inspection',
          planId: wetDetails[0].planid,
          YesActivity:ifSiteActive
        };
      InsertData('SiteActiveActivites',dataInsert)
    }
       
    const InsertAuth = () => {
      auth.forEach(async (v) => {
        try {
          const dataInsert = {
            typeofProccess: 'Inspection',
            planId: wetDetails[0].planid,
            Document: JSON.stringify(v.Documents),
            NameOfDocument: v.NameOfDocuments,
            fileForRetrive: JSON.stringify(v.Documents)
          };
    
          await InsertData('SiteActiveAuth', dataInsert);
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      });
    };


   const InsertArrest=()=>{
    arrest.map(v=>
      {
        const dataInsert={
          typeofProccess:'Inspection',
          planId:wetDetails[0].planid,
          NoOfSus:arrest.length,
          NameOfSusp:v.NameOfSuspect
         }
       InsertData('SiteActiveArrests',dataInsert)
      })
   }


   const InsertPlcCase=async()=>{
    try {
        const dataInsert={
          typeofProccess:'Inspection',
          planId:wetDetails[0].planid,
          SDno:SDNumber,
          file:JSON.stringify(plcCaseOpen),
          fileForRetrive:JSON.stringify(plcCaseOpen)
         }
         await InsertData('SiteActivePlcCase',dataInsert)
        }
        catch (error) {
          console.error('Error inserting data:', error);
        }
   }
   const InsertImpon=()=>{
    Impon.map(v=>
      {
        const dataInsert={
          typeofProccess:'Inspection',
          planId:wetDetails[0].planid,
          NameOfImpon:v.Name
         }
       InsertData('SiteActiveImpounds',dataInsert) 
      })
   }

   const InsertDev=()=>{
    devData.map(v=>
      {
        const dataInsert={
          typeofProccess:'Inspection',
          planId:wetDetails[0].planid,
          Identity:v.Identity,
          Name:v.Name,
          Address:v.Address       
         }
       InsertData('SiteActiveDev',dataInsert)
      })
   }
 

    return(
        <ScrollView style={[styles.Container]} keyboardShouldPersistTaps="always">
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
               <TextFocusInput
                lable="(Yes)Provide on Going Activities Onsite"
                myValue={SetIfSiteActive}
                value={ifSiteActive}
              />
              
           <DevTable
           rows={devData} 
           setRows={setDevData}
           />

           <AuthYes 
           accessGranted={authStatus}
           setAccessGranted={setAuthStatus}
           rows={auth}
           setRows={setAuth}
           arrest={arrest}
           setArrest={setArrest}
           Impon={Impon}
           setImpon={setImpon}
           SDNumber={SDNumber}
           setSDNumber={setSDNumber}
           plcCaseOpen={plcCaseOpen}
           setPlcOpenFile={setPlcOpenFile}
           arrestStat={arrestStat}
           setArrestStat={setArrestStat}
           plcCaseStat={plcCaseStat}
           setPlcCaseStat={setPlcCaseStat}
           ImponStat={ImponStat}
           setImponStat={setImponStat}
           mySize={mySize}
           setMySize={setMySize}
           plcSize={plcSize}
           setPlcSize={setPlcSize}
           />

           {error&&
           <Text style={{margin:10,color:'red'}}>{error}</Text>
           }

{
  loading ?
  <View style={{flex:1,justifyContent:'center',alignItems:'center',margin:10}}>
  <ActivityIndicator color="blue" size="small"/>
  <Text>Saving....</Text>
  </View>
  :
  success ?
  <Text style={{margin:10,color:'green'}}>{success}</Text>
  :
  !activeData ?
  <Button
  title="Save"
  onPress={handleSave}
  buttonStyle={{ backgroundColor: '#1e88e5',margin:10 }}
   containerStyle={{ marginTop:20 }}
 />
 :
 <Button
 title="Update"
 onPress={handleSave}
 buttonStyle={{ backgroundColor: '#1e88e5',margin:10 }}
  containerStyle={{ marginTop:20 }}
/>
}

        </ScrollView>
        
    )
}

export default SiteActiveYes;
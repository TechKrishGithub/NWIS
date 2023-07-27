import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './style';
import TextFocusInput from '../TextFocusInput';
import Questions from './Questions';
import FileUpload from '../FileUpload';

const EnfActTak = (props) => {
  const {
    plcCaseOpen, rows,setRows,rowsImp,setRowsImp,SDNumber,setSDNumber,setPlcOpenFile,arrestStat,setArrestStat,plcCaseStat,setPlcCaseStat,ImponStat,setImponStat,plcSize,setPlcSize, navigation
  }=props;
  const [errorMes,setErrMes]=useState('');
  const [errorMes1,setErrMes1]=useState('');
  const [numOfSusp,setNumOfSusp]=useState('');
  const [file,setFile]=useState(null);

  React.useEffect(()=>{setFile(plcCaseOpen);setNumOfSusp(rows.length>0?rows.length.toString():'');setTimeout(()=>{setFile(plcCaseOpen),200}),[]})

  const addRow = () => {
    errorMes?setErrMes(''):null;
    if(numOfSusp)
    {
      if(rows.length!==parseInt(numOfSusp))
      {
        setRows([...rows, { NameOfSuspect: ''}]);
      }
    }
    else
    {
      setErrMes('Sorry Please Enter Number of Suspects !');
    }
  };

  const deleteRow = (index) => {
    if (index === 0) {
      // Show error message when trying to delete the first row
      setErrMes('Sorry, the first row cannot be deleted !');
      return;
    }
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleNameOfSuspectChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].NameOfSuspect = text;
    setRows(updatedRows);
  };

  const addRowImp = () => {
    errorMes1?setErrMes1(''):null;
    setRowsImp([...rowsImp, { Name: ''}]);
  };

  const deleteRowImp = (index) => {
    if (index === 0) {
      // Show error message when trying to delete the first row
      setErrMes1('Sorry, the first row cannot be deleted !');
      return;
    }
    const updatedRows = [...rowsImp];
    updatedRows.splice(index, 1);
    setRowsImp(updatedRows);
  };

  const handleImpChange = (text, index) => {
    const updatedRows = [...rowsImp];
    updatedRows[index].Name = text;
    setRowsImp(updatedRows);
  };


  const PlcOpen=()=>
  {
    return(
        <View style={{flexDirection:'row'}}>

          <View style={{width:'50%'}}>
          <TextFocusInput
            lable="SDNumber"
            myValue={setSDNumber}
            value={SDNumber}
          />
          </View>

        <View style={{width:'50%'}}>
          {/* <TextFocusInput
            lable="choose file"
            myValue={setFile}
            value={file}
          /> */}
          <FileUpload
          value={file}
          onDocumentChange={setPlcOpenFile}
           mySize={plcSize}
           setSize={setPlcSize}
          />
  </View>
  </View>
    )
  }


  const SuspectsTabel=()=>
  {
    return (
        <View style={styles.DevTab}>
    
        <TextFocusInput
        lable="Number of Suspects"
        myValue={setNumOfSusp}
        value={numOfSusp}
        keyboardType='numeric'
        />

          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Name of Suspects</Text>
            <TouchableOpacity onPress={addRow}>
            <AntDesign name="pluscircle" size={24} color="green" style={{margin:5}}/>
          </TouchableOpacity>
    
          </View>
          {errorMes&&
           <Text style={styles.err}>{errorMes}</Text>
          }
          {rows.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <TextInput
                style={styles.inputCell}
                value={row.NameOfSuspect}
                onChangeText={(text) => handleNameOfSuspectChange(text, index)}
              />
             
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteRow(index)}
                >
                    <AntDesign name="delete" size={24} style={styles.deleteButtonText} />
                </TouchableOpacity>
            
            </View>
          ))}
          
        </View>
      );
  }

  const ImpTabel=()=>
  {
    return (
        <View style={styles.DevTab}>
    
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Name/Type of Impoundments</Text>
            <TouchableOpacity onPress={addRowImp}>
            <AntDesign name="pluscircle" size={24} color="green" style={{margin:5}}/>
          </TouchableOpacity>
    
          </View>
          {errorMes1&&
           <Text style={styles.err}>{errorMes1}</Text>
          }
          {rowsImp.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <TextInput
                style={styles.inputCell}
                value={row.Name}
                onChangeText={(text) => handleImpChange(text, index)}
              />
             
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteRowImp(index)}
                >
                    <AntDesign name="delete" size={24} style={styles.deleteButtonText} />
                </TouchableOpacity>
            
            </View>
          ))}
          
        </View>
      );
  }

  return (
    <View style={[styles.DevTab,{marginTop:20}]}>
        <Text style={styles.tabHead}>Enforcement Actions Taken</Text>
    <Questions 
    question="Arrests"
    accessGranted={arrestStat}
    setAccessGranted={setArrestStat}
    />
   {arrestStat&&
   SuspectsTabel()
   }

   <Questions 
    question="Any Police Case Opened"
    accessGranted={plcCaseStat}
    setAccessGranted={setPlcCaseStat}
    />
    {plcCaseStat&&
    PlcOpen()
    }
    <Questions 
    question="Impoundments"
    accessGranted={ImponStat}
    setAccessGranted={setImponStat}
    />
    {
       ImponStat&&
       ImpTabel()
    }

    </View>
  );
};

export default EnfActTak;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import EnfActTak from './EnfActTak';
import styles from './style';
import Questions from './Questions';
import FileUpload from '../FileUpload';



const AuthYes = (props) => {
  const {
    plcCaseOpen, rows,setRows,SDNumber,setSDNumber,Impon,setImpon,arrest,setArrest,setPlcOpenFile,accessGranted,setAccessGranted,arrestStat,setArrestStat,plcCaseStat,setPlcCaseStat,ImponStat,setImponStat
  ,mySize,setMySize,plcSize,setPlcSize}=props;
  const [errorMes,setErrMes]=useState('');

  const addRow = () => 
  (rows[rows.length - 1].Documents === '' ? setErrMes('Please Choose Document on site !') : rows[rows.length - 1].NameOfDocuments === '' ? setErrMes('Please Enter Name of Document on site !') : (errorMes ? setErrMes('') : null, setRows([...rows, { Documents: '', NameOfDocuments: '' }])));


  const deleteRow = (index) => {
    if (index === 0) {
      // Show error message when trying to delete the first row
      setErrMes('Sorry, the first row cannot be deleted !');
      return;
    }
    setErrMes('');
    const updatedRows = [...rows];
   rows[rows.length - 1].Documents !== ''?  setMySize(mySize+updatedRows[index].Documents.size) :null;
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleDocumentsChange = (file, index) => {
    const updatedRows = [...rows];
    updatedRows[index].Documents = file;
    setRows(updatedRows);
  };

  const handleNameOfDocumentsChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].NameOfDocuments = text;
    setRows(updatedRows);
  };


  const AuthTabel=()=>
  {
    return (
        <View style={styles.DevTab}>
              <Text style={styles.note}>
  (<Text style={{color:'red'}}>Note:</Text>"You have only {mySize} Kb Limit To Upload Document")
</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCellAuth}>Documents on Site</Text>
            <Text style={styles.headerCellAuth}>Name of Documents on Site</Text>
            <TouchableOpacity onPress={addRow}>
            <AntDesign name="pluscircle" size={24} color="green" style={{margin:5}}/>
          </TouchableOpacity>
    
          </View>
          {errorMes&&
           <Text style={styles.err}>{errorMes}</Text>
          }
          {rows.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={{width:'45%'}}>
              <FileUpload 
              value={row.Documents}
              onDocumentChange={(t)=>handleDocumentsChange(t,index)}
              mySize={mySize}
              setSize={setMySize}
              />
              </View>
              <TextInput
                style={styles.inputCell}
                value={row.NameOfDocuments}
                onChangeText={(text) => handleNameOfDocumentsChange(text, index)}
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

  return (
    <View style={[styles.DevTab,{marginTop:20}]}>
        <Text style={styles.tabHead}>Authorization</Text>

    <Questions 
    question="Any Documents Found On Site ?"
    accessGranted={accessGranted}
    setAccessGranted={setAccessGranted}
    />
   {accessGranted&&
   AuthTabel()
   }
   
   {
    !accessGranted&&
    <EnfActTak
    rows={arrest}
    setRows={setArrest}
    rowsImp={Impon}
    setRowsImp={setImpon}
    SDNumber={SDNumber}
    plcCaseOpen={plcCaseOpen}
    setSDNumber={setSDNumber}
    setPlcOpenFile={setPlcOpenFile}
    arrestStat={arrestStat}
    setArrestStat={setArrestStat}
    plcCaseStat={plcCaseStat}
    setPlcCaseStat={setPlcCaseStat}
    ImponStat={ImponStat}
    setImponStat={setImponStat}
    plcSize={plcSize}
    setPlcSize={setPlcSize}
    />
 
   }
  
    </View>
  );
};

export default AuthYes;

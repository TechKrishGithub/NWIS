
import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,TextInput} from 'react-native';
import styles from './style';
import { AntDesign } from '@expo/vector-icons';


const DevTable = ({rows,setRows}) => {
  const [errorMes,setErrMes]=useState('');
  const addRow = () => {
    errorMes?setErrMes(''):null;
    setRows([...rows, { Identity: '', Name: '', Address:'' }]);
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

  const handleIdentityChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].Identity = text;
    setRows(updatedRows);
  };

  const handleNameChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].Name = text;
    setRows(updatedRows);
  };

  const handleAddressChange = (text, index) => {
    const updatedRows = [...rows];
    updatedRows[index].Address = text;
    setRows(updatedRows);
  };

  return (
    <View style={styles.DevTab}>

    <Text style={styles.tabHead}>Developer</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Identity</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Address</Text>
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
            value={row.Identity}
            onChangeText={(text) => handleIdentityChange(text, index)}
          />
          <TextInput
            style={styles.inputCell}
            value={row.Name}
            onChangeText={(text) => handleNameChange(text, index)}
          />
            <TextInput
            style={styles.inputCell}
            value={row.Address}
            onChangeText={(text) => handleAddressChange(text, index)}
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
};

export default DevTable;
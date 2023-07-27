import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Button } from 'react-native';
import { Feather,AntDesign,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import ModalSelectorCus from '../ModalSelectorCus';
import styles from './InpsectStyle';
import data from '../../constants';
import TextFocusInput from '../TextFocusInput';

const EppuOfficerTable = ({wetDetails,rows,setRows}) => {

  const [errorMes, setErrMes] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubCountry, setSelectedSubCountry] = useState('');
  const [selectedParish, setSelectedParish] = useState('');
  const [enteredVillage, setEnteredVillage] = useState('');


  const addRow = () => {
    const lastRow = rows[rows.length - 1];
    let errorMessage = '';
    switch (true) {
      case lastRow.officer === '':
        errorMessage = 'Please enter EPPU Officer!';
        break;
      case lastRow.role === '':
        errorMessage = 'Please enter Role!';
        break;
      case selectedRow === null:
        errorMessage = 'Please select a row!';
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
        const updatedRows = [...rows];
        updatedRows[rows.length - 1].index = rows.length - 1;
        setRows([
          ...updatedRows,
          {
            index: '',
            officer: '',
            role: '',
            region: '',
            district: '',
            country: '',
            subCountry: '',
            parish: '',
            village: '',
          },
        ]);
        break;
    }
    setErrMes(errorMessage);
  };


  const deleteRow = (index) => {
    if (index === 0) {
      setErrMes('Sorry, the first row cannot be deleted!');
      return;
    }
    else
    {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
   
  };

  const handleOfficerChange = (text, index) => {
    setErrMes('');
    const updatedRows = [...rows];
    updatedRows[index].officer = text;
    setRows(updatedRows);
  };

  const handleRoleChange = (text, index) => {
    setErrMes('');
    const updatedRows = [...rows];
    updatedRows[index].role = text;
    setRows(updatedRows);
  };
  

  const closeAreaModal = () => {
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedDistrict('');
    setSelectedSubCountry('');
    setSelectedParish('');
    setEnteredVillage('');
    setModalVisible(false);
  };


  const openAreaModal = (index) => {
    setSelectedRow(index);
    setModalVisible(true);
    const row = rows[index];
    setSelectedRegion(row.region);
    setSelectedDistrict(row.district);
    setSelectedCountry(row.country);
    setSelectedSubCountry(row.subCountry);
    setSelectedParish(row.parish);
    setEnteredVillage(row.village);
  };
  const addAreaInfo = () => {
    const updatedRows = [...rows];
    updatedRows[selectedRow].region = selectedRegion;
    updatedRows[selectedRow].district = selectedDistrict;
    updatedRows[selectedRow].country = selectedCountry;
    updatedRows[selectedRow].subCountry = selectedSubCountry;
    updatedRows[selectedRow].parish = selectedParish;
    updatedRows[selectedRow].village = enteredVillage;
    setRows(updatedRows);
    closeAreaModal();
  };

  const EditRow=(index)=>
  {
    console.log(rows[index].officer)
  }

  const hasAreaInfo = (row) => {
    return (
      row.region !== '' ||
      row.district !== '' ||
      row.country !== '' ||
      row.subCountry !== '' ||
      row.parish !== '' ||
      row.village !== ''
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="always">
      {errorMes && <Text style={{ color: 'red', margin: 10 }}>{errorMes}</Text>}
      <View style={styles.inspectionTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>EPPU Officer</Text>
          <Text style={[styles.headerCell,{textAlign:'center'}]}>Role</Text>
          <Text style={styles.headerCell}>Location</Text>
          <TouchableOpacity onPress={addRow}>
            <AntDesign name="pluscircle" size={24} color="green" style={{ margin: 5 }} />
          </TouchableOpacity>
        </View>
        {rows.map((row, index) =>
        {
          return (
          <View style={styles.tableRow} key={index}>
            <TextInput
              style={styles.myCell}
              value={row.officer}
              placeholder="EPPU Officer"
              onChangeText={(text) => handleOfficerChange(text, index)}
            />
            <TextInput
              style={styles.myCell}
              value={row.role}
              placeholder="Role"
              onChangeText={(text) => handleRoleChange(text, index)}
            />
            {hasAreaInfo(row) ? (
              <TouchableOpacity style={[styles.areaInfoButton,{backgroundColor:'#5a8a75'}]} 
              onPress={() => openAreaModal(index)}
              >
                 {/* <MaterialCommunityIcons name="book-edit" size={20} color="white" /> */}
              <Text style={styles.areaInfoButtonText}>Edit Location</Text>
            </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.areaInfoButton} onPress={() => openAreaModal(index)}>
                {/* <MaterialIcons name="library-add" size={20} color="white" /> */}
                <Text style={styles.areaInfoButtonText}>Location Info</Text>
              </TouchableOpacity>
            )}
          {/* {row.index === index&&
          <TouchableOpacity style={[styles.deleteButton]} 
          onPress={() => EditRow(index)}
          >
          <Feather name="edit" size={20} style={[styles.deleteButtonText,{color:'blue'}]} />
          </TouchableOpacity>
          } */}
           
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRow(index)}>
              <AntDesign name="delete" size={20} style={[styles.deleteButtonText,{color:'red'}]} />
            </TouchableOpacity>
           
          </View>
        )})}
      </View>
  
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeAreaModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Information</Text>
            <ModalSelectorCus
              data={wetDetails}
              initValue="Select Region"
              onChange={setSelectedRegion}
              value={selectedRegion}
              field='region'
            />
            <ModalSelectorCus
              data={wetDetails}
              initValue="Select District"
              onChange={setSelectedDistrict}
              value={selectedDistrict}
              field='district'
            />
            <ModalSelectorCus
              data={wetDetails}
              initValue="Select County"
              onChange={setSelectedCountry}
              value={selectedCountry}
              field='county'
            />
            <ModalSelectorCus
              data={wetDetails}
              initValue="Select SubCounty"
              onChange={setSelectedSubCountry}
              value={selectedSubCountry}
              field='subcounty'
            />

            <ModalSelectorCus
              data={wetDetails}
              initValue="Select Parish"
              onChange={setSelectedParish}
              value={selectedParish}
              field='parish'
            />
            <View style={{margin:5}}>
           <TextFocusInput
            value={enteredVillage}
            lable="Enter Village"
            myValue={setEnteredVillage}
            />
            </View>
            {/* <TextInput
              style={styles.inputCell}
              value={enteredVillage}
              placeholder="Enter Village"
              onChangeText={(text) => setEnteredVillage(text)}
            /> */}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={addAreaInfo}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={closeAreaModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EppuOfficerTable;

import React from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Modal,
  Animated, 
  Alert, 
  ScrollView } from "react-native";
 import styles from "./style";
 import data from '../../constants'
 import { 
  MaterialIcons, 
  Ionicons,
  Entypo,
  AntDesign
} from '@expo/vector-icons';
 import TextFocusInput from "../TextFocusInput";
 import { Searchbar,IconButton } from 'react-native-paper';
 
  
  const Dashboard = ({navigation}) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedPlan, setSelectedPlan] = React.useState([]);
    const [forwardVisible, setForwardVisible] = React.useState(false);
    const [role,setRole]=React.useState('');
    const [name,setName]=React.useState('');
    const [searchBarAnimation] = React.useState(new Animated.Value(0));
    const [searchQuery,setSearchQuery]=React.useState('');
    const [showSearchBar, setShowSearchBar] = React.useState(false);

    const searchBarOpacity = searchBarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  
    const searchBarHeight = searchBarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 56],
    });
  
    const handleWetlandInfoClick = (item) => {
        if (selectedItem && selectedItem.planId === item.planId) {
          setSelectedItem(null);
          setSelectedPlan(null);
        } else {
          setSelectedItem(item);
          setSelectedPlan(data.planData.find((plan) => plan.planId === item.planId));
        }
        
      };


    const handleViewDetails = (planId) => {
      setSelectedPlan([data.planData.find((plan) => plan.planId === parseInt(planId))]);
      console.log([data.planData.find((plan) => plan.planId === parseInt(planId))])
      setModalVisible(true);
    };


    const handleForwardDetails = (planId) => {
        setForwardVisible(true);
    }
  
    const closeModal = () => {
    setModalVisible(false);
    };

    
    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    const handleSearchIconPress = () => {
      setShowSearchBar(!showSearchBar);
      setSelectedItem(null);
      setSelectedPlan(null);
      setSearchQuery('')
      Animated.timing(searchBarAnimation, {
        toValue: showSearchBar ? 0 : 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    const filteredPlans = data.DashData.filter((item) => {
      const formattedSearchQuery = searchQuery.toLowerCase().replace(/\s+/g, '');
      const formattedPlanName = item.planId.toLowerCase().replace(/\s+/g, '');
    
      return formattedPlanName.includes(formattedSearchQuery);
    });
  
    const renderCard = ({ item }) => {
        const isActive = selectedItem && selectedItem.planId === item.planId;
        
      return (
        <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => handleWetlandInfoClick(item)} style={styles.AdjRow}>
          <Text style={styles.cardTitle}>Activity ID: <Text style={{color:'black'}}>{item.planId}</Text></Text>
          {!isActive?
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          :
          <MaterialIcons name="arrow-drop-up" size={24} color="black" />
    }
          </TouchableOpacity>

          {isActive && (
            <View style={styles.Inside}>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Type Of Activity:</Text>
                <Text style={styles.cardValue}>{item.activity}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Start Date:</Text>
                <Text style={styles.cardValue}>{item.startDate}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>End Date:</Text>
                <Text style={styles.cardValue}>{item.endDate}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Monitoring:</Text>
                <Text style={styles.cardValue}>{item.monitoring}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Observation:</Text>
                <Text style={styles.cardValue}>{item.observation}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Forward:</Text>
                <TouchableOpacity
                onPress={() => handleForwardDetails(item.planId)}
                >
                <Entypo name="forward" size={24} color="blue" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewDetails(item.planId)}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
       </View>
      );
    };
  
    return (
      <ScrollView style={styles.container}>
             <View style={styles.searchContainer}>
                    {showSearchBar && (
                <Animated.View style={[styles.searchBarContainer, { opacity: searchBarOpacity, height: searchBarHeight }]}>
             <Searchbar
               placeholder="Search for Activity "
               onChangeText={handleSearch}
               placeholderTextColor="#888"
               value={searchQuery}
               keyboardType='numeric'
               style={styles.searchBar}
              />
         </Animated.View>
        )}
          <TouchableOpacity onPress={handleSearchIconPress}>
                  {showSearchBar ? (
                <AntDesign name="closecircle" size={24} color="#6c7b80" />
                  ) : (
               <IconButton icon="magnify" style={{margin:0}}/>
             )}
          </TouchableOpacity>
        </View>

        {filteredPlans.map((item, index) => (
          <View key={index}>{renderCard({ item })}</View>
        ))}
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.AdjRow}>
              <Text style={styles.modalTitle}>Wetland Details</Text>
              <TouchableOpacity
              style={{margin:5}}
              onPress={()=>navigation.navigate('Inspection')}
              >
              <Ionicons name="document-text-outline" size={26} color="blue" />
              </TouchableOpacity>
              </View>
              <ScrollView style={{maxHeight:'80%'}}>
              {selectedPlan && (
                selectedPlan.map((selectedPlan,index)=>
                (
<View style={styles.Inside} key={index}>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>Wetland Name:</Text>
    <Text style={styles.cardValue}>{selectedPlan.WetlandName}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>Region:</Text>
    <Text style={styles.cardValue}>{selectedPlan.Region}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>District:</Text>
    <Text style={styles.cardValue}>{selectedPlan.District}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>Wetland Code:</Text>
    <Text style={styles.cardValue}>{selectedPlan.Wetlandcode}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>County:</Text>
    <Text style={styles.cardValue}>{selectedPlan.County}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>Subcounty:</Text>
    <Text style={styles.cardValue}>{selectedPlan.Subcounty}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>Parish:</Text>
    <Text style={styles.cardValue}>{selectedPlan.Parish}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>Eastings:</Text>
    <Text style={styles.cardValue}>{selectedPlan.Eastings}</Text>
  </View>
  <View style={styles.cardRow}>
    <Text style={styles.cardLabel}>Northings:</Text>
    <Text style={styles.cardValue}>{selectedPlan.Northings}</Text>
  </View>
 
 

</View>
                ))
              )}
              </ScrollView>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
        
          </View>
        </Modal>

        <Modal visible={forwardVisible} animationType="fade" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={[styles.AdjRow,styles.forWard]}>
              <Text style={styles.modalTitle}>Forwarded To</Text>
                <TouchableOpacity
                onPress={()=>setForwardVisible(false)}
                >
                  <AntDesign name="close" size={24} color="#888" />
                </TouchableOpacity>
              </View>
              <TextFocusInput
              lable="Name of the role"
               myValue={setRole}
              value={role}
              />

              <TextFocusInput
              lable="Name"
               myValue={setName}
              value={name}
              />
        
              <TouchableOpacity style={styles.modalButton} >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  };
  
 

 export default Dashboard;
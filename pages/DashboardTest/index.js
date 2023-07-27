import React, { useEffect, useState } from 'react';
import { View, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { Card, Title, Subheading, Text, Searchbar, IconButton, ActivityIndicator } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import styles from './style';
import { selectData } from '../../constants/DataBaseHandle';

const Dashboard = ({navigation}) => {
  const [searchBarAnimation] = React.useState(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [wetlandDet,setWetLandDet]=React.useState([]);
  const [planDet,setPlanDet]=React.useState([]);
  const [clickedCardIndex, setClickedCardIndex] = React.useState(-1);
  const [savedData,setSavedData]=React.useState([]);

  useEffect(()=>
  {
    getWetlandDetails();    
  },[])

  useFocusEffect(
    React.useCallback(() => {
      selectData('SiteBasicInfo').then(data=>data?setSavedData(data):console.log('No Data Saved !'))
    }, [])
  );




    const getWetlandDetails=()=>
    {
      selectData('GetFieldofficerplandetails').then(data=>setWetLandDet(data)).catch(error=>console.log(error));
      selectData('GetPlanDetails').then(data=>setPlanDet(data)).catch(error=>console.log(error))
      selectData('SiteBasicInfo').then(data=>data?setSavedData(data):console.log('No Data Saved !'))
    }

  const searchBarOpacity = searchBarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const searchBarHeight = searchBarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56],
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchIconPress = () => {
    setShowSearchBar(!showSearchBar);
    setSearchQuery('');
    Animated.timing(searchBarAnimation, {
      toValue: showSearchBar ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  
   
   
  const colors = ['#FF0000', '#9e96f4', '#0000FF', '#FF00FF', '#7b72dd']; // Define unique colors


  const filtedAction=wetlandDet?.filter((item)=>
  {
    const myPlan=planDet.filter(v=>v.planid==item.planid)
    const formattedSearchQuery = searchQuery.toLowerCase().replace(/\s+/g, '');
    const typeofprocess = item.typeofprocess.toLowerCase().replace(/\s+/g, '');
    const wetlnad=myPlan.map(k=>
      {
        return k.wet_name.toLowerCase().replace(/\s+/g,'');
      })
    return (
      typeofprocess.includes(formattedSearchQuery) ||
      wetlnad.some((name) => name.includes(formattedSearchQuery))
      )
  })

  const myGroup=(data)=>
  {
   
  const groupedData = data.reduce((result, item) => {
    const existingItem = result.find((group) => group.wet_name === item.wet_name);
    if (existingItem) {
      existingItem.data.push(item);
    } else {
      result.push({ title: item.wet_name, data: item });
    }
    return result;
  }, []);
  return groupedData;
  }

  const Unique=(my)=>
  {
     return Array.from(new Set(my?.map(item => item.title)));
  }

  if( wetlandDet.length>0 && planDet.length >0 )
  {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.searchContainer}>
          {showSearchBar && (
            <Animated.View style={[styles.searchBarContainer, { opacity: searchBarOpacity, height: searchBarHeight }]}>
              <Searchbar
                placeholder="Search for Wetland and Activity"
                onChangeText={handleSearch}
                placeholderTextColor="#888"
                value={searchQuery}
              
                style={styles.searchBar}
              />
            </Animated.View>
          )}
          <TouchableOpacity onPress={handleSearchIconPress}>
            {showSearchBar ? (
              <AntDesign name="closecircle" size={24} color="#6c7b80" />
            ) : (
              <IconButton icon="magnify" style={{ margin: 0 }} />
            )}
          </TouchableOpacity>
          
        </View>
  
        {filtedAction.map((k,index)=>
        {
          if(k.typeofprocess=='Inspection')
          {
            const checkSaved=savedData?.filter(m=>m.planId==k.planid);
            const activity=planDet?.filter(r=>r.planid==k.planid);
            const isCardClicked = index === clickedCardIndex;
            const data=myGroup(activity);
            const myTit=Unique(data);
            return(
              <TouchableOpacity 
              onPress={() => setClickedCardIndex(isCardClicked ? -1 : index)}
              key={index}
              >
              <Card key={index} style={styles.card}>
                <View style={styles.insideCard}>
                <Title style={styles.title}>{activity[0]?.wet_name}</Title>
              
                  {checkSaved.length>0?
                  <View style={{flexDirection:'row'}}>
                  <Text style={[styles.activity,styles.activityContainer ,{marginRight:20}]}>{k.typeofprocess}</Text>
                  <TouchableOpacity 
                    style={styles.activityContainer}
                    onPress={()=>navigation.navigate('Inspection',{wetDetails:activity,checkSaved:checkSaved})}
                    >
                  <Text style={[styles.activity,{color:'blue'}]}>Edit</Text>
                  </TouchableOpacity>
                  </View>
                  :
                  
                  <TouchableOpacity 
                  style={styles.activityContainer}
                  onPress={()=>navigation.navigate('Inspection',{wetDetails:activity,checkSaved:checkSaved})}
                  >
                  <Text style={styles.activity}>{k.typeofprocess}</Text>
                  </TouchableOpacity>
                 } 
                </View>
                {isCardClicked &&
                data.map((v,index)=>{
                  return(
                 <View key={index}>
                    <View style={styles.cardContent}>
                 <View style={styles.titleContainer}>
                   {/* <Text style={styles.title}>{data.title}</Text> */}
                   <Text>{v.title}</Text>
                 </View>
                      <View style={styles.subheadingContainer}>
                      <Subheading style={styles.subheading}>
                        Region: <Text style={{ color: colors[0] }}>{v.data.region}</Text>  | {'\t'}
                        County: <Text style={{ color: colors[1] }}>{v.data.county}</Text> | {'\t'}
                        District: <Text style={{ color: colors[2] }}>{v.data.district}</Text> | {'\t'}
                        Subcounty: <Text style={{ color: colors[3] }}>{v.data.subcounty}</Text> | {'\t'}
                        Parish: <Text style={{color: colors[4]}}>{v.data.parish}</Text> 
                      </Subheading>
                      </View>
                    </View>
                  
               </View>
                  )
                }
                )
                 }
                 </Card>
                 </TouchableOpacity>
            ) 
          }
        })}
  
      </ScrollView>
    )
  }
   
   else
   {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="small" color='blue'/>
        <Text>loading ....</Text>
      </View>
    )
   }
};

export default Dashboard;

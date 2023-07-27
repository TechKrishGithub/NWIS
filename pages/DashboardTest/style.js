import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    card: {
      marginBottom: 16,
    },
    cardContent: {
      padding: 16,
    },
    titleContainer: {
      marginBottom: 8,
    },
    title: {
      fontWeight: 'bold',
    },
    subheadingContainer: {
      marginBottom: 8,
    },
    subheading: {
      fontSize: 12,
      color: '#888',
    },
    insideCard:
    {
      flexDirection:'row',
      justifyContent:'space-between',
      margin:10,
      alignItems:'center'
    },
    activityContainer: {
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    activity: {
      color: '#4038a2',
      fontWeight: 'bold',
    },
    searchBarContainer: {
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 16,
    },
    searchBar:
    {
      borderWidth:0.8,
      borderColor:'#93a6ad',
      backgroundColor:'#fff'
    },
    title:
    {
      fontWeight:'600'
    },
    searchBarContainer: {
      flex: 1,
      marginRight: 8,
    },
  });

  export default styles;
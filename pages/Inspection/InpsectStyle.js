import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      borderWidth:0.8,
      borderColor:'#ccc',
      margin:10,
      borderRadius:10
    },
    inspectionTable: {
      marginTop: 20,
      paddingHorizontal: 10
    },
    tableHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 10
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      textAlign:'center'
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10
    },
    inputCell: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding:5,
      margin:10,
      color:'black',
      paddingHorizontal:10
    },
    myCell:
    {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 5,
        marginRight: 10
    },
    areaInfoButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#007bff',
      borderRadius: 4,
      width:'25%',
      justifyContent:'center',
      alignItems:'center'
    },
    areaInfoButtonText: {
      color: '#fff',
      fontWeight: '500',
      fontSize:10
    },
    deleteButton: {
      padding: 5,
      margin:5,
      borderRadius:5
    },
    deleteButtonText: {
      color: 'white'
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
      backgroundColor: '#fff',
      marginHorizontal: 40,
      padding: 20,
      borderRadius: 8
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 20
    },
    modalButton: {
      marginLeft: 10
    },
    modalButtonText: {
      color: '#007bff',
      fontWeight: 'bold'
    }
  });


  export default styles;
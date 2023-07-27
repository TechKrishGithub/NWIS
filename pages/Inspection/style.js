import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    Container: {
      flex:1,
       padding:10,
       backgroundColor:"#fefeff"
    },
    coordinates:
    {
      flexDirection:'row',
    },
    CoorLabel:
    { 
      margin:8,
      padding:3,
      fontWeight:'500',
      borderBottomColor:'#ccc',
      borderBottomWidth:0.5,
      color:'#302888'
    },
    SiteActiveCon:
    {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      padding:10,
      margin:10,
      borderColor:'#888',
      borderWidth:1,
      borderRadius:5,
      marginBottom:10
    },
    CheckBoxContainer:
    {
        margin:10,
        height:200,
        padding:10,
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius:5
    },
    buttonContainer: {
      margin: 20
    },
    questionText: {
      fontWeight:'500',
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 25,
      backgroundColor: 'lightgray',
      marginHorizontal: 15,
    },
    selectedButton: {
      backgroundColor: 'green',
    },
    unSelectedButton: {
      backgroundColor: '#ff4a3a',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    selectedButtonText: {
      color: 'white',
    },
   checkBox:
   {
    padding:10
   },
   tableHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor:'#ccc',
    borderBottomWidth:0.5,
    margin:10
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  InspectionTable:
  {
    margin:10,
    padding:10,
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:8
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputCell: {
    flex: 1,
    borderWidth: 1,
    margin:5,
    borderColor: '#ccc',
    padding: 5,
    borderRadius:8
  },
  deleteButton: {
    alignSelf: 'center',
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius:5
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    color:'white'
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  err:
  {
    color:'red',
    margin:10,
    fontWeight:'500'
  },
  container: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: 'red',
  },
  })

  export default styles;
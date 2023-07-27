import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    Container: {
       flex:1,
       padding:10,
       backgroundColor:"#fefeff"
    },
    DevTab:
    {
        borderColor:'#888',
        borderWidth:0.5,
        borderRadius:10,
        padding:5
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor:'#ccc',
        borderBottomWidth:0.5,
        margin:10
      },
      headerCellAuth:
      {
        flex: 1,
        fontWeight: '500',
        fontSize:12
      },
      headerCell: {
        flex: 1,
        fontWeight: '500',
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
      tabHead:
      {
        fontWeight:'bold',
        borderBottomColor:'#888',
        borderBottomWidth:0.5,
        margin:5,
        padding:5,
        color:'#302888'
      },
      buttonContainer: {
        margin: 20,
        width:'50%'
      },
      AuthYesCon:
      {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        marginTop:20,
        marginBottom:10
      },
      questionText: {
        fontWeight:'500',
      },
      buttonContainer: {
        flexDirection: 'row',
      },
      button: {
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 20,
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
        fontWeight: 'bold',
        color: 'black',
      },
      selectedButtonText: {
        color: 'white',
      },
      note: {
        fontStyle: 'italic',
        fontSize: 14,
        color: '#888',
        padding:16
      },
})

export default styles;
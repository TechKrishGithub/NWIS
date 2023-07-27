import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    inputCell: {
        color:'black'
      },
      searchInput: {
        borderWidth: 1,
        borderColor: '#888',
        margin:10,
        height:50,
        borderRadius: 5,
        justifyContent:'center'
      },
      border:
      {
        // borderWidth: 1,
        // borderRadius: 4,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderColor:'#888'
      },
      text:
      {
        color:'black'
      },
      dropdownContainer: {
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 4,
        justifyContent: 'center',
        paddingHorizontal: 10
      },
      dropdownOptionText: {
        color:'black',
        textAlign:'left'
      },
      dropdownCancel: {
        padding: 10,
        alignItems: 'center'
      },
      dropdownSelectedOption: {
        backgroundColor: 'yellow', // Set the desired background color for the selected option
      },
      dropdownCancelText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold'
      },
})

export default styles;
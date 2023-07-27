import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'#e1eff5'
      },
      cardContainer: {
        backgroundColor: '#f4fbfd',
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        elevation: 2,
      },
      Inside:
      {
        backgroundColor:'#dcedf3',
        borderTopColor:'#ccc',
        borderTopWidth:1,
        padding:10,
        borderRadius:10
      },
      cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color:'#2f413e'
      },
      cardRow: {
        flexDirection: 'row',
        marginBottom: 4,
      },
      cardLabel: {
        fontWeight: '500',
        marginRight: 4,
      },
      cardValue: {},
      viewButton: {
        backgroundColor: '#42bdec',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 16,
      },
      viewButtonText: {
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        width: '80%'
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      
      modalText: {
        marginBottom: 8,
      },
      modalButton: {
        backgroundColor: '#7e89fa',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 16,
      },
      modalButtonText: {
        fontWeight: 'bold',
      },
      AdjRow:
      {
        flexDirection:'row',
        justifyContent:'space-between'
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
      forWard:
      {
        padding:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:0.8
      }
    });
export default styles;
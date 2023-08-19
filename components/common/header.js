import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.color1,
        padding:20,
        alignItems:"center"
    },
    title:{
        fontSize:27,
        fontWeight:"bold",
        marginTop:25
    }
})
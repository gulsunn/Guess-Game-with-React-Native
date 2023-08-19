import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacer = ({ size }) => {
    return (
        <View style={{ height: size || 20 }}>
        </View>
    )
}

export default Spacer

const styles = StyleSheet.create({})
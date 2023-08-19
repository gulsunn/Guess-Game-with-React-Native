import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const Card = (props) => {
    return (
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.color4,
        padding: 20,
        borderWidth: 2,
        borderColor: colors.color3,
        borderRadius: 10,
    }
})
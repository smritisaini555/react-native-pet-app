import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const OwnerInfo = ({ pet }) => {
  return (
    <View style={styles.container}> 
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        gap:20
      }}>
      <Image source={{uri:pet?.user?.image}} style={{
        width:60,
        height:60,
        borderRadius:99
      }} />
      <View>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize:17
        }}>{pet?.user?.name}</Text>
        <Text style={{
          fontFamily: 'outfit',
          color: Colors.GRAY
        }}>Pet Owner</Text>
      </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal:20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 20,
    borderWidth:1,
    borderRadius:15,
    padding:10,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
  }
})

export default OwnerInfo
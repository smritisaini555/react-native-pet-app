import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'

const Slider = () => {

  const [sliderList, setSliderList] = useState([])

    useEffect(() => {
      GetSlider()
    }, [])
    
    const GetSlider = async() => {
      setSliderList([])
        const snapshot = await getDocs(collection(db, "Sliders"));
        snapshot.forEach((doc) => {
            // console.log("doc", doc.data())
            setSliderList(sliderList=> [...sliderList, doc.data()])
        });
    }

  return (
    <View style={{
      marginTop:15
    }}>
       {/* To handle the slider  */}
      {/* <PanGestureHandler></PanGestureHandler> */}
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) =>(
        <View>
          <Image source={{uri: item?.image}} style={styles.sliderImage} />
        </View>
      )}
       />
    </View>
  )
}

//rns for external react native style
const styles = StyleSheet.create({
  sliderImage:{
    width:Dimensions.get('screen').width*0.9,
    height:200,
    borderRadius:15,
    marginRight:15
  }
})

export default Slider
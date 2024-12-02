import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const PetDetails = () => {
  const { pet } = useLocalSearchParams();
  const navigation = useNavigation();
  const newPet = JSON.parse(pet);

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View>
      <ScrollView>
        <PetInfo pet={newPet} />
        <PetSubInfo pet={newPet} />
        <AboutPet pet={newPet} />
        <OwnerInfo pet={newPet} />
        <View style={{ height: 70 }}></View>
      </ScrollView>
      <View style={styles.bottomCantainer}>
        <TouchableOpacity style={styles.adoptBtn}>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit-medium',
            fontSize:20
          }}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adoptBtn: {
    padding:15,
    backgroundColor: Colors.PRIMARY
  },
  bottomCantainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0

  }
});

export default PetDetails;

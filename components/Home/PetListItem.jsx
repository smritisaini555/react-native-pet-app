import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import MakeFav from "../MakeFav";

const PetListItem = ({ pet }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: {
            pet: JSON.stringify(pet),
          },
        })
      }
      style={{
        padding: 10,
        marginRight: 25,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View style={{
        position:'absolute',
        zIndex:10,
        right:10,
        top:10
      }}>
        <MakeFav pet={pet} color={'white'} />
      </View>
      <Image
        source={{ uri: pet?.image }}
        style={{
          width: 170,
          height: 155,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 18,
          marginTop: 5,
        }}
      >
        {pet?.name}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            // fontSize:18,
            color: Colors.GRAY,
          }}
        >
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            backgroundColor: Colors.LIGHT_PRIMARY,
            paddingHorizontal: 7,
            borderRadius: 10,
            fontSize: 13,
          }}
        >
          {pet?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;

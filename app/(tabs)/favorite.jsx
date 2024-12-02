import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "../../components/Home/PetListItem";

const Favorite = () => {
  const { user } = useUser();

  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoder] = useState(false);

  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  // Fav Ids
  const GetFavPetIds = async () => {
    setLoder(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    setLoder(false);

    GetFavPetList(result?.favorites);
  };

  // Fetch related Pet list
  const GetFavPetList = async (favIds_) => {
    setLoder(true);
    setFavPetList([])
    const q = query(collection(db, 'Pets'), where('id', 'in', favIds_));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("doc", doc.data());
      setFavPetList(prev=>[...prev, doc.data()])
    });
    setLoder(false);
  };
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        Favorite
      </Text>

      <FlatList
      data={favPetList}
      numColumns={2}
      onRefresh={GetFavPetIds}
      refreshing={loader}
      renderItem={({item, index}) => (
        <View> 
          <PetListItem pet={item} />
        </View>
      )}
       />
    </View>
  );
};

export default Favorite;

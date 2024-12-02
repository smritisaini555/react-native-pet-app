import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./PetListItem";

const PetListByCategory = () => {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPetList("Dogs");
  }, []);

  const getPetList = async (category) => {
    setLoader(true)
    setPetList([]);
    // needed this condition if the useEffect was not there
    // const q = query(collection(db, 'Pets'),where('category', '==', category ? category : 'Dogs'));
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false)
  };
  return (
    <View>
      <Category category={(value) => getPetList(value)} />
      <FlatList
        data={petList}
        horizontal={true}
        style={{marginTop: 20}}
        refreshing={loader}
        onRefresh={() => getPetList('Dogs')}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
};

export default PetListByCategory;

import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Image } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

const Category = ({category}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
    //   console.log("doc:::::::::::::", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        Category
      </Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={(item, index) => (
          <TouchableOpacity
            onPress={() => {
                setSelectedCategory(item?.item?.name);
                category(item?.item?.name);
            }}
            style={{
              flex: 1,
            }}
          >
            <View
              style={[
                styles.container,
                selectedCategory == item?.item?.name &&
                  styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.item?.image }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit",
              }}
            >
              {item?.item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});

export default Category;

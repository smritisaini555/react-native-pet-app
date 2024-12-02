import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// const tokenCache = {
//   async getToken(key) {
//     try {
//       const item = await SecureStore.getItemAsync(key);
//       if (item) {
//         console.log(`${key} was used 🔐`);
//       } else {
//         console.log("No values stored under key: " + key);
//       }
//       return item;
//     } catch (error) {
//       console.error("SecureStore get item error: ", error);
//       await SecureStore.deleteItemAsync(key); // Clear potentially corrupted item
//       return null;
//     }
//   },
//   async saveToken(key, value) {
//     try {
//       await SecureStore.setItemAsync(key, value);
//       console.log(`${key} saved successfully 🔐`);
//     } catch (error) {
//       console.error("SecureStore save item error: ", error);
//     }
//   },
// };


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // to hide the header
          }}
        />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false, // to hide the header
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}

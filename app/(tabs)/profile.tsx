import { icons } from "@/constants/icons";
import { Text, View, Image } from "react-native";

const Profile = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex justify-center items-center flex-1 flex-col">
        <Image source={icons.person} style={{ width: 40, height: 40}} tintColor='#FFF' />
        <Text className="text-white text-base mt-2">Profile</Text>
      </View>
    </View>
  )
}

export default Profile
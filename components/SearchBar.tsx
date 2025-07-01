import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

interface SearchBarProps {
  onPress?: () => void
  placeholder: string
  value?: string
  onChange?: (v: string) => void
}

const SearchBar = ({ onPress, placeholder, value, onChange }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor='#AB8BFF' />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor='#A8B5DB'
        className="flex-1 ml-2 text-white"
      />
    </View>
  )
}

export default SearchBar
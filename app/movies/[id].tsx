import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";

const MovieInfo = ({ label, value }: { label: string, value?: string | null }) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-sm text-light-200 font-bold">{label}</Text>
      <Text className="text-sm text-light-200 font-normal">{value || 'N/A'}</Text>
    </View>
  )
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            style={{ width: "100%", height: 550 }}
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-lg text-white font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-sm text-light-200">{movie?.release_date?.split('-')[0]}</Text>
            <Text className="text-sm text-light-200">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm text-white font-bold">{Math.round(movie?.vote_average || 0)}/10</Text>
            <Text className="text-sm text-light-200">{movie?.vote_count} votes</Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo label='Genres' value={movie?.genres?.map(el => el.name).join(' - ')} />
          <MovieInfo label='Budget' value={`$${movie?.budget || 0 / 100000} million`} />
          <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue || 0 / 100000)}`} />
          <MovieInfo label='Production Companies' value={movie?.production_companies?.map(el => el.name).join(' - ')} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 5, left: 0, right: 0, marginInline: 5, backgroundColor: '#AB8BFF', borderRadius: 20, padding: 20 }}
        className="py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Text className="text-base font-semibold text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails
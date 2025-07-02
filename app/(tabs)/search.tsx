/* eslint-disable react-hooks/exhaustive-deps */
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, View, Text } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error, refetch, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch()
      } else {
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  useEffect(() => {
    if (data?.length && data?.[0]) {
      updateSearchCount(searchQuery, data[0])
    }
  }, [data])

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode="cover" />
      <FlatList
        data={data}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5"
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className="my-5">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search movies..." />
            </View>

            {loading && <ActivityIndicator size='large' color='#0000FF' className="my-3" />}
            {error && <Text className="text-red-500 px-5 my-3">Error: {error.message}</Text>}
            {!loading && !error && searchQuery.trim() && data?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for {searchQuery}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-white">
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search;
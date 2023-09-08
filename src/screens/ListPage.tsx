import axios from 'axios'; //npm install axios
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

type ListItemProps = {
  university: {
    name: string;
    web_pages: string[];
  };
};

const ListItem = ({university}: ListItemProps) => {
  return (
    <View>
      <Text>{university.name}</Text>
      <Text>{university.web_pages[0]}</Text>
    </View>
  );
};

const ListPage = () => {
  const [universities, setUniversities] = useState();
  const [loading, setLoading] = useState(false);

  const getUniversityData = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(
        'http://universities.hipolabs.com/search?country=Brazil',
      );
      setUniversities(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUniversityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      {loading === true ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={universities}
          renderItem={({item}) => <ListItem university={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default ListPage;

import React, {useState} from 'react';
import axios from 'axios';
import {Button, View} from 'react-native';

const RandomActivity = () => {
  const [randomActivity, setRandomActivity] = useState();

  const fetchApi = async () => {
    try {
      const {data} = await axios.get('http://www.boredapi.com/api/activity');
      setRandomActivity(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button title="Get random activity" onPress={fetchApi} />
    </View>
  );
};

export default RandomActivity;

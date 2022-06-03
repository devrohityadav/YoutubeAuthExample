import React from 'react';
import {View, Button} from 'react-native';
import {useMMKV} from 'react-native-mmkv';

export const LoginScreen = () => {
  const storage = useMMKV();
  const handleLogin = () => {
    const res = {data: {access_token: '123'}};
    storage.set('access_token', res.data.access_token);
  };

  return (
    <View style={{padding: 24}}>
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};

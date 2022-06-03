import React from 'react';
import {useMMKV} from 'react-native-mmkv';
import {Button, Text, ToastAndroid, View} from 'react-native';

export const DashboardScreen = () => {
  const storage = useMMKV();

  const logout = () => {
    storage.delete('access_token');
  };

  const simulateFailedRequest = () => {
    // make a request to some api that fails
    const res = {status: 401, message: 'Not Authorized'};

    ToastAndroid.show(res.message, ToastAndroid.SHORT);
    if (res.status === 401) {
      storage.delete('access_token');
      return;
    }
  };

  return (
    <View>
      <Text>Dashboard</Text>

      <View style={{alignItems: 'center', padding: 24}}>
        <Button title="Logout" onPress={logout} />
      </View>
      <View style={{alignItems: 'center', padding: 24}}>
        <Button
          title="Simulate failed request"
          onPress={simulateFailedRequest}
        />
      </View>
    </View>
  );
};

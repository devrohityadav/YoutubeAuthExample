import {useMMKV} from 'react-native-mmkv';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginScreen} from './screens/login';
import {DashboardScreen} from './screens/dashboard';

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  const storage = useMMKV();
  const [isValidUser, setIsValidUser] = useState(
    !!storage.getString('access_token'),
  );

  useEffect(() => {
    const listener = storage.addOnValueChangedListener(key => {
      if (key === 'access_token') {
        const access_token = storage.getString(key);
        setIsValidUser(!!access_token);
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

  /**
   *
   * Extras Tips:
   *
   */

  useEffect(() => {
    if (isValidUser) {
      // Validate user with sever here. something like: GET /user/me
    }
  }, [isValidUser]);

  return (
    <Stack.Navigator>
      {!isValidUser ? (
        /**
         * Auth Stack - screens that do not require authentication
         * Put Register, Otp Verification, Login screens here
         */
        <>
          {/* Loading indicator */}
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        /**
         * Main Stack - screens that require authentication
         * Put UserProfile, Dashboard screens here
         */
        <>
          {/* Loading indicator */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

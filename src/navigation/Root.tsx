import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import { StackParams } from './params';
import CourseInfo from '../features/courses/CourseInfo';
import Session from '../features/schedule/Session';
import Assignment from '../features/assignments/Assignment';
import Result from '../features/results/Result';
import { colors } from '../shared/constants/colors';

const Stack = createNativeStackNavigator<StackParams>();

export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="CourseDetail" component={CourseInfo} options={{ title: 'Chi tiết môn học' }} />
      <Stack.Screen name="SessionDetail" component={Session} options={{ title: 'Chi tiết buổi học' }} />
      <Stack.Screen name="AssignmentDetail" component={Assignment} options={{ title: 'Chi tiết bài tập' }} />
      <Stack.Screen name="ResultDetail" component={Result} options={{ title: 'Chi tiết kết quả' }} />
    </Stack.Navigator>
  );
}

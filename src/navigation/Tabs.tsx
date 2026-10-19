import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BookOpen, CalendarDays, ClipboardCheck, House, UserRound } from 'lucide-react-native';
import { TabParams } from './params';
import Home from '../features/home/Home';
import Courses from '../features/courses/Courses';
import Schedule from '../features/schedule/Schedule';
import Assignments from '../features/assignments/Assignments';
import Profile from '../features/profile/Profile';
import { colors } from '../shared/constants/colors';

const Tab = createBottomTabNavigator<TabParams>();
const icons = {
  Overview: House,
  Courses: BookOpen,
  Schedule: CalendarDays,
  Assignments: ClipboardCheck,
  Profile: UserRound,
};

const tabIcon = (Icon: typeof House): NonNullable<BottomTabNavigationOptions['tabBarIcon']> =>
  ({ color }) => <Icon size={18} color={color} strokeWidth={1.8} />;

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginBottom: 3 },
        tabBarStyle: {
          height: 64,
          paddingTop: 6,
          borderTopColor: colors.line,
          backgroundColor: colors.surface,
        },
      }}
    >
      <Tab.Screen name="Overview" component={Home} options={{ title: 'Tổng quan', tabBarIcon: tabIcon(icons.Overview) }} />
      <Tab.Screen name="Courses" component={Courses} options={{ title: 'Môn học', tabBarIcon: tabIcon(icons.Courses) }} />
      <Tab.Screen name="Schedule" component={Schedule} options={{ title: 'Lịch học', tabBarIcon: tabIcon(icons.Schedule) }} />
      <Tab.Screen name="Assignments" component={Assignments} options={{ title: 'Bài tập', tabBarIcon: tabIcon(icons.Assignments) }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Cá nhân', tabBarIcon: tabIcon(icons.Profile) }} />
    </Tab.Navigator>
  );
}

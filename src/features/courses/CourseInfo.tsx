import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Card, Heading, Screen } from '../../shared/components/ui';
import { StackParams } from '../../navigation/params';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../shared/constants/colors';

type Route = RouteProp<StackParams, 'CourseDetail'>;

export default function CourseInfo() {
  const { params } = useRoute<Route>();
  const { course } = params;
  return (
    <Screen>
      <Heading title={course.name} subtitle={`${course.code} · ${course.credits} tín chỉ`} />
      <Card>
        <Text style={styles.label}>Giảng viên</Text>
        <Text style={styles.value}>{course.instructor}</Text>
      </Card>
      <Card>
        <Text style={styles.label}>Giới thiệu môn học</Text>
        <Text style={styles.value}>{course.description}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  value: { color: colors.ink, fontSize: 15, lineHeight: 23, marginTop: 7 },
});

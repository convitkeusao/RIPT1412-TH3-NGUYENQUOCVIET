import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { Card, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { StackParams } from '../../navigation/params';
import { useData } from '../../shared/lib/DataContext';

type Route = RouteProp<StackParams, 'SessionDetail'>;

export default function Session() {
  const { params } = useRoute<Route>();
  const { data } = useData();
  const session = params.session;
  const course = data?.courses.find(item => item.id === session.courseId);
  return (
    <Screen>
      <Heading title={course?.name ?? 'Buổi học'} subtitle={`${session.day} · ${session.start} – ${session.end}`} />
      <Card>
        <Text style={styles.label}>Mã môn</Text>
        <Text style={styles.value}>{course?.code ?? '—'}</Text>
        <Text style={styles.label}>Phòng học</Text>
        <Text style={styles.value}>{session.room}</Text>
        <Text style={styles.label}>Giảng viên</Text>
        <Text style={styles.value}>{course?.instructor ?? '—'}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.muted, fontSize: 12, marginTop: 10 },
  value: { color: colors.ink, fontSize: 15, fontWeight: '600', marginTop: 5 },
});

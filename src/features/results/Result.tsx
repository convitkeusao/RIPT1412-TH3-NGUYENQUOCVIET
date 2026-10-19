import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { Card, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { StackParams } from '../../navigation/params';
import { useData } from '../../shared/lib/DataContext';

type Route = RouteProp<StackParams, 'ResultDetail'>;

export default function Result() {
  const { params } = useRoute<Route>();
  const { data } = useData();
  const result = params.result;
  const course = data?.courses.find(item => item.id === result.courseId);

  return (
    <Screen>
      <Heading title={course?.name ?? 'Kết quả học tập'} subtitle={`${result.semester} · ${course?.code ?? ''}`} />
      <Card style={styles.scoreCard}>
        <Text style={styles.score}>{result.score.toFixed(1)}</Text>
        <Text style={styles.caption}>Điểm tổng kết</Text>
      </Card>
      <Card>
        <Text style={styles.label}>Nhận xét</Text>
        <Text style={styles.note}>{result.note}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scoreCard: { alignItems: 'center', paddingVertical: 28 },
  score: { color: colors.primary, fontSize: 48, fontWeight: '800' },
  caption: { color: colors.muted, fontSize: 13, marginTop: 5 },
  label: { color: colors.muted, fontSize: 12 },
  note: { color: colors.ink, fontSize: 15, lineHeight: 23, marginTop: 7 },
});

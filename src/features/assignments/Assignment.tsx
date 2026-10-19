import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { ActionButton, Card, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { StackParams } from '../../navigation/params';
import { useData } from '../../shared/lib/DataContext';

type Route = RouteProp<StackParams, 'AssignmentDetail'>;

export default function Assignment() {
  const { params } = useRoute<Route>();
  const { data, updateAssignment } = useData();
  const assignment = data?.assignments.find(item => item.id === params.assignment.id) ?? params.assignment;
  const course = data?.courses.find(item => item.id === assignment.courseId);
  const [error, setError] = useState('');

  async function toggleStatus() {
    setError('');
    try {
      await updateAssignment({ ...assignment, done: !assignment.done });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không thể cập nhật bài tập.');
    }
  }

  return (
    <Screen>
      <Heading title={assignment.title} subtitle={`${course?.name ?? 'Môn học'} · ${course?.code ?? ''}`} />
      <Card>
        <Text style={styles.label}>Hạn nộp</Text>
        <Text style={styles.value}>{new Date(assignment.dueDate).toLocaleDateString('vi-VN', { dateStyle: 'long' })}</Text>
        <Text style={styles.label}>Trạng thái</Text>
        <Text style={styles.value}>{assignment.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</Text>
        <Text style={styles.label}>Nội dung</Text>
        <Text style={styles.value}>{assignment.description}</Text>
      </Card>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ActionButton title={assignment.done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'} onPress={toggleStatus} secondary={assignment.done} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.muted, fontSize: 12, marginTop: 10 },
  value: { color: colors.ink, fontSize: 15, lineHeight: 22, marginTop: 5 },
  error: { color: colors.red, marginBottom: 10 },
});

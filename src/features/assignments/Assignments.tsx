import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActionButton, Card, EmptyState, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { StackParams } from '../../navigation/params';
import { useData } from '../../shared/lib/DataContext';
import { formatDate } from '../../shared/lib/date';

type Navigation = NativeStackNavigationProp<StackParams>;
type Filter = 'Tất cả' | 'Chưa xong' | 'Đã xong';

export default function Assignments() {
  const { data, updateAssignment } = useData();
  const [filter, setFilter] = useState<Filter>('Tất cả');
  const [error, setError] = useState('');
  const navigation = useNavigation<Navigation>();
  const filters: Filter[] = ['Tất cả', 'Chưa xong', 'Đã xong'];
  const filtered = (data?.assignments ?? []).filter(item =>
    filter === 'Tất cả' || (filter === 'Đã xong' ? item.done : !item.done),
  );

  async function toggle(id: string, done: boolean) {
    const assignment = data?.assignments.find(item => item.id === id);
    if (!assignment) {
      return;
    }
    setError('');
    try {
      await updateAssignment({ ...assignment, done });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không thể cập nhật bài tập.');
    }
  }

  return (
    <Screen>
      <Heading title="Bài tập" subtitle="Theo dõi hạn nộp và tiến độ của bạn" />
      <View style={styles.filters}>
        {filters.map(item => (
          <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}>
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyState text="Không có bài tập trong danh sách này." />}
        renderItem={({ item }) => {
          const course = data?.courses.find(value => value.id === item.courseId);
          return (
            <Card style={styles.card}>
              <Pressable onPress={() => navigation.navigate('AssignmentDetail', { assignment: item })}>
                <View style={styles.row}>
                  <View style={styles.assignment}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.meta}>{course?.code ?? 'Môn học'} · Hạn {formatDate(item.dueDate)}</Text>
                  </View>
                  <View style={[styles.status, item.done && styles.done]}>
                    <Text style={[styles.statusText, item.done && styles.doneText]}>{item.done ? 'Đã xong' : 'Cần làm'}</Text>
                  </View>
                </View>
              </Pressable>
              <View style={styles.buttonWrap}>
                <ActionButton
                  title={item.done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}
                  secondary={item.done}
                  onPress={() => toggle(item.id, !item.done)}
                />
              </View>
            </Card>
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  filter: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, paddingVertical: 8, paddingHorizontal: 12 },
  filterActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: '#FFFFFF' },
  error: { color: colors.red, marginBottom: 10 },
  card: { padding: 14 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  assignment: { flex: 1, paddingRight: 8 },
  title: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 12, marginTop: 6 },
  status: { backgroundColor: colors.softOrange, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 5 },
  done: { backgroundColor: colors.softGreen },
  statusText: { color: colors.orange, fontSize: 10, fontWeight: '700' },
  doneText: { color: colors.primary },
  buttonWrap: { marginTop: 12 },
});

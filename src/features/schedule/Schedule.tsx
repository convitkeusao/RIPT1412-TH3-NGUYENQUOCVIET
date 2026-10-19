import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, EmptyState, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { StackParams } from '../../navigation/params';
import { useData } from '../../shared/lib/DataContext';

type Navigation = NativeStackNavigationProp<StackParams>;

export default function Schedule() {
  const { data } = useData();
  const [day, setDay] = useState('Tất cả');
  const navigation = useNavigation<Navigation>();
  const days = ['Tất cả', ...new Set((data?.sessions ?? []).map(session => session.day))];
  const filtered = (data?.sessions ?? []).filter(session => day === 'Tất cả' || session.day === day);

  return (
    <Screen>
      <Heading title="Thời khóa biểu" subtitle="Lịch học trong tuần" />
      <FlatList
        horizontal
        data={days}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        style={styles.dayList}
        renderItem={({ item }) => (
          <Pressable onPress={() => setDay(item)} style={[styles.dayChip, item === day && styles.dayActive]}>
            <Text style={[styles.dayText, item === day && styles.dayTextActive]}>{item}</Text>
          </Pressable>
        )}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyState text="Không có buổi học nào trong ngày này." />}
        renderItem={({ item }) => {
          const course = data?.courses.find(value => value.id === item.courseId);
          return (
            <Pressable onPress={() => navigation.navigate('SessionDetail', { session: item })}>
              <Card style={styles.session}>
                <View style={styles.time}>
                  <Text style={styles.start}>{item.start}</Text>
                  <Text style={styles.end}>{item.end}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.info}>
                  <Text style={styles.name}>{course?.name ?? 'Môn học'}</Text>
                  <Text style={styles.meta}>{item.day} · Phòng {item.room}</Text>
                </View>
              </Card>
            </Pressable>
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  dayList: { flexGrow: 0, marginBottom: 15 },
  dayChip: { backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 9, marginRight: 7 },
  dayActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayText: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  dayTextActive: { color: '#FFFFFF' },
  session: { flexDirection: 'row', alignItems: 'center' },
  time: { width: 48 },
  start: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  end: { color: colors.muted, fontSize: 11, marginTop: 5 },
  separator: { width: 3, height: 42, borderRadius: 2, backgroundColor: colors.orange, marginHorizontal: 13 },
  info: { flex: 1 },
  name: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 12, marginTop: 6 },
});

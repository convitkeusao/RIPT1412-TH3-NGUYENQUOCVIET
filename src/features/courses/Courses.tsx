import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, EmptyState, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { StackParams } from '../../navigation/params';
import { useData } from '../../shared/lib/DataContext';

type Navigation = NativeStackNavigationProp<StackParams>;

export default function Courses() {
  const { data } = useData();
  const [search, setSearch] = useState('');
  const navigation = useNavigation<Navigation>();
  const filtered = (data?.courses ?? []).filter(course =>
    `${course.name} ${course.code}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
  );

  return (
    <Screen>
      <Heading title="Môn học" subtitle="Danh sách các môn trong học kỳ của bạn" />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm theo tên hoặc mã môn..."
        placeholderTextColor={colors.muted}
        style={styles.search}
        accessibilityLabel="Tìm kiếm môn học"
        returnKeyType="search"
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<EmptyState text={search ? 'Không tìm thấy môn học phù hợp.' : 'Chưa có môn học nào.'} />}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('CourseDetail', { course: item })}>
            <Card style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.code}>{item.code}</Text>
                <Text style={styles.credits}>{item.credits} tín chỉ</Text>
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.instructor}>{item.instructor}</Text>
            </Card>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    color: colors.ink,
    fontSize: 14,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 14,
  },
  card: { marginBottom: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  code: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  credits: { color: colors.muted, fontSize: 12 },
  name: { color: colors.ink, fontSize: 17, fontWeight: '700', marginTop: 10 },
  instructor: { color: colors.muted, fontSize: 13, marginTop: 6 },
});

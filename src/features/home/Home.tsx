import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, EmptyState, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { useData } from '../../shared/lib/DataContext';
import { StackParams } from '../../navigation/params';
import { formatDate } from '../../shared/lib/date';

type Navigation = NativeStackNavigationProp<StackParams>;

export default function Home() {
  const { data } = useData();
  const navigation = useNavigation<Navigation>();

  if (!data) {
    return <Screen><EmptyState text="Chưa có dữ liệu học tập." /></Screen>;
  }

  const upcoming = data.assignments
    .filter(item => !item.done)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading title="Chào bạn," subtitle="Cùng xem kế hoạch học tập hôm nay nhé." />
        <Card style={styles.welcome}>
          <Text style={styles.eyebrow}>SINH VIÊN</Text>
          <Text style={styles.name}>{data.student.name}</Text>
          <Text style={styles.studentCode}>{data.student.studentCode} · {data.student.className}</Text>
        </Card>

        <SectionTitle title="Môn học của bạn" subtitle={`${data.courses.length} môn đang học`} />
        {data.courses.map(course => (
          <Pressable
            key={course.id}
            onPress={() => navigation.navigate('CourseDetail', { course })}
            accessibilityRole="button"
          >
            <Card style={styles.courseCard}>
              <View style={styles.courseBadge}><Text style={styles.courseCode}>{course.code}</Text></View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.small}>{course.credits} tín chỉ</Text>
              </View>
            </Card>
          </Pressable>
        ))}

        <SectionTitle title="Bài tập sắp đến hạn" subtitle="Ưu tiên hoàn thành đúng hạn" />
        {upcoming.length ? (
          upcoming.map(item => {
            const course = data.courses.find(value => value.id === item.courseId);
            return (
              <Pressable key={item.id} onPress={() => navigation.navigate('AssignmentDetail', { assignment: item })}>
                <Card style={styles.assignmentCard}>
                  <View style={styles.dueDot} />
                  <View style={styles.assignmentInfo}>
                    <Text style={styles.courseName}>{item.title}</Text>
                    <Text style={styles.small}>{course?.code ?? 'Môn học'} · {formatDate(item.dueDate)}</Text>
                  </View>
                </Card>
              </Pressable>
            );
          })
        ) : <EmptyState text="Bạn đã hoàn thành tất cả bài tập." />}
      </ScrollView>
    </Screen>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionText}>{title}</Text>
      <Text style={styles.small}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: { backgroundColor: colors.primary, borderColor: colors.primary, paddingVertical: 20 },
  eyebrow: { color: colors.line, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  name: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', marginTop: 8 },
  studentCode: { color: colors.line, fontSize: 13, marginTop: 5 },
  sectionTitle: { marginTop: 18, marginBottom: 10 },
  sectionText: { color: colors.ink, fontSize: 18, fontWeight: '800', marginBottom: 3 },
  courseCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, marginBottom: 8 },
  courseBadge: { width: 50, height: 44, borderRadius: 12, backgroundColor: colors.softGreen, alignItems: 'center', justifyContent: 'center' },
  courseCode: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  courseInfo: { flex: 1, marginLeft: 12 },
  courseName: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  small: { color: colors.muted, fontSize: 12, marginTop: 4 },
  assignmentCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, marginBottom: 8 },
  dueDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.orange, marginRight: 12 },
  assignmentInfo: { flex: 1 },
});

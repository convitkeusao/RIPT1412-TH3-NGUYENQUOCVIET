import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActionButton, Card, EmptyState, Heading, Screen } from '../../shared/components/ui';
import { colors } from '../../shared/constants/colors';
import { StackParams } from '../../navigation/params';
import { Student } from '../../shared/types';
import { useData } from '../../shared/lib/DataContext';

type Navigation = NativeStackNavigationProp<StackParams>;

export default function Profile() {
  const { data, updateStudent } = useData();
  const navigation = useNavigation<Navigation>();
  const [form, setForm] = useState<Student | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.student) {
      setForm(data.student);
    }
  }, [data?.student]);

  function change(field: 'name' | 'email' | 'phone', value: string) {
    setForm(current => current ? { ...current, [field]: value } : current);
    setError('');
    setSaved('');
  }

  async function save() {
    if (!form) {
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Vui lòng nhập đầy đủ họ tên, email và số điện thoại.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Email chưa đúng định dạng.');
      return;
    }
    setSaving(true);
    setError('');
    setSaved('');
    try {
      await updateStudent(form);
      setSaved('Đã lưu thông tin cá nhân.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không thể lưu thông tin.');
    } finally {
      setSaving(false);
    }
  }

  if (!data || !form) {
    return <Screen><EmptyState text="Đang tải thông tin cá nhân..." /></Screen>;
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Heading title="Cá nhân" subtitle="Thông tin sinh viên và kết quả học tập" />
        <Card style={styles.identity}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{form.name.trim().slice(0, 1) || 'S'}</Text></View>
          <Text style={styles.name}>{form.name}</Text>
          <Text style={styles.code}>{form.studentCode}</Text>
        </Card>
        <Text style={styles.section}>Thông tin sinh viên</Text>
        <Card>
          <Info label="Mã sinh viên" value={form.studentCode} />
          <Info label="Lớp" value={form.className} />
          <Info label="Ngành học" value={form.major} />
          <Field label="Họ và tên" value={form.name} onChangeText={value => change('name', value)} />
          <Field label="Email" value={form.email} onChangeText={value => change('email', value)} keyboardType="email-address" />
          <Field label="Số điện thoại" value={form.phone} onChangeText={value => change('phone', value)} keyboardType="phone-pad" />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {saved ? <Text style={styles.saved}>{saved}</Text> : null}
          <ActionButton title={saving ? 'Đang lưu...' : 'Lưu thay đổi'} onPress={save} disabled={saving} />
        </Card>

        <Text style={styles.section}>Kết quả học tập</Text>
        {(data.results.length > 0) ? data.results.map(result => {
          const course = data.courses.find(item => item.id === result.courseId);
          return (
            <Pressable key={result.id} onPress={() => navigation.navigate('ResultDetail', { result })}>
              <Card style={styles.result}>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{course?.name ?? 'Môn học'}</Text>
                  <Text style={styles.meta}>{result.semester} · {course?.code ?? ''}</Text>
                </View>
                <Text style={styles.score}>{result.score.toFixed(1)}</Text>
              </Card>
            </Pressable>
          );
        }) : <EmptyState text="Chưa có kết quả học tập." />}
      </ScrollView>
    </Screen>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
        style={styles.input}
        selectionColor={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  identity: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.softGreen, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.primary, fontSize: 25, fontWeight: '800' },
  name: { color: colors.ink, fontSize: 18, fontWeight: '800', marginTop: 10 },
  code: { color: colors.muted, fontSize: 13, marginTop: 4 },
  section: { color: colors.ink, fontSize: 18, fontWeight: '800', marginTop: 12, marginBottom: 10 },
  infoRow: { paddingBottom: 12 },
  label: { color: colors.muted, fontSize: 12 },
  value: { color: colors.ink, fontSize: 14, fontWeight: '600', marginTop: 4 },
  field: { marginTop: 10 },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 10, color: colors.ink, fontSize: 14, height: 44, paddingHorizontal: 11, marginTop: 5 },
  error: { color: colors.red, fontSize: 12, marginVertical: 10 },
  saved: { color: colors.primary, fontSize: 12, marginVertical: 10 },
  result: { flexDirection: 'row', alignItems: 'center' },
  resultInfo: { flex: 1 },
  resultTitle: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 12, marginTop: 5 },
  score: { backgroundColor: colors.softGreen, borderRadius: 12, overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 8, color: colors.primary, fontSize: 16, fontWeight: '800' },
});

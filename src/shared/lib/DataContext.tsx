import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Assignment, Data, Student } from '../types';
import { getData, saveAssignment, saveStudent } from '../../database/data';
import { colors } from '../constants/colors';
import { ActionButton } from '../components/ui';

type DataValue = {
  data: Data | null;
  updateStudent: (student: Student) => Promise<void>;
  updateAssignment: (assignment: Assignment) => Promise<void>;
};

const DataContext = createContext<DataValue | null>(null);

export function DataProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      setData(await getData());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không thể tải dữ liệu học tập.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const update = useCallback(async (save: () => Promise<void>, message: string) => {
    try {
      await save();
      setData(await getData());
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : message);
      throw cause;
    }
  }, []);

  const updateStudent = useCallback(
    (student: Student) => update(() => saveStudent(student), 'Không thể lưu thông tin sinh viên.'),
    [update],
  );
  const updateAssignment = useCallback(
    (assignment: Assignment) =>
      update(
        () => saveAssignment(assignment.id, assignment.done),
        'Không thể cập nhật bài tập.',
      ),
    [update],
  );

  const value = useMemo(
    () => ({ data, updateStudent, updateAssignment }),
    [data, updateStudent, updateAssignment],
  );

  if (loading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>Đang tải dữ liệu học tập...</Text>
      </View>
    );
  }

  if (!data && error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Không thể tải dữ liệu</Text>
        <Text style={styles.message}>{error}</Text>
        <ActionButton title="Thử lại" onPress={() => { setLoading(true); refresh(); }} />
      </View>
    );
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData phải được sử dụng bên trong DataProvider.');
  }
  return context;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  errorTitle: { color: colors.ink, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  message: { color: colors.muted, marginVertical: 14, textAlign: 'center' },
});

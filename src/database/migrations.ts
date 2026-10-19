import { db } from './db';

const DB_VERSION = 1;

export async function runMigrations(): Promise<void> {
    // 1. Lấy phiên bản hiện tại
    const res = await db.execute('PRAGMA user_version;');
    const currentVersion = Number(res.rows[0]?.user_version ?? 0);

    // 2. Nếu database của client mới hơn code app -> Báo lỗi ngay
    if (currentVersion > DB_VERSION) {
        throw new Error(
            `Database version ${currentVersion} is newer than supported version ${DB_VERSION}`,
        );
    }

    // 3. Thực hiện Migration nếu version cũ hơn
    if (currentVersion < 1) {
        // Thực thi tạo bảng và đánh index trong 1 transaction
        await db.transaction(async tx => {
            await tx.execute(`
                CREATE TABLE IF NOT EXISTS journal_entries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL DEFAULT '',
                    content TEXT NOT NULL DEFAULT '',
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
            `);

            await tx.execute(`
                CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at
                ON journal_entries(created_at);
            `);
        });

        // 💡 Cập nhật user_version NGOÀI transaction để đảm bảo lưu version thành công
        await db.execute(`PRAGMA user_version = 1;`);
    }

    // Sau này nếu có version 2, bạn chỉ cần thêm:
    // if (currentVersion < 2) { ... }
}
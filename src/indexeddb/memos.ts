import Dexie from 'dexie'
// import Dexie, { Table } from 'dexie';

// IndexedDBに保存するデータの型の定義をする
// TypeScript の型定義であって IndexedDB に対する設定ではないので注意
export interface MemoRecord {
    datetime: string
    title: string
    text: string
}

// Dexie のインスタンスを生成。 データベース名：markdown-editor
const database = new Dexie('markdown-editor')

// テーブルの定義
// version(1) はデータベースのバージョン
// stores() で使用するテーブルとインデックスとなるデータ名を指定。 インデックス以外のデータ名は指定不要
database.version(1).stores({ memos: '&datetime'})

// データを扱うテーブルクラスを取得
// Dexie.Table<MemoRecord, string>：総称型で型を定義
// MemoRecord はデータの型、string はキーとなるデータ（今回は datetime）の型
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

// テーブルへの保存
// メモを保存するために、タイトルとテキストを引数として受け取る関数を定義する
export const putMemo = async (title: string, text: string): Promise<void> => {
    // 日時を保存のタイミングで自動付与
    const datetime = new Date().toISOString()
    // IndexedDBに保存
    await memos.put({ datetime, title, text })
}

// import Dexie from 'dexie'

// export interface MemoRecord {
//     datetime: string
//     title: string
//     text: string
// }

// const database = new Dexie('markdown-editor')
// database.version(1).stores({ memos: '&datetime' })
// const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

// export const putMemo = async (title: string, text: string): Promise<void> => {
//     const datetime = new Date().toISOString()
//     await memos.put({ datetime, title, text })
//     }
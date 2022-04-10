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

const NUM_PER_PAGE: number = 10

export const getMemosPageCount = async (): Promise<number> => {
    const totalCount = await memos.count() //memosテーブルから総件数を取得
    const pageCount = Math.ceil(totalCount / NUM_PER_PAGE) //トータルの件数から1ページあたりの件数で割ってページ数を算出
    return pageCount > 0 ? pageCount : 1 //0件でも1ページと判定
}

// IndexDBからテキスト履歴をリストで取得する
// 戻り値は配列のため、MemoRecordの末尾に[]をつける
export const getMemos = (page: number): Promise<MemoRecord[]> => {
    const offset = (page -1) * NUM_PER_PAGE //ページ数を元に取得する最初に位置を算出
    return memos.orderBy('datetime') // 保存した日時の昇順(古い順)で取得
        .reverse() // 並び順を逆にする
        .offset(offset) //リスト内の開始位置
        .limit(NUM_PER_PAGE) //取得する件数を設定
        .toArray() // 配列に変換する
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
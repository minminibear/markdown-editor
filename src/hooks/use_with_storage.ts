import { useState } from 'react'

export const useStateWithStorage = 
    (init: string, key: string): [string, (s: string) => void] => {
        // カスタムフックの引数と戻り値
        // init: stringは初期値でuseStateの引数と同じ
        // key: stringはlocalStorageに保存する際のキーです。
        // [string, (s: string) => void]はカスタムフックの戻り値でuseStateの戻り値と同じ型
    const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

    // localStorageへの保存を組み合わせた値の更新関数
    // useStateから取得した関数とlocalStorageへの保存を組み合わせた関数
    const setValueWithStorage = (nextValue: string): void => {
        setValue(nextValue)
        localStorage.setItem(key, nextValue)
    }

    // 値と更新関数の返却
    // useStateから取得した値とlocalStorageへの保存を組み合わせた更新関数を返却する
    return [value, setValueWithStorage]
}


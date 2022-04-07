import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_with_storage'
import ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'

const { useState } = React

const Header = styled.header`
    align-content: center;
    display: flex;
    font-size: 1.5rem;
    height: 2rem;
    justify-content: space-between;
    left: 0;
    line-height: 2rem;
    padding:0.5rem 1rem;
    position: fixed;
    right: 0;
    top: 0;
`
const HeaderControl = styled.div`
    height: 2rem;
    display: flex;
    align-content: center;
`

const Wrapper = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
`

const TextArea = styled.textarea`
    border-right: 1px solid silver;
    border-top: 1px solid silver;
    bottom: 0;
    font-size: 1rem;
    left: 0;
    padding: 0.5rem;
    position: absolute;
    top: 0;
    width: 50vw;
`
const Preview = styled.div`
    border-top:1px solid silver;
    bottom: 0;
    overflow-y: scroll;
    padding: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 50vw;
`
// localStorageでデータの参照・保存に使うキーを決めておく。
// 「ファイルパス：値の名前」という命名規則で決める。
const StorageKey = 'pages/editor:text'

// Editor という変数は React.FC という型と定義。
// React.FC で定義された関数は、JSX で <Editor> という形式で呼び出す事ができる
export const Editor: React.FC = () => {
    const [text, setText] = useStateWithStorage('', StorageKey)
    // localStorage.getItem は null を返す場合がある
    // （初回アクセス時など）ので、 || '' をつけて必ず文字列入るようにする

    // モーダルを表示するかのフラグ管理(管理する値はboolean true：表示　false：非表示)
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Header>
                Markdown Editor
                <HeaderControl>
                    {/* 保存するボタンを押した場合にモーダル表示のフラグをONにする */}
                    <Button onClick={() => setShowModal(true)}>
                        保存する
                    </Button>
                </HeaderControl>
            </Header>
            <Wrapper>
                {/* コードでテキストが変更される度にlocalStorageへ保存する処理を入れる */}
                <TextArea
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                />

                <Preview>
                    <ReactMarkdown children={text} />
                </Preview>
            </Wrapper>
            {/* モーダル表示のフラグがONになっている場合のみ、モーダルを表示する判定式
            showModal が true の場合は && 以降の処理が実行される */}
            {showModal && (

                // onSave は、IndexedDBへの保存処理とモーダルを閉じるため showModal へ false をセット
                // nCancel はモーダルを閉じるだけなので showModal に false をセットする
                <SaveModal
                    onSave={(title: string): void => {
                        putMemo(title, text)
                        setShowModal(false)
                    }}
                    onCancel={() => setShowModal(false)}
                    />
            )}
        </>
    )
}

// TextAreaのonChange属性にテキストの内容が変更された時に実行される関数を渡す(event)
// event.target.valueに渡されてテキストの内容が格納される。その内容をsetTextに渡して状態を更新する。
// value属性にuseStateのtext変数を渡すことでテキストの内容を渡す。
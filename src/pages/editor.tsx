import * as React from 'react'
import styled from 'styled-components'
// import ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'
// import TestWorker from 'worker-loader!../worker/convert_markdown_worker'
import ConvertMarkdownWorker from 'worker-loader!../worker/convert_markdown_worker'

const convertMarkdownWorker = new ConvertMarkdownWorker()
const { useState, useEffect } = React

const Wrapper = styled.div`
bottom: 0;
left: 0;
position: fixed;
right: 0;
top: 3rem;
`

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
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
// const StorageKey = 'pages/editor:text'

interface Props {
    text: string
    setText: (text: string) => void
}

// Editor という変数は React.FC という型と定義。
// React.FC で定義された関数は、JSX で <Editor> という形式で呼び出す事ができる
// useStateWithPropsを使ってこのページで管理していた状態を呼び出し元からパラメーターとして渡される処理に変更する。
export const Editor: React.FC<Props> = (props) => {
    const { text, setText } = props
    // localStorage.getItem は null を返す場合がある
    // （初回アクセス時など）ので、 || '' をつけて必ず文字列入るようにする

    // モーダルを表示するかのフラグ管理(管理する値はboolean true：表示　false：非表示)
    const [showModal, setShowModal] = useState(false)

    const [html, setHtml] = useState('')

    // WebWorkerから受け取った処理結果(HTML)で状態を更新
    useEffect(() => {
        convertMarkdownWorker.onmessage = (event) => {
            setHtml(event.data.html)
        }
    }, [])

    useEffect(() => {
        convertMarkdownWorker.postMessage(text)
    },[text])

    return (
        <>
            <HeaderArea>
                <Header title='Markdown Editor'>
                    {/* 保存するボタンを押した場合にモーダル表示のフラグをONにする */}
                    <Button onClick={() => setShowModal(true)}>
                        保存する
                    </Button>
                    <Link to="/history">
                        履歴をみる
                    </Link>
                </Header>
            </HeaderArea>
            <Wrapper>
                <TextArea
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    />
                <Preview>
                    {/* HTMLをdivタグ内に表示する */}
                    <div dangerouslySetInnerHTML={{ __html: html }} />
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
import * as React from "react";
// import { Button } from '../components/button'
// useHistory:Reactのカスタムフックでhistoryオブジェクトを返す。
// historyはブラウザの履歴を扱うためのAPIを提供
import {
    Link,
    Navigate,
    useNavigate,
} from 'react-router-dom'
import styled from "styled-components";
import { Header } from '../components/header'
import {
    getMemosPageCount,
    getMemos,
    MemoRecord,
} from '../indexeddb/memos'

const { useState, useEffect } = React

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
`
const Wrapper = styled.div`
    bottom: 3rem;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
    padding: 0 1 rem;
    overflow-y: scroll;
`
const Memo = styled.button`
    display: block;
    background-color: white;
    border: 1px solid gray;
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    text-align: left;
`

const MemoTitle = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`

const MemoText = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const Paging = styled.div`
    bottom: 0;
    height: 3rem;
    left: 0;
    line-height: 2rem;
    padding: 0.5rem;
    position: fixed;
    right: 0;
    text-align: center;
`
const PagingButton = styled.button`
    background: none;
    border: none;
    display: inline-block;
    height:2rem;
    padding: 0.5rem 1rem;

    &:disabled {
        color: silver;
    }
`

// テキストの状態を更新する関数をパラメータとして受け取るようにする
interface Props {
    setText: (text: string) => void
}

export const History: React.FC<Props> = (props) => {
    const { setText } = props
    const [memos, setMemos] = useState<MemoRecord[]>([])
    const [page, setPage] = useState(1) //現在のページ
    const [maxPage, setMaxPage] = useState(1) //最大ページ
    const navigate = useNavigate()

    useEffect(() => {
        getMemos(1).then(setMemos)
        getMemosPageCount().then(setMaxPage)
    }, [])

    // 次のページor前のページに遷移できるかどうかのフラグ
    const canNextPage: boolean = page < maxPage
    const canPrevPage: boolean = page > 1
    // ページ遷移のボタンをクリックした場合に実行
    // 遷移可能な場合はpageを更新、IndexeDBから新しいページのレコードを取得しmemosを更新する
    const movePage = (targetPage: number) => {
        if (targetPage < 1 || maxPage < targetPage) {
            return
        }
        setPage(targetPage)
        getMemos(targetPage).then(setMemos)
    }


    return (
        <>
            <HeaderArea>
                <Header title="履歴">
                    <Link to="/editor">
                        エディタに戻る
                    </Link>
                </Header>
            </HeaderArea>
            <Wrapper>
                {/* memosの中にある配列の要素をReactの要素に変換する */}
                {memos.map(memo => (
                    // メモをクリックした時の処理
                    // setTextを使用しテキスト履歴のテキストで更新し、navigateでエディタ画面に遷移する。
                    <Memo
                        key={memo.datetime}
                        onClick={() => {
                            setText(memo.text)
                            navigate('/editor')
                        }}
                    >
                        <MemoTitle>{memo.title}</MemoTitle>
                        <MemoText>{memo.text}</MemoText>
                    </Memo>
                ))}
            </Wrapper>

            <Paging>
                <PagingButton
                    onClick={() => movePage(page - 1)}
                    disabled={!canPrevPage}
                >
                    ＜
                </PagingButton>
                    {page} / {maxPage}
                    <PagingButton
                        onClick={() => movePage(page + 1)}
                        disabled={!canNextPage}
                    >
                        ＞
                    </PagingButton>
            </Paging >
        </>
    )
}
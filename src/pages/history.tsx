import * as React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from '../components/button'
// useHistory:Reactのカスタムフックでhistoryオブジェクトを返す。
// historyはブラウザの履歴を扱うためのAPIを提供
import {
    Link,
    useNavigate,
} from 'react-router-dom'
import styled from "styled-components";
import { Header } from '../components/header'
import {
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
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
    padding: 0 1 rem;
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

export const History: React.FC = () => {
    const [memos, setMemos] = useState<MemoRecord[]>([])

    useEffect(() => {
        getMemos().then(setMemos)
    }, [])


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
                <Memo key={memo.datetime}>
                    <MemoTitle>{memo.title}</MemoTitle>
                    <MemoText>{memo.text}</MemoText>
                </Memo>
            ))}
        </Wrapper>
        </>
    )
}
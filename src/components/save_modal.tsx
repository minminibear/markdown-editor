import * as React from "react";
import styled from "styled-components";
import { Button } from './button';

const { useState } = React;

const Wrapper = styled.div`
    align-items: center;
    background-color: #0002;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
`

const Modal = styled.div`
    background: #fff;
    padding:1rem;
    width:32rem;
`
const TitleInput = styled.input`
    width: 29rem;
    padding: 0.5rem;
`

const Control = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 1rem;
    `
    // 保存時の処理関数と、キャンセル時の処理関数をパラメーターに指定する。
    // 保存時の処理関数は引数にタイトルを指定する。
    interface Props {
    onSave: (title: string)=> void
    onCancel: () => void
}

export const SaveModal: React.FC<Props> = props => {
    const { onCancel, onSave } = props
    const [title, setTitle] = useState(new Date().toISOString())

    return (
        <Wrapper>
            <Modal>
                <p>テキストの内容を保存します。</p>
                <p>保存内容のテキストを入力して「保存」ボタンを押してください。</p>
                <p>
                    {/* タイトルとタイトルの変更関数を渡して編集可能にする */}
                    <TitleInput
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </p>
                <Control>
                    <Button onClick={onCancel} cancel>
                        キャンセル
                    </Button>
                    <Button onClick={() => onSave(title)}>
                        保存
                    </Button>
                </Control>
            </Modal>
        </Wrapper>
    )
}
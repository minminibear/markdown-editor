import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: dodgerblue;
    border: node;
    box-shadow: node;
    color: white;
    font-size: 1rem;
    height: 2rem;
    min-width: 5rem;
    padding: 0 1rem;
    
    &.cancel {
        background: white;
        border: 1px solid gray ;
        color: gray;
    }
    `
// クリック時の関数と中のテキストを渡すとスタイリングされたボタンを返す
interface Props {
    cancel?: boolean // cancelというパラメーターを指定しなくても良い
    children: string //ボタン内に表示するテキスト
    onClick: () => void
}

export const Button: React.FC<Props> = (props) => (
    <StyledButton onClick={props.onClick} className={props.cancel ? 'cancel' : ''}>
        {props.children}
    </StyledButton>
)
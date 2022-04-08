import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '../components/button'
// useHistory:Reactのカスタムフックでhistoryオブジェクトを返す。
// historyはブラウザの履歴を扱うためのAPIを提供

export const History: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <h1>History</h1>
            <Button onClick={() => navigate('/editor')}>
                {/* history.push('/editor')と記述すると指定されたパスに遷移できます */}
                エディタへ戻る
            </Button>
        </>
    )
}
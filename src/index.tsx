import * as React from 'react'
import { createRoot } from 'react-dom/client'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from './pages/history'
import { useStateWithStorage } from './hooks/use_with_storage'

const GlobalStyle = createGlobalStyle`
    body * {
        box-sizing: border-box;
    }
`

const StorageKey = '/editor:text'

const container = document.getElementById('app');

const root = createRoot(container);

// useStateを使用するためにMainを関数化する
const Main: React.FC = () => {
    const [text, setText] = useStateWithStorage('', StorageKey)

    return (
        <>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path='/editor' element={<Editor
                    text={text}
                    setText={setText}
                    />}>
                    </Route>
                    <Route path='/history' element={<History
                        setText={setText}
                    />}>
                    </Route>
                    <Route path="*" element={<Navigate to="/editor" replace />} />
                </Routes>
            </Router>
        </>
    )
}

root.render(<Main />);

// やったこと
// react-router v6をインストールしているため、教材と一部書き方が異なる箇所がある
// <BrowserRouter><Routes>で囲う
// Route→Routeへ、exactは削除、elementを追加
// Redirect→Navigateへ。 pathを削除してreplaceを追加　→　エラーになる

// HashRouter と BrowserRouter について
// 教材ではHashRouterを使用しているが、V6での書き方はBrowserRouter？
// https://reactrouter.com/docs/en/v6/api#overview
// →公式では使用しないことを強くおすすめしますと書いてある。
// →SRで質問したらURLをサーバーに送信すべきではないため、個人で使用する分には問題ないけど、デプロイとかをする場合はBrowserRouterを使用するのが無難。


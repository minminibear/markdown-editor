import * as React from 'react'
import { render } from 'react-dom'
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

const GlobalStyle = createGlobalStyle`
    body * {
        box-sizing: border-box;
    }
`

const Main = (
    <>
        <GlobalStyle />
        <Router>
            <Routes>
                <Route path="/editor" element={<Editor />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<Navigate to="/editor" replace /> } />
                {/* Navigateは適当なパス 例）/fooにアクセスしても定義されていないので/editorになる */}
            </Routes>
        </Router>
    </>
)

render(Main, document.getElementById('app'))

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


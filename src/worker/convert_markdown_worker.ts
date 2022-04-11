// import * as marked from 'marked'
import { marked } from 'marked';
// カリキュラムは上記の記述だったが、この式は呼び出し可能ではないと言われ、
// 公式ドキュメントに書いてあった方法を真似したらできた。(2行目の方)

import * as sanitizeHtml from 'sanitize-html';


const worker: Worker = self as any
// self as anyと書くことでTypeScriptでチェックが行われず、アクセス出来てビルドすることができる。
// const worker: Worker = ...というように書くとworkerという変数はWorkerという型だと定義する

worker.addEventListener('message', (event) => {
    const text = event.data
    const html = sanitizeHtml(marked(text), { allowedTags:
    [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2'] })
    worker.postMessage({ html })
    // postMessage関数を呼び出し→メインスレッドへ処理結果を送信
    // resultというキーに受け取ったデータを格納して返す
})
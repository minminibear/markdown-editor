const worker: Worker = self as any
// self as anyと書くことでTypeScriptでチェックが行われず、アクセス出来てビルドすることができる。
// const worker: Worker = ...というように書くとworkerという変数はWorkerという型だと定義する

worker.addEventListener('message', (event) => {
    console.log('Worker Received:', event.data) //メインスレッドのデータ(data)を出力

    let count: number = 1
    while (count < 1000000000){
        count++
    }
    worker.postMessage({ result: event.data})
    // postMessage関数を呼び出し→メインスレッドへ処理結果を送信
    // resultというキーに受け取ったデータを格納して返す
})
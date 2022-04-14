// const { collapseTextChangeRangesAcrossMultipleVersions } = require("typescript")
// →間違えた？カリキュラムのどこにもない。 

// キャッスの名前を定義
// キャッシュAPIはキャッシュ名に応じて別のキャッシュを提供してくれる
// キャッシュの内容をリセットしたい場合はキャッシュ名を変更することで新しい状態にできる
const CacheName = 'Cache:v1'

// self：サービスワーカー自身を指す
//  addEventListener で各イベントにコールバックを登録する。 
// install activate はライフサイクルの各イベントを指します

self.addEventListener('install', (event) => {
    console.log('ServiceWorker install:', event)
})

self.addEventListener('activate', (event) => {
    console.log('ServiceWorker activate:', event)
})

const networkFallingBackToCache = async (request) => {
    // 定義した名前でキャッシュを開く
    const cache = await caches.open(CacheName)
    try {
        const response = await fetch(request) //fetchリクエストを実行してレスポンスを取得する
        await cache.put(request, response.clone())//レスポンスの内容をキャッシュに保存(レスポンスの内部で一度しか読み取りできない処理があるため)
        console.log('Fetch 成功')

        return response //レスポンスを呼び出し元に返却する
    } catch (err) {
        // リクエスト時にエラーが発生した場合は、エラーを表示して、キャッシュの内容を返却する
        console.error(err)
        return cache.match(request)
    }
}

// fetchイベント時に事項する処理を登録
// fetch:ネットワークなどを経由してリソースを取得するために使用するAPT
self.addEventListener('fetch', (event) => {
    console.log('Fetch to:', event.request.url) //リクエストの内容を表示
    // event.respondWith(fetch(event.request))
    // ネットワークリクエストを行って結果をメインスレッドに戻す処理
    // event.respondWith:非同期処理(Promise)の実行終了まで待機してくれるメソッド

    // ネットワークorキャッシュからレスポンスが返却されるようになる
    event.respondWith(networkFallingBackToCache(event.request))
})

// サビースワーカーの登録がサーバー起動にしか動いてない？？


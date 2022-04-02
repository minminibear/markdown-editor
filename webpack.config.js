const path = require('path')

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: 'dist/',
    }
}

// moduleのrulesセクションでwebpackに対してビルド時に追加で行う処理を記述。
// test：.tsで終わるファイルに対して
// use: ts-loaderを実行する
// exclude:node-modules配下のファイル(＝外部ライブラリ)は除外

// entry:最初に読み込むファイルを指定。 
// 指定されたファイルから別のファイルを読み込む処理が書かれていると、webpack はそれらのファイルも自動的に読み込んで、最終的に1つのファイルとして出力。

// output:出力するファイルの設定
// webpack.config.js の置いてあるディレクトリにある distに対して、index.js で出力。 また、変換する際は JavaScript 内に書かれている相対パスのリソースへ自動的に dist/ を追加。
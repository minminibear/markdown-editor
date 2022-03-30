const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: 'dist/',
    }
}

// entry:最初に読み込むファイルを指定。 
// 指定されたファイルから別のファイルを読み込む処理が書かれていると、webpack はそれらのファイルも自動的に読み込んで、最終的に1つのファイルとして出力。

// output:出力するファイルの設定
// webpack.config.js の置いてあるディレクトリにある distに対して、index.js で出力。 また、変換する際は JavaScript 内に書かれている相対パスのリソースへ自動的に dist/ を追加。 
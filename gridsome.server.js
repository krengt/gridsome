// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require('fs')

module.exports = function (api) {
  api.loadSource(({ getCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const articles = getCollection('Articles')

    for (const article of articles.findNodes()) {
      let date

      if (article.created) {
        // 1: 最初から created が書かれている場合はそのまま利用
        date = article.created
      } else {
        const dateStrings = article.fileInfo.name.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2})[-_]?(.+)?/)

        if (dateStrings) {
          // 2: ファイル名が以下の場合は Date にする
          //   2-1: yyyy-mm-dd
          //   2-2: yyyy-mm-dd-12, yyyy-mm-dd_bar
          const tempDate = new Date(dateStrings[1])

          if (dateStrings[2]) {
            // 2-2-a: yyyy-mm-dd 以降が数値の場合はそれ自体
            let offset = parseInt(dateStrings[2], 10)

            if (!offset) {
              // 2-2-b: yyyy-mm-dd 以降が数値以外の場合は文字列長+10分
              offset = dateStrings[2].length + 10
            }

            // 上記 offset 分だけずらす
            tempDate.setMinutes(offset)
          }

          date = tempDate.getTime()
        } else {
          // 3: これら以外の場合はファイルの情報から作成日を取得
          const stats = fs.statSync(article.internal.origin)
          date = stats.ctimeMs
        }
      }

      article.created = new Date(date)
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}

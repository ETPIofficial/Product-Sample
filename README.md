# Product-Sample
新商品ごとの各プラットフォーム掲載イメージ（社内確認用）。

1. `products/<商品名>/` を作り、`product.json` と画像を置く（`sample-oshirifuki` をコピー）
2. `node build.mjs`
3. `docs/index.html` をブラウザで開く（商品・プラットフォーム・PC/スマホを切替）

レイアウト変更は `platforms.mjs`。対応: 楽天(PC/SP) / TikTok(SP) / Yahoo(PC/SP) / Amazon(PC/SP) / 公式(PC/SP)

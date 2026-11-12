// 各プラットフォームの見た目。ここだけ編集すればレイアウト変更可。レスポンシブ1ファイルでPC/スマホ両対応。
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const yen = n => '¥' + Number(n).toLocaleString('ja-JP');
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
const off = p => Math.round((1 - p.price / p.listPrice) * 100);
const specTable = p => `<table class="spec">${Object.entries(p.specs || {}).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table>`;
const bullets = p => `<ul>${p.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
const img = (p, i = 0) => `<img src="${esc(p.images[i] ?? p.images[0])}" alt="">`;
const thumbs = p => `<div class="thumbs">${p.images.map((_, i) => img(p, i)).join('')}</div>`;

const base = `*{box-sizing:border-box}body{margin:0;font-family:-apple-system,"Hiragino Sans","Yu Gothic",Meiryo,sans-serif;color:#222}
img{max-width:100%;display:block}.thumbs{display:flex;gap:6px;margin-top:8px}.thumbs img{width:56px;border:1px solid #ddd}
.spec{border-collapse:collapse;width:100%}.spec th,.spec td{border:1px solid #ddd;padding:8px;text-align:left;font-size:14px}.spec th{background:#f5f5f5;width:30%}
.wrap{max-width:1100px;margin:0 auto;padding:16px}.cols{display:grid;grid-template-columns:420px 1fr;gap:32px}
@media(max-width:768px){.cols{grid-template-columns:1fr;gap:12px}.wrap{padding:12px}}`;

const page = (p, css, body) => `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.name)}</title><style>${base}${css}</style></head><body>${body}</body></html>`;

export const platforms = {
  rakuten: { label: '楽天市場', devices: ['desktop', 'mobile'], render: p => page(p, `
.hd{background:#bf0000;color:#fff;padding:10px 16px;font-weight:700;font-size:22px}.shop{background:#f5f5f5;padding:8px 16px;font-size:13px}
.price{color:#bf0000;font-size:32px;font-weight:700}.old{color:#888;text-decoration:line-through;font-size:14px}.pt{color:#bf0000;font-size:13px}
.btn{display:block;width:100%;background:#bf0000;color:#fff;border:0;padding:16px;font-size:18px;font-weight:700;border-radius:4px;margin-top:12px}
.rv{color:#f90;font-size:14px}h1{font-size:20px;line-height:1.4}`, `
<div class="hd">楽天市場</div><div class="shop">${esc(p.shop)} &gt; ${esc(p.brand)}</div>
<div class="wrap"><div class="cols"><div>${img(p)}${thumbs(p)}</div><div>
<h1>【送料無料】${esc(p.name)}</h1><div class="rv">${stars(p.rating)} ${p.rating}（${p.reviews}件）</div>
<div class="old">${yen(p.listPrice)}</div><div class="price">${yen(p.price)} <small style="font-size:14px">税込</small></div>
<div class="pt">ポイント ${Math.floor(p.price / 100)}倍 / ${Math.floor(p.price * .01)}pt獲得</div>${bullets(p)}
<button class="btn">買い物かごに入れる</button></div></div>
<h2>商品説明</h2><p>${esc(p.description)}</p><h2>商品情報</h2>${specTable(p)}</div>`) },

  yahoo: { label: 'Yahoo!ショッピング', devices: ['desktop', 'mobile'], render: p => page(p, `
.hd{background:#ff0033;color:#fff;padding:10px 16px;font-weight:700;font-size:20px}.price{font-size:30px;font-weight:700;color:#ff0033}
.pay{display:inline-block;background:#ff0033;color:#fff;font-size:12px;padding:2px 6px;border-radius:3px}
.btn{display:block;width:100%;background:#ff0033;color:#fff;border:0;padding:16px;font-size:18px;font-weight:700;border-radius:24px;margin-top:12px}
.rv{color:#f90;font-size:14px}h1{font-size:18px;line-height:1.4}`, `
<div class="hd">Yahoo!ショッピング</div>
<div class="wrap"><div class="cols"><div>${img(p)}${thumbs(p)}</div><div>
<div style="font-size:13px;color:#666">${esc(p.shop)}</div><h1>${esc(p.name)}</h1><div class="rv">${stars(p.rating)} ${p.rating}（${p.reviews}）</div>
<div class="price">${yen(p.price)}<small style="font-size:13px;color:#666"> 税込</small></div>
<div><span class="pay">PayPay</span> ${Math.floor(p.price * .01)}pt相当（1%）</div>${bullets(p)}
<button class="btn">カートに入れる</button></div></div>
<h2>商品説明</h2><p>${esc(p.description)}</p><h2>商品情報</h2>${specTable(p)}</div>`) },

  amazon: { label: 'Amazon', devices: ['desktop', 'mobile'], render: p => page(p, `
.hd{background:#131921;color:#fff;padding:12px 16px;font-weight:700;font-size:22px}.sub{background:#232f3e;color:#fff;padding:6px 16px;font-size:13px}
.price{font-size:28px;color:#b12704}.old{color:#565959;font-size:14px}.rv{color:#de7921;font-size:14px}h1{font-size:22px;font-weight:400;line-height:1.4}
.buy{border:1px solid #ddd;border-radius:8px;padding:14px;margin-top:12px}.b1,.b2{display:block;width:100%;border:0;padding:12px;border-radius:20px;font-size:15px;margin-top:8px}
.b1{background:#ffd814}.b2{background:#ffa41c}.prime{color:#00a8e1;font-weight:700;font-size:13px}`, `
<div class="hd">amazon.co.jp</div><div class="sub">お届け先を選択</div>
<div class="wrap"><div class="cols"><div>${img(p)}${thumbs(p)}</div><div>
<div style="color:#007185;font-size:13px">ブランド: ${esc(p.brand)}</div><h1>${esc(p.name)}</h1><div class="rv">${p.rating} ${stars(p.rating)} <span style="color:#007185">${p.reviews}個の評価</span></div><hr>
<span style="color:#cc0c39;font-size:22px">-${off(p)}%</span> <span class="price">${yen(p.price)}</span> <span class="old">参考価格: ${yen(p.listPrice)}</span>
<div class="prime">✓prime 無料配送</div>${bullets(p)}
<div class="buy"><button class="b1">カートに入れる</button><button class="b2">今すぐ買う</button></div></div></div>
<h2>商品の説明</h2><p>${esc(p.description)}</p><h2>商品の情報</h2>${specTable(p)}</div>`) },

  tiktok: { label: 'TikTok Shop', devices: ['mobile'], render: p => page(p, `
body{background:#000;color:#fff;max-width:480px;margin:0 auto;padding-bottom:72px}.imgw{background:#111}.pad{padding:14px}
.price{color:#fe2c55;font-size:26px;font-weight:700}.old{color:#999;text-decoration:line-through;font-size:13px}.tag{background:#fe2c55;border-radius:3px;font-size:12px;padding:2px 6px}
.bar{position:fixed;bottom:0;left:0;right:0;max-width:480px;margin:0 auto;background:#111;padding:10px 14px;display:flex;gap:10px}
.bar button{flex:1;border:0;padding:14px;border-radius:6px;font-size:16px;font-weight:700}.c{background:#333;color:#fff}.n{background:#fe2c55;color:#fff}
.spec th{background:#222;color:#fff;border-color:#333}.spec td{border-color:#333}`, `
<div class="imgw">${img(p)}</div><div class="pad">
<div class="price">${yen(p.price)} <span class="old">${yen(p.listPrice)}</span> <span class="tag">${off(p)}%OFF</span></div>
<h1 style="font-size:17px;line-height:1.4">${esc(p.name)}</h1><div style="color:#aaa;font-size:13px">${stars(p.rating)} ${p.rating} · ${p.reviews}件 · ${esc(p.shop)}</div>
${bullets(p)}<h3>商品情報</h3>${specTable(p)}<p style="color:#ccc">${esc(p.description)}</p></div>
<div class="bar"><button class="c">カートに追加</button><button class="n">今すぐ購入</button></div>`) },

  official: { label: '公式ショップ', devices: ['desktop', 'mobile'], render: p => page(p, `
.hd{border-bottom:1px solid #eee;padding:16px;text-align:center;font-weight:700;letter-spacing:.2em;font-size:20px}
.hero{background:#f4f7fa;text-align:center;padding:32px 16px}.hero h1{font-size:28px;margin:0 0 8px}.price{font-size:26px;font-weight:700}
.btn{display:block;width:100%;background:#222;color:#fff;border:0;padding:16px;font-size:16px;margin-top:16px}h2{border-left:4px solid #222;padding-left:10px}`, `
<div class="hd">${esc(p.brand)}</div><div class="hero"><h1>${esc(p.name)}</h1><p>${esc(p.tagline)}</p></div>
<div class="wrap"><div class="cols"><div>${img(p)}${thumbs(p)}</div><div>
<div class="price">${yen(p.price)} <small style="font-size:13px;color:#666">税込</small></div>${bullets(p)}<button class="btn">カートに入れる</button></div></div>
<h2>商品説明</h2><p>${esc(p.description)}</p><h2>商品仕様</h2>${specTable(p)}</div>`) },
};

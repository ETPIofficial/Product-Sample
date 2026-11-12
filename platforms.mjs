// 各プラットフォームの見た目。ここだけ編集すればレイアウト変更可。レスポンシブ1ファイルでPC/スマホ両対応。
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const yen = n => Number(n).toLocaleString('ja-JP');
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
const price = (p, k) => p.prices?.[k] ?? p.price;
const imgs = p => p.images.map(esc);
const bullets = p => `<ul>${p.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
const specTable = p => `<table class="spec">${Object.entries(p.specs || {}).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table>`;
const gallery = (p, k) => { const L = (p.platformImages?.[k] || p.images).map(esc); return `<div class="gal"><img class="big" src="${L[0]}" alt=""><div class="th">${L.map(s => `<img src="${s}" alt="" onclick="this.closest('.gal').querySelector('.big').src=this.src">`).join('')}</div></div>`; };
const descImgs = p => `<div class="di">${(p.descImages || p.images).map(esc).map(s => `<img src="${s}" alt="">`).join('')}</div>`;
const R = (p, s) => p.reviews ? s : '';
const variants = p => p.variants.map(v => `<div class="var"><span>${esc(v.label)}</span><b>${yen(v.price)}円</b></div>`).join('');
const selects = p => Object.entries(p.options).map(([k, v]) => `<label class="lb">${esc(k)}</label><select><option>選択</option>${v.map(o => `<option>${esc(o)}</option>`).join('')}</select>`).join('');

const base = `*{box-sizing:border-box}body{margin:0;background:#fff;font-family:-apple-system,"Hiragino Sans","Yu Gothic",Meiryo,sans-serif;color:#222;font-size:14px}
img{max-width:100%;display:block}ul{padding-left:18px}.spec{border-collapse:collapse;width:100%}.spec th,.spec td{border:1px solid #ddd;padding:10px;text-align:left;font-size:13px;vertical-align:top}.spec th{background:#f6f6f6;width:22%}
.th{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.th img{width:56px;height:56px;object-fit:cover;border:1px solid #ddd;cursor:pointer}.di{max-width:800px;margin:16px auto}.di img{width:100%}button,select{font:inherit}select{width:100%;padding:12px;border:1px solid #888;border-radius:4px;background:#fff}
a{color:inherit;text-decoration:none}.wrap{max-width:1200px;margin:0 auto;padding:16px}.mob{display:none}
@media(max-width:768px){.wrap{padding:10px}.pc{display:none!important}.mob{display:block}}`;
const page = (p, css, body) => `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.name)}</title><style>${base}${css}</style></head><body>${body}</body></html>`;

export const platforms = {
  rakuten: { label: '楽天市場', devices: ['desktop', 'mobile'], render: p => page(p, `
.hd{display:flex;align-items:center;gap:14px;padding:10px 20px;border-bottom:1px solid #eee}.logo{color:#bf0000;font-weight:700;font-size:26px;letter-spacing:-1px}
.sr{flex:1;max-width:420px;display:flex;border:2px solid #bf0000;border-radius:3px}.sr span{flex:1;padding:9px;color:#999}.sr i{background:#bf0000;width:44px}
.nav{display:flex;gap:18px;font-size:11px;color:#444}.bar{background:#f3f3f3;padding:8px 20px;font-size:12px}.sh{text-align:center;padding:22px;font-size:34px;font-weight:700;letter-spacing:2px}
.cols{display:grid;grid-template-columns:480px 1fr 280px;gap:28px}.gal .big{width:100%;border:1px solid #eee}.gal .th{margin-top:10px}
h1{font-size:18px;line-height:1.5;margin:0 0 10px}.pr{font-size:30px;font-weight:700;color:#bf0000}.pr small{font-size:15px}.rt{color:#f90}.pt{color:#bf0000;font-size:13px;margin:6px 0 12px}
.var{display:flex;justify-content:space-between;border:1px solid #ccc;padding:11px 14px;margin-bottom:6px;border-radius:3px}
.box{border:1px solid #ddd;padding:16px;border-radius:4px;align-self:start}.b1,.b2{display:block;width:100%;padding:14px;border-radius:3px;font-weight:700;font-size:15px;margin-top:8px}
.b1{background:#fff;border:2px solid #bf0000;color:#bf0000}.b2{background:#bf0000;border:2px solid #bf0000;color:#fff}.fav{margin-top:8px;text-align:center;border:1px solid #ccc;padding:10px;border-radius:3px}
.fx{display:none}h2{background:#f3f3f3;padding:10px 14px;font-size:16px;margin:28px 0 12px}
@media(max-width:768px){.cols{grid-template-columns:1fr;gap:12px}.hd{padding:8px 12px}.nav,.sr{display:none}.logo{font-size:22px}.sh{font-size:22px;padding:12px}
.fx{display:flex;position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #ddd;padding:8px;gap:8px;z-index:9}.fx button{flex:1;padding:13px;font-weight:700;border-radius:3px}body{padding-bottom:70px}}`, `
<div class="hd"><span class="logo">Rakuten</span><div class="sr"><span>キーワードから探す</span><i></i></div><div class="nav"><span>買い物かご</span><span>お知らせ</span><span>閲覧履歴</span><span>お気に入り</span><span>購入履歴</span></div></div>
<div class="bar">${esc(p.shop)} ＞ カテゴリトップ</div><div class="sh">${esc(p.brand)}</div>
<div class="wrap">${descImgs(p)}<div class="cols"><div>${gallery(p)}</div><div>
<h1>${esc(p.name)}</h1>${R(p, `<div class="rt">${stars(p.rating)} <span style="color:#222">${p.rating}（${p.reviews}件）</span></div>`)}<div style="color:#666;font-size:12px;margin:6px 0">商品番号：${esc(p.code)}</div>
<div class="pr">${yen(p.price)}<small>円〜</small></div><div class="pt">${Math.floor(p.price * .01)}ポイント 1倍</div>${bullets(p)}<b>商品詳細を選択</b><div style="margin-top:8px">${variants(p)}</div></div>
<div class="box pc"><div class="pr">${yen(p.price)}<small>円〜</small></div><button class="b1">かごに追加</button><button class="b2">購入手続きへ</button><div class="fav">☆ お気に入りに追加</div></div></div>
<h2>商品説明</h2><p>${esc(p.description)}</p><h2>商品情報</h2>${specTable(p)}</div>
<div class="fx"><button class="b1">かごに追加</button><button class="b2">購入手続きへ</button></div>`) },

  yahoo: { label: 'Yahoo!ショッピング', devices: ['desktop', 'mobile'], render: p => page(p, `
body{background:#f2f2f2}.hd{background:#fff;display:flex;align-items:center;gap:16px;padding:12px 24px}.logo{color:#f03;font-weight:800;font-size:24px}.logo small{color:#222;font-size:14px;font-weight:400;margin-left:6px}
.sr{flex:1;max-width:520px;background:#f2f2f2;border-radius:24px;padding:12px 18px;color:#999}.cp{background:#ffe04a;text-align:center;padding:10px;font-weight:700}
.bc{padding:14px 24px;color:#0a5fc0;font-size:13px}.st{padding:0 24px 12px;display:flex;gap:12px;align-items:center;font-size:13px}.star{color:#f90}
.cols{display:grid;grid-template-columns:1fr 300px;gap:20px;max-width:1200px;margin:0 auto;padding:0 16px}.card{background:#fff;border-radius:12px;padding:20px}
.main{display:grid;grid-template-columns:360px 1fr;gap:24px}.gal .big{width:100%}h1{font-size:15px;line-height:1.6;font-weight:400;margin:0 0 12px}.pr{color:#c0392b;font-size:30px;font-weight:700}.pr small{font-size:15px}
.cpn{background:#f6f6f6;border-radius:8px;padding:14px;margin:12px 0}.cpn b{font-size:16px}.var{display:flex;justify-content:space-between;border:1px solid #ddd;padding:11px;border-radius:8px;margin:6px 0}
.cart{display:block;width:100%;background:#f03;color:#fff;border:0;padding:15px;font-size:16px;font-weight:700;border-radius:28px;margin-top:14px}.gift{display:block;width:100%;background:#fff;color:#f03;border:1px solid #f03;padding:13px;font-size:15px;border-radius:28px;margin-top:8px}
@media(max-width:768px){.cols,.main{grid-template-columns:1fr}.hd{padding:10px 12px}.sr{padding:9px 14px}.bc,.st{padding-left:12px;padding-right:12px}.cols{padding:0 8px}.card{padding:14px}}`, `
<div class="hd"><span class="logo">YAHOO! <small>ショッピング</small></span><div class="sr">何をお探しですか？</div></div>
<div class="cp">【初回限定】最大半額アプリクーポン配布中！</div><div class="bc">${esc(p.shop)} ＞ ${esc(p.category[0])}</div>
<div class="st"><b>${esc(p.shop)}</b>${R(p, `<span class="star">${stars(p.rating)}</span><b>${p.rating}</b>`)}</div>
<div class="cols"><div><div class="card"><div class="main"><div>${gallery(p)}</div><div><h1>${esc(p.name)}</h1>${R(p, `<div style="color:#666;font-size:13px">★ ${p.reviews}件のレビュー</div>`)}
<div style="margin-top:12px;font-weight:700">価格</div><div class="pr">${yen(price(p, 'yahoo'))}<small>円</small> <small style="color:#555;font-weight:400">送料無料（東京都）</small></div>
<div class="cpn"><div style="font-size:12px">お買い物が初めての方へ アプリ限定</div><b>50%OFFクーポン</b></div><b>バリエーション</b>
${variants(p)}</div></div></div>
<div class="card" style="margin-top:16px">${descImgs(p)}</div>
<div class="card" style="margin-top:16px"><b>商品情報</b>${specTable(p)}</div></div>
<div class="card pc" style="align-self:start"><div style="font-weight:700">価格</div><div class="pr">${yen(price(p, 'yahoo'))}<small>円</small></div><div style="font-size:13px;margin:8px 0">送料無料（東京都）<br>4%獲得（${Math.floor(price(p, 'yahoo') * .036)}pt）</div><button class="cart">カートに入れる</button><button class="gift">ギフトで贈る</button></div></div>
<div class="mob" style="position:sticky;bottom:0;background:#fff;padding:10px"><button class="cart" style="margin:0">カートに入れる</button></div>`) },

  amazon: { label: 'Amazon', devices: ['desktop', 'mobile'], render: p => page(p, `
.hd{background:#131921;color:#fff;display:flex;align-items:center;gap:14px;padding:10px 16px}.logo{font-weight:700;font-size:22px}.logo small{font-size:11px;color:#ddd}
.sr{flex:1;background:#fff;color:#777;padding:10px;border-radius:4px;border-right:40px solid #febd69}.sub{background:#232f3e;color:#fff;padding:8px 16px;font-size:13px;display:flex;gap:16px}
.bc{font-size:12px;color:#565959;padding:12px 0}.cols{display:grid;grid-template-columns:520px 1fr 280px;gap:24px}.gal{display:flex;flex-direction:row-reverse;gap:10px}.gal .big{flex:1;min-width:0;align-self:flex-start;height:auto;aspect-ratio:1;object-fit:contain}
.gal .th{flex-direction:column}h1{font-size:22px;font-weight:400;line-height:1.4;margin:0}.lk{color:#007185;font-size:13px;margin:6px 0}.rt{color:#de7921}hr{border:0;border-top:1px solid #ddd;margin:12px 0}
.pr{font-size:28px}.pr sup{font-size:14px}.off{color:#cc0c39;font-size:26px}.prime{color:#00a8e1;font-weight:700;font-size:13px}.buy{border:1px solid #ddd;border-radius:8px;padding:16px;align-self:start}
.stock{color:#007600;font-size:18px;margin:10px 0}.b1,.b2{display:block;width:100%;border:0;padding:11px;border-radius:20px;font-size:14px;margin-top:10px}.b1{background:#ffd814}.b2{background:#ffa41c}
@media(max-width:768px){.cols{grid-template-columns:1fr;gap:12px}.gal{flex-direction:column}.gal .th{flex-direction:row}.hd{padding:8px 12px}h1{font-size:17px}.sub{overflow:hidden;white-space:nowrap}}`, `
<div class="hd"><span class="logo">amazon<small>.co.jp</small></span><div class="sr">Amazon.co.jp で検索</div><span class="pc">カート</span></div>
<div class="sub"><span>すべて</span><span>ランキング</span><span>ベビー</span><span>ヘルス</span></div>
<div class="wrap"><div class="bc">${p.category.map(esc).join(' › ')}</div><div class="cols"><div>${gallery(p, 'amazon')}</div><div>
<h1>${esc(p.name)}</h1><div class="lk">${esc(p.brand)} のストアを表示</div>${R(p, `<div class="rt">${p.rating} ${stars(p.rating)} <span style="color:#007185">(${p.reviews})</span></div>`)}<hr>
${p.listPrice ? `<span class="off">-${Math.round((1 - price(p, 'amazon') / p.listPrice) * 100)}%</span> ` : ''}<span class="pr"><sup>￥</sup>${yen(price(p, 'amazon'))}</span><div class="prime">✓prime 無料配送</div><hr>
<b>この商品について</b>${bullets(p)}</div>
<div class="buy"><div class="pr"><sup>￥</sup>${yen(price(p, 'amazon'))}</div><div style="font-size:13px;margin:8px 0">無料配送 <b>土曜日</b><br>お届け先: 東京</div><div class="stock">在庫あり</div>
<select><option>数量: 1</option></select><button class="b1">カートに入れる</button><button class="b2">今すぐ買う</button></div></div>
<h2 style="font-weight:400">商品の情報</h2>${specTable(p)}</div>`) },

  tiktok: { label: 'TikTok Shop', devices: ['mobile'], render: p => page(p, `
body{background:#000;color:#fff;max-width:480px;margin:0 auto;padding-bottom:76px}.top{display:flex;justify-content:space-between;padding:12px 14px;position:absolute;width:100%;max-width:480px;z-index:2;font-size:20px}
.sl{cursor:grab;user-select:none}.sl img{-webkit-user-drag:none}.sl{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;background:#111}.sl::-webkit-scrollbar{display:none}.sl img{flex:0 0 100%;width:100%;aspect-ratio:1;object-fit:cover;scroll-snap-align:center}
.ct{position:absolute;right:12px;bottom:12px;background:rgba(0,0,0,.6);color:#fff;font-size:12px;padding:3px 9px;border-radius:12px}.pad{padding:14px}.pr{color:#fe2c55;font-size:26px;font-weight:700}.pr small{font-size:14px}.tag{background:#fe2c55;border-radius:3px;font-size:11px;padding:2px 6px;color:#fff}
h1{font-size:15px;line-height:1.5;margin:8px 0}.mt{color:#aaa;font-size:12px}.sel{background:#161616;border-radius:8px;padding:12px;margin:12px 0;display:flex;justify-content:space-between}
.bar{position:fixed;bottom:0;left:0;right:0;max-width:480px;margin:0 auto;background:#111;padding:10px 14px;display:flex;gap:10px;align-items:center}.bar span{font-size:12px;text-align:center;width:44px;color:#ccc}
.bar button{flex:1;border:0;padding:14px;border-radius:6px;font-size:15px;font-weight:700}.c{background:#333;color:#fff}.n{background:#fe2c55;color:#fff}
.spec th{background:#1a1a1a;color:#ddd;border-color:#333}.spec td{border-color:#333}.var{display:flex;justify-content:space-between;border:1px solid #333;padding:10px;border-radius:6px;margin-bottom:6px}`, `
<div class="top"><span>‹</span><span>⋯</span></div><div class="sw" style="position:relative"><div class="sl" onscroll="this.nextElementSibling.textContent=(Math.round(this.scrollLeft/this.clientWidth)+1)+'/${(p.platformImages?.tiktok || p.images).length}'">${(p.platformImages?.tiktok || p.images).map(s => `<img src="${esc(s)}" alt="">`).join('')}</div><span class="ct">1/${(p.platformImages?.tiktok || p.images).length}</span></div><div class="pad">
<div class="pr"><small>¥</small>${yen(p.price)}<small>〜</small> <span class="tag">送料無料</span></div><h1>${esc(p.name)}</h1>
<div class="mt">${R(p, `${stars(p.rating)} ${p.rating} · ${p.reviews}件のレビュー · `)}${esc(p.shop)}</div>
<div class="sel"><span>サイズ・パック数を選択</span><span>›</span></div>${variants(p)}${bullets(p)}<h3>商品詳細</h3>${specTable(p)}<p style="color:#ccc">${esc(p.description)}</p></div>
<script>const s=document.querySelector('.sl');let d,x,l;
s.onpointerdown=e=>{if(e.pointerType!='mouse')return;d=1;x=e.clientX;l=s.scrollLeft;s.style.scrollSnapType='none';try{s.setPointerCapture(e.pointerId)}catch{}};
s.onpointermove=e=>{if(d)s.scrollLeft=l-(e.clientX-x)};
s.onpointerup=s.onpointercancel=()=>{if(!d)return;d=0;s.style.scrollSnapType='';const w=s.clientWidth;s.scrollTo({left:Math.round(s.scrollLeft/w)*w,behavior:'smooth'})};</script>
<div class="bar"><span>🏪<br>ストア</span><span>💬<br>相談</span><button class="c">カートに追加</button><button class="n">今すぐ購入</button></div>`) },

  official: { label: '公式ショップ', devices: ['desktop', 'mobile'], render: p => page(p, `
body{color:#32373c}.ann{background:#ececec;text-align:center;padding:10px;font-size:13px}.hd{display:flex;align-items:center;justify-content:space-between;padding:14px 32px}
.logo{font-weight:800;font-size:22px;letter-spacing:1px}.nv{display:flex;gap:22px;font-size:13px}.cols{display:grid;grid-template-columns:1fr 1fr;gap:48px;max-width:1100px;margin:0 auto;padding:24px 16px}
.gal .big{width:100%}h1{font-size:24px;line-height:1.5;font-weight:500;margin:0 0 14px}.pr{color:#0b4fbf;font-size:20px;font-weight:600}.mt{color:#888}.lb{display:block;margin:18px 0 6px;font-weight:500}
.opt{background:#f0f0f0;border-radius:6px;padding:14px 16px;margin-bottom:8px}.opt b{color:#0b4fbf}.b1,.b2{display:block;width:100%;padding:15px;border-radius:4px;font-size:15px;margin-top:10px}
.b1{background:#fff;border:1px solid #0b4fbf;color:#0b4fbf}.b2{background:#0b4fbf;border:1px solid #0b4fbf;color:#fff}.ft{background:#f5f5f5;text-align:center;padding:28px;font-size:12px;color:#666;margin-top:32px}
@media(max-width:768px){.cols{grid-template-columns:1fr;gap:16px;padding:12px}.hd{padding:12px}.nv{display:none}h1{font-size:18px}}`, `
<div class="ann">新規会員登録で500円分プレゼント！</div><div class="hd"><span class="logo">${esc(p.brand)}</span><div class="nv"><span>ホーム</span><span>商品一覧</span><span>衛生シート</span><span>synapusyuコレクション</span><span>サポート</span></div><span>🛒</span></div>
<div class="cols"><div>${gallery(p)}</div><div><h1>${esc(p.name.replace(/ SN-OM01$/, ''))}</h1>
<div class="mt">価格</div><div class="pr">￥${yen(p.price)}${p.variants.length > 1 ? ' より' : ''}</div><div style="font-size:11px">消費税込み</div>
<div class="lb" style="color:#888">内容量</div><div style="color:#888;font-size:13px">${esc(p.specs['内容量'])}</div>${selects(p)}
<label class="lb">料金オプション</label><div class="opt"><b>1回限りの購入</b><br><b>￥${yen(p.price)}</b></div>${(p.subscription || []).map(s => `<div class="opt"><b>${esc(s.label)}</b> ${esc(s.off)}<br><b>￥${yen(s.price)}</b></div>`).join('')}
<button class="b1">カートに追加する</button><button class="b2">${p.subscription ? '定期購入する' : '今すぐ購入'}</button>
<h3 style="margin-top:28px">商品概要</h3>${specTable(p)}</div></div><div class="ft">2026 © ${esc(p.brand)}</div>`) },
};

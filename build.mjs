// 使い方: node build.mjs → docs/ に出力（docs/index.html が確認用ビューア）
import { readdirSync, readFileSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { platforms } from './platforms.mjs';

rmSync('docs', { recursive: true, force: true });
cpSync('logos', 'docs/logos', { recursive: true });
const products = [];
for (const slug of readdirSync('products', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
  const dir = `products/${slug}`;
  if (!existsSync(`${dir}/product.json`)) continue;
  const p = JSON.parse(readFileSync(`${dir}/product.json`, 'utf8'));
  cpSync(dir, `docs/${slug}`, { recursive: true });
  for (const [key, pf] of Object.entries(platforms)) writeFileSync(`docs/${slug}/${key}.html`, pf.render(p));
  products.push({ slug, name: p.name });
}
const meta = Object.fromEntries(Object.entries(platforms).map(([k, v]) => [k, { label: v.label, devices: v.devices }]));
writeFileSync('docs/index.html', `<!doctype html><meta charset="utf-8"><title>商品サンプル確認</title>
<style>body{margin:0;font-family:sans-serif;background:#ddd}header{background:#fff;padding:10px;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
#f{display:block;margin:12px auto;background:#fff;border:1px solid #999;height:calc(100vh - 80px);max-width:100%}</style>
<header>商品 <select id=p></select> プラットフォーム <select id=k></select> <select id=d><option value=desktop>PC (1280)<option value=mobile>スマホ (390)</select></header><iframe id=f></iframe>
<script>const P=${JSON.stringify(products)},M=${JSON.stringify(meta)},$=i=>document.getElementById(i);
$('p').innerHTML=P.map(x=>'<option value='+x.slug+'>'+x.name).join('');$('k').innerHTML=Object.entries(M).map(([k,v])=>'<option value='+k+'>'+v.label).join('');
function go(){const m=M[$('k').value];if(!m.devices.includes($('d').value))$('d').value=m.devices[0];
$('d').options[0].disabled=!m.devices.includes('desktop');$('f').style.width=$('d').value=='mobile'?'390px':'1280px';
$('f').src=$('p').value+'/'+$('k').value+'.html';location.hash=[$('p').value,$('k').value,$('d').value]}
['p','k','d'].forEach(i=>$(i).onchange=go);const h=location.hash.slice(1).split(',');if(h[0]){$('p').value=h[0];$('k').value=h[1];$('d').value=h[2]}go()</script>`);
console.log(`built ${products.length} product(s)`);

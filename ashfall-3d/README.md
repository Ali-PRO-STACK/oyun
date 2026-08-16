# Ashfall Protocol — 3D

Minecraft esintili blok dünyada geçen 3D aksiyon prototipi.

## Kamera
- `1`: Birinci şahıs
- `2`: Üçüncü şahıs
- `3`: Tepeden görünüm

## Kontroller
- `WASD`: hareket
- `Shift`: koş
- `Space`: zıpla
- `Sol tık`: saldır
- `P`: duraklat
- Fare hareketi: bakış

## Çalıştırma
Modern bir tarayıcıda `index.html` dosyasını doğrudan açabilir veya yerel HTTP sunucusu kullanabilirsin. Three.js CDN üzerinden ES module olarak yüklenir.

## Mimari
`src/core.js` oyun durumları, input, kayıt ve saat altyapısını içerir. `world.js` voxel dünya üretimini, `player.js` oyuncu ve kamera sistemini, `entities.js` düşman/boss/loot sistemlerini, `ui.js` HUD ve menüleri yönetir.

## Durum
Bölüm 1-5'in oynanabilir çekirdeği GitHub branch'ine eklendi. Sonraki iterasyonlarda envanter, craft, blok kırma/koyma, görevler, daha gelişmiş boss AI, ses, efektler ve testler genişletilecektir.

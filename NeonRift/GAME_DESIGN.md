# Neon Rift — Oyun Tasarımı

## Vizyon

Neon Rift, kısa ve yoğun combat odaklı run'ları; build oluşturma, risk/reward ve kalıcı ilerleme ile birleştiren top-down action roguelite'dır.

## Oyuncu fantezisi

Oyuncu hızlı, ölümcül ve giderek güçlenen bir Rift Runner gibi hissetmelidir. Her saldırı okunabilir, her hasar anlaşılır ve her upgrade anlamlı olmalıdır.

## Temel loop

`Explore → Fight → Collect → Upgrade → Risk/Reward → Boss → Extract → Permanent Progress`

## Oyuncu

Başlangıç loadout:

- Primary weapon
- Secondary weapon
- Dash
- 2 active ability slot
- Base shield
- Base health

### Combat kararları

Oyuncu hareket ederek güvenli konum alır, düşman telegraph'larını okur, dash'i savunma veya pozisyon alma için kullanır ve cooldown'larını kritik anlara saklar.

## Run progression

Enemy defeat XP verir. Level-up sırasında sınırlı seçeneklerden bir upgrade seçilir. Böylece aynı silah farklı modifier kombinasyonlarıyla farklı build'lere dönüşebilir.

## Permanent progression

Hub'a dönüldüğünde meta currency ile:

- yeni ekipman
- başlangıç bonusları
- ability unlock'ları
- difficulty tier'ları
- utility upgrade'leri

açılır.

## Risk / reward

Her Rift'te güvenli rota ile daha tehlikeli ama daha ödüllü rota arasında seçim yapılır. Elite ve event odaları daha iyi loot sağlayabilir fakat run riskini artırır.

## Düşmanlar

### Swarmer
Hızlı melee baskısı. Düşük health.

### Shooter
Uzakta durur, okunabilir projectile saldırıları yapar.

### Charger
Saldırı öncesi belirgin telegraph ile yüksek hasarlı rush yapar.

### Controller
Alan etkileri ve hareket kısıtlama kullanır.

### Tank
Yavaş ve dayanıklı; oyuncunun pozisyonunu zorlar.

### Elite
Base archetype üzerine modifier ve özel saldırı ekler.

## Bosslar

İlk vertical slice iki boss içerir.

### Rift Warden
Yakın/uzak saldırı kombinasyonu. Arena kontrolü ve 3 phase.

### Null Titan
Daha ağır pattern'ler, hazard alanları ve enrage phase'i.

Boss tasarımında amaç bullet spam değil, okunabilir pattern ve pozisyonlama kararlarıdır.

## Rift yapısı

Bir run ortalama 15–25 dakika hedeflenir.

Room türleri:

- Combat
- Reward
- Elite
- Event
- Shop
- Boss

## Ekonomi

### Credits
Run içi alışveriş.

### Rift Shards
Permanent progression için ana meta kaynak.

### Upgrade Materials
Belirli kalıcı sistemleri geliştirmek için kullanılır.

## Item kategorileri

- Weapon
- Ability
- Armor
- Upgrade
- Consumable
- Currency
- Quest Item
- Collectible

## Difficulty

İlk üç tier:

### Tier 1 — Initiate
Temel enemy davranışları.

### Tier 2 — Breach
Daha fazla elite, daha yüksek enemy damage/health ve daha sık encounter.

### Tier 3 — Collapse
Gelişmiş modifier'lar, daha agresif AI ve boss pattern yoğunluğu.

Difficulty yalnızca enemy health multiplier'ı değildir; encounter composition ve mechanic complexity de artar.

## Feedback

Her oyuncu eylemi en az iki feedback kanalından desteklenmelidir:

- görsel
- ses
- animasyon
- kamera
- UI

Hasar, kritik vuruş, kill, level-up ve boss phase değişimleri özellikle güçlü feedback alır.

## Tutorial

İlk run'ın ilk odalarında:

1. Movement
2. Aim/attack
3. Dash
4. Ability
5. Pickup
6. Upgrade
7. Room exit
8. Boss telegraph

sıralı olarak öğretilir.

## Victory / Game Over

Boss yenildiğinde sonuç ekranı:

- run süresi
- düşman sayısı
- kazanılan kaynaklar
- build özeti
- yeni unlock'lar

gösterir.

Ölüm ekranı da aynı şekilde kaybedilen run'ın değerini görünür kılar; kalıcı progression korunur.

## Başarımlar

Örnek challenge'lar:

- İlk bossu yen
- Hasar almadan elite yen
- Bir run'da belirli miktarda shard topla
- Belirli bir ability kombinasyonuyla boss yen
- Yüksek difficulty tamamla

## UX hedefi

Oyuncu herhangi bir anda şu üç soruya cevap verebilmelidir:

1. Neredeyim?
2. Şu anda ne yapmalıyım?
3. Başarırsam ne kazanacağım?

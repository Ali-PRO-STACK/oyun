# Neon Rift

> Unity 6 LTS / C# ile geliştirilen top-down action roguelite.

## Durum

Bu klasör Stage 1 mimari kurulumunun başlangıç noktasıdır. Mevcut kökteki Three.js tabanlı **Gece Yarışı** oyunu korunur ve bu proje onu silmeden `NeonRift/` altında yeni, modüler bir Unity ürün hattı olarak geliştirir.

## Hedef

Oyuncunun Rift adı verilen boyutsal bölgelere girip savaşması, kaynak toplaması, geçici build kararları vermesi, boss yenmesi ve kalıcı ilerleme kazanmasıdır.

## Teknik temel

- Unity 6 LTS
- C#
- URP
- Unity Input System
- ScriptableObject tabanlı veri tanımları
- Composition + açık servis composition
- Play Mode ve Edit Mode testleri

## Aşamalar

1. Architecture — tamamlanıyor
2. Core Systems
3. Gameplay
4. Content
5. UI & Audio
6. Persistence
7. Polish
8. QA & Release

## Git akışı

- `main`: stabil dal
- `develop`: entegrasyon
- `feature/*`: özellik
- `fix/*`: hata düzeltmesi

Detaylı mimari için `ARCHITECTURE.md`, oyun tasarımı için `GAME_DESIGN.md`, yol haritası için `ROADMAP.md`, test yaklaşımı için `TEST_PLAN.md` dosyalarına bakın.

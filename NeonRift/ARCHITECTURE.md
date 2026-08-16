# Neon Rift — Mimari Dokümantasyon

## 1. Mimari hedef

Neon Rift; gameplay, veri tanımları, sunum, kalıcılık ve platform servislerini birbirinden ayıran modüler bir Unity 6 LTS projesidir. Amaç, yaklaşık 10.000 anlamlı C# satırına ulaşırken kodu yapay olarak büyütmemek ve her sistemin gerçek gameplay değerine sahip olmasını sağlamaktır.

## 2. Katmanlar

```text
Presentation
  UI / Animation / VFX / Camera / Audio
        ↓ observes
Application
  GameFlow / Run / Objectives / Progression / Economy
        ↓ uses
Gameplay
  Player / Combat / Weapons / Abilities / Enemies / Bosses / Levels
        ↓ consumes
Domain & Data
  Definitions / Runtime State / Balance / Save DTOs
        ↓
Infrastructure
  Scene Loading / Persistence / Input Adapter / Platform Services
```

Bağımlılık yönü mümkün olduğunca yukarıdan aşağıdır. Gameplay doğrudan UI prefablarına veya ekran controller'larına bağımlı olmayacaktır.

## 3. Ana modüller

| Modül | Sorumluluk |
|---|---|
| Core | bootstrap, servis composition, lifecycle, logging |
| GameFlow | game state machine, run lifecycle, scene transitions |
| Input | Input System adapter'ları ve action abstraction |
| Player | movement, health, shield, dash, stats, equipment |
| Combat | damage contracts, hit detection, status effects |
| Weapons | weapon definitions, runtime weapon behavior, projectiles |
| Abilities | active abilities, cooldowns, modifiers |
| Enemies | enemy composition, stats, perception, targeting |
| AI | state machine, behavior decisions, navigation helpers |
| Bosses | phases, telegraphs, patterns, arenas |
| Levels | rift, room, encounter, spawn and reward flow |
| Objectives | reusable objective contracts and progress |
| Inventory | runtime inventory, equipment, stacking |
| Items | item definitions and item effects |
| Progression | XP, run levels, permanent unlocks |
| Economy | currency balances and validated transactions |
| UI | screen/panel presentation and HUD |
| Audio | music, SFX, audio events and snapshots |
| Save | versioned serialization and migration |
| Settings | user preferences and persistence |
| Animation | animator-facing presentation adapters |
| Effects | VFX, screen effects and feedback |
| Camera | gameplay camera and camera feedback |
| Utilities | small reusable, domain-neutral helpers |
| Debug | development-only diagnostics |
| Tests | pure logic and integration coverage |

## 4. Bootstrap ve servis composition

`GameBootstrapper` uygulama başlangıcında kalıcı servisleri oluşturur. İlk sürümde ağır bir dependency injection framework kullanılmaz. Bunun yerine açık bir composition root kullanılır.

Önerilen servisler:

- `IGameStateService`
- `ISceneLoader`
- `IInputService`
- `IAudioService`
- `ISaveService`
- `ISettingsService`
- `IEconomyService`
- `IProgressionService`
- `IRunService`
- `IRandomService`

Servisler kendi yaşam döngülerini yönetir ve scene değişiminde transient gameplay nesnelerinden ayrılır.

## 5. Game state machine

Durumlar:

```text
Boot
MainMenu
Loading
Hub
RunStarting
Playing
Paused
Boss
Victory
GameOver
Results
```

State geçişleri tek bir state machine tarafından doğrulanır. UI doğrudan state değişkenini değiştirmez; application/game-flow API'sini çağırır.

## 6. Player

Player bir monolitik `PlayerController` yerine composition kullanır:

```text
PlayerRoot
├── PlayerController
├── PlayerMovement
├── PlayerCombat
├── PlayerHealth
├── PlayerShield
├── PlayerDash
├── PlayerStats
├── PlayerEquipment
├── PlayerAbilityController
├── PlayerInteraction
├── PlayerAnimationController
└── PlayerFeedbackController
```

Runtime state component'lerde tutulur. Statik ayarlar ScriptableObject tanımlarından gelir.

## 7. Combat

Temel sözleşmeler:

```text
IDamageSource
IDamageReceiver
DamageInfo
DamageResult
DamageType
HealthComponent
ShieldComponent
CombatResolver
HitDetector
AttackDefinition
Projectile
ProjectileSpawner
StatusEffect
```

Damage çözümü merkezi bir `CombatResolver` üzerinden geçer. UI health bar'ı gameplay health state'inin sahibi değildir.

## 8. Enemy ve AI

Enemy prefabları ortak component'lerden oluşur. Davranışlar state machine ile yönetilir:

```text
Idle → Patrol → Alert → Chase → Attack → Recover
                         ↘ Searching
Attack/Chase → Stunned → Recover
Any living state → Dead
```

Perception, targeting ve attack execution birbirinden ayrılır. Böylece aynı AI framework'ü farklı enemy definition'larıyla kullanılabilir.

## 9. Boss

Boss sistemi phase-driven olacaktır:

```text
BossController
├── BossPhaseController
├── BossPatternSelector
├── BossAttackPattern
├── BossArenaController
├── BossTelegraphSystem
└── BossHealthBarPresenter
```

Pattern seçiminde phase, boss health, cooldown ve arena state dikkate alınabilir. Telegraph'lar saldırıdan önce oyuncuya okunabilir bilgi verir.

## 10. Rift ve room sistemi

Bir run şu yapıya sahiptir:

```text
Rift
├── Entry
├── Combat Room(s)
├── Reward Room(s)
├── Elite Room(s)
├── Event Room(s)
├── Shop
└── Boss Arena
```

İlk vertical slice için 8–12 room template kullanılacaktır. Procedural sistem tamamen deterministik olmak zorunda değildir; test edilebilirlik için seed desteği sağlanacaktır.

## 11. Veri mimarisi

ScriptableObject yalnızca statik/configurable definition için kullanılır. Runtime mutable state doğrudan asset'in içine yazılmaz.

Örnekler:

- `WeaponDefinition`
- `AbilityDefinition`
- `EnemyDefinition`
- `BossDefinition`
- `ItemDefinition`
- `LootTableDefinition`
- `RiftDefinition`
- `DifficultyDefinition`
- `UpgradeDefinition`
- `AudioEventDefinition`

## 12. Run progression vs meta progression

Run state:

- XP
- temporary level
- temporary upgrades
- temporary relics
- run-only currency/effects

Meta state:

- permanent upgrades
- unlocks
- meta currency
- difficulty tiers
- achievements

Run kaybedildiğinde permanent state geri alınmaz.

## 13. Economy

Tüm para hareketleri `IEconomyService` üzerinden doğrulanır:

```text
CanAfford
TrySpend
Grant
GetBalance
```

UI, player veya shop doğrudan currency integer'larını değiştirmez.

## 14. UI

UI gameplay state'in sahibi değildir.

```text
UIManager
├── UIScreen
├── UIPanel
├── HUDController
├── MainMenuController
├── PauseMenuController
├── SettingsController
├── InventoryController
├── UpgradeController
├── ResultsController
├── GameOverController
├── VictoryController
├── BossHUDController
├── NotificationController
└── TooltipController
```

Ekranlar state/event gözlemler ve yalnızca command/application API çağırır.

## 15. Save mimarisi

Save DTO'ları Unity scene referanslarından bağımsızdır.

```text
SaveData
├── SaveVersion
├── PlayerProgressionData
├── SettingsData
├── RunData
├── StatisticsData
└── AchievementData
```

Kaydetme sırası:

1. Runtime state snapshot
2. Validation
3. DTO oluşturma
4. Serialize
5. Temporary file
6. Replace/commit

İleride schema migration için `SaveVersion` zorunludur.

## 16. Event stratejisi

Event'ler yalnızca gerçek decoupling sağladıkları yerde kullanılacaktır.

Örnekler:

- `PlayerDamaged`
- `PlayerDied`
- `EnemyDefeated`
- `ObjectiveProgressed`
- `ObjectiveCompleted`
- `CurrencyChanged`
- `LevelUp`
- `BossPhaseChanged`
- `RunCompleted`
- `RunFailed`

Event abonelikleri lifecycle ile birlikte kurulup kaldırılmalıdır.

## 17. Scene stratejisi

```text
Boot.unity
MainMenu.unity
Hub.unity
Rift.unity
Test_Combat.unity
Test_AI.unity
Test_UI.unity
```

Boot persistent services'i başlatır. Main Menu, Hub ve Rift gameplay presentation'ı ayrı scene'lerdir. Test scene'leri üretim akışından bağımsızdır.

## 18. Performans

- Projectile, VFX ve sık yaratılan pickup'lar için pooling
- Per-frame allocation'dan kaçınma
- Cached component/reference kullanımı
- AI update frekansının kontrollü olması
- Scene-wide search kullanımının yasaklanması veya çok sınırlı tutulması
- Profiling ile doğrulanmamış karmaşık optimizasyonlardan kaçınma

Hedef: orta sınıf PC'de 60 FPS.

## 19. Test sınırları

Pure logic için Edit Mode testleri; scene/component etkileşimleri için Play Mode testleri kullanılacaktır.

Öncelikli testler:

- damage
- health/death
- shield
- inventory
- economy
- XP
- difficulty scaling
- objective lifecycle
- save/load
- save migration
- loot generation
- cooldown
- boss phase transitions

## 20. Namespace standardı

Ana namespace:

`NeonRift`

Örnekler:

- `NeonRift.Core`
- `NeonRift.GameFlow`
- `NeonRift.Player`
- `NeonRift.Combat`
- `NeonRift.AI`
- `NeonRift.UI`

## 21. Architecture riskleri

### Risk: Singleton çoğalması
Çözüm: composition root ve açık servis kontratları.

### Risk: UI/gameplay coupling
Çözüm: UI yalnızca presenter/observer rolünde.

### Risk: ScriptableObject runtime mutation
Çözüm: definition/runtime state ayrımı.

### Risk: Procedural generation'ın test edilememesi
Çözüm: seed destekli generator ve pure selection logic.

### Risk: Save corruption
Çözüm: versioning, validation ve atomic replacement.

### Risk: AI performansı
Çözüm: perception/decision update frequency kontrolü ve profiling.

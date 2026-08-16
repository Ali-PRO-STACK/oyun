# Neon Rift — Test Planı

## Test seviyeleri

### Edit Mode
Unity bağımsız veya hafif bağımlı domain/application logic.

### Play Mode
Component lifecycle, scene integration, input, combat, AI ve UI akışları.

### Manual QA
UX, görsel feedback, controller, performance ve uzun session testleri.

## Kabul kriterleri

| Alan | Kontrol |
|---|---|
| Player | Hareket, dash, input buffering, death |
| Combat | Damage, shield, crit, status, cooldown |
| Enemy AI | Perception, chase, attack, stun, death |
| Boss | Phase, telegraph, transition, defeat |
| Levels | Room completion, exits, rewards |
| Objectives | Progress, completion, failure |
| Inventory | Add/remove/stack/equip/capacity |
| Economy | Spend/grant/balance validation |
| Progression | XP, level-up, permanent unlock |
| Save | Write/read/version/migration |
| UI | HUD, menus, controller navigation |
| Audio | Music state, SFX, volume settings |
| Victory | Boss defeat → results → progression |
| Game Over | Death → results → preserved meta progress |
| Performance | 60 FPS target, GC spikes, pooling |
| Edge Cases | duplicate rewards, null data, scene reload |

## Öncelikli unit testler

- DamageCalculator deterministic results
- Health reaches zero exactly once
- Shield absorbs configured damage
- Inventory stacking obeys max stack
- Inventory rejects over-capacity insertion
- Economy rejects insufficient funds
- XP produces correct level transition
- Difficulty scaling produces expected values
- Cooldown cannot become negative
- Objective reaches completion exactly once
- Loot table respects weights and seed
- Save DTO round-trips correctly
- Save migration transforms older schema
- Boss phase changes occur at correct thresholds

## Play Mode testleri

1. Boot → Main Menu
2. Main Menu → Hub
3. Hub → Run
4. Run → Pause → Resume
5. Run → Boss
6. Boss → Victory
7. Player death → Game Over
8. Restart → New Run
9. Settings → Save → Restart → Settings restored
10. Meta upgrade → New run → Upgrade preserved

## Combat QA

- Player cannot damage dead targets twice.
- Dead enemies cannot continue attacking.
- Projectiles clean up correctly.
- Damage feedback does not allocate unbounded objects.
- Invulnerability frames behave deterministically.

## AI QA

- Enemy acquires player inside perception range.
- Enemy loses target when appropriate.
- Enemy does not attack through invalid state.
- Stunned enemy cannot execute attack.
- Dead enemy unsubscribes from events.

## Save QA

- First save works.
- Multiple sequential saves work.
- Missing optional field receives safe default.
- Unknown future field does not crash current loader.
- Corrupt save is detected and handled.
- No Unity scene object reference is serialized directly.

## Performance QA

Measure:

- CPU frame time
- GPU frame time
- GC allocations/frame
- active enemy count
- projectile count
- particle count
- memory usage

Run tests on a representative mid-range PC and during a maximum-intensity boss encounter.

## Release checklist

- [ ] Clean compile
- [ ] No console errors in normal flow
- [ ] No critical warnings caused by project code
- [ ] All critical automated tests pass
- [ ] All save tests pass
- [ ] Main gameplay loop pass
- [ ] Bosses pass
- [ ] UI pass
- [ ] Audio pass
- [ ] 60 FPS target reviewed
- [ ] Known limitations documented

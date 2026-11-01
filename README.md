# THE HIVE — a PS1-style Aliens fan campaign (browser)

Play: https://mysticalg.github.io/aliens-ps1-game/

An 8-chapter campaign told in order with in-engine cutscenes. The subtitles are paraphrased and the audio is original WebAudio.

1. **Drop**: dropship descent, then drive the APC to the colony (steer and dodge wrecks).
2. **Hadley's Hope**: sweep the colony with the motion tracker, cut through the welded door, clear the facehuggers in the medlab, then follow the blip to Newt.
3. **The Nest**: the reactor ambush as Vasquez, with smartgun and rifle and ammo counters. Then Ripley drives the APC in to rescue the squad.
4. **Ops Siege**: place the sentry guns, weld the door, and hold out; the ceiling breaches at the end.
5. **Medlab**: Ripley is unarmed and locked in with facehuggers. Set off the fire sensor and survive until help arrives.
6. **Escape**: crawl the vents (Newt falls), then Ripley goes alone with a taped rifle and flamer, under a timer.
7. **Queen's Lair**: the original level.
8. **Sulaco**: a power-loader duel with the queen. Push her into the airlock.

Chapters unlock as you progress (saved in localStorage). Add `?all` to the URL to unlock everything.

Controls:
- **Desktop**: WASD to move, mouse to aim, click or Space to fire, Q to swap weapons, R to reload, E/G for grenades (where available).
- **Phone**: on-screen stick and FIRE button. Portrait is supported.

Sources live in `src/*.js`. Build with `cat src/*.js > campaign.js`. Test with `node tests/camp.js desktop|phone 1,2,3 outdir`.

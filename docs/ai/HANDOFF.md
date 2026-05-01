# HANDOFF

## ゲーム概要

- Flappy Bird風の横スクロールWebゲーム。
- 一度完成扱い。
- 技術は HTML / CSS / JavaScript / Canvas。
- Canvasサイズは `800 x 450`。
- 画像素材あり。
- 操作は通常ジャンプのみ。
- 起動直後は開始前画面で待機する。
- 強ジャンプは削除済み。

## ファイル構成

- `flappy-bird/` - 現在のFlappy Bird風ゲーム本体。
  - `index.html` - Canvasと基本HTML。
  - `style.css` - 画面中央配置とCanvas表示サイズ。
  - `game.js` - ゲーム本体。
  - `audio.js` - Web Audio APIによる効果音。
  - `assets/` - 画像素材。
    - `background.png`
    - `background_wide.png`
    - `player.png`
    - `obstacle_top.png`
    - `obstacle_bottom.png`
- `docs/ai/` - 開発管理。
  - `CONVENTIONS.md`
  - `STATUS.md`
  - `HANDOFF.md`
  - `CODEX_LOG.md`
  - `PROGRESS.md`
  - `MEMORIES.md`
  - `TODO.md`
- `index.html` - GitHub Pagesのルートから `flappy-bird/` を開くための入口。

## 実装済み機能

- Canvas表示。
- 開始前画面。
- 背景、プレイヤー、障害物の画像表示。
- スペースキー / ポインター操作による通常ジャンプ。
- 四角判定による当たり判定。
- `debugMode` によるhitbox表示切り替え。
- スコア表示。
- ゲームオーバー表示。
- ゲームオーバー後の再スタート。
- DOMによるスコアHUD、開始前画面、ゲームオーバー画面。
- ジャンプ、スコア獲得、ゲームオーバーの効果音。
- Web Audio APIによる16ステップのゲーム中ループBGM。
- 横長Canvas向け背景画像。
- スマホ向けタップ操作表示とタッチ干渉防止。
- 初回障害物を `x = width - 200` から生成。
- スコアに応じた障害物速度上昇。

## 現在のパラメータ

- Canvas: `800 x 450`
- Player: `x: 90`, `y: 220`, `size: 48`
- `jumpPower = -6`
- `gravity = 0.45`
- `obstacleWidth = 56`
- `gapHeight = 145`
- `obstacleGapMargin = 70`
- `spawnInterval = 90`
- `minSpawnInterval = 42`
- `baseObstacleSpeed = 4`
- `obstacleSpeedIncreasePerScore = 0.2`
- `spawnIntervalDecreasePerScore = 0.8`
- `debugMode = false`

```js
const playerHitbox = {
  offsetX: 4,
  offsetY: 8,
  width: 40,
  height: 32,
};

const obstacleHitboxPadding = {
  left: 2,
  right: 2,
  top: 2,
  bottom: 2,
};
```

## 完成扱いの状態

- 難易度調整、UI改善、効果音、BGM、横長背景の追加まで完了。
- 現在のFlappy Bird風ゲームは一度完成扱い。
- 追加改善は必要になった時だけ検討する。

## 任意の追加改善候補

- 隙間サイズも徐々に狭くする。

## 開発ルール

- ChatGPTは設計・判断・Codex指示作成を担当する。
- Codexは分析・実装・確認を担当する。
- いきなり実装しない。
- 実装前は「現状分析 → 実装案 → 質問 → 停止」の順で進める。
- 作業は小さく変更する。
- 作業完了時は `docs/ai/PROGRESS.md` を更新する。
- 外部検索が必要な場合は検索提案を行い、人間が Grok / Gemini で検索する。
- 検索結果はそのまま使わず、分析してから使う。

## 次チャット用の開始文

このプロジェクトは `/Users/kinjoushizuma/Documents/game` にあります。現在のゲーム本体は `flappy-bird/` にあります。最初に `docs/ai/CONVENTIONS.md`、`docs/ai/STATUS.md`、`docs/ai/HANDOFF.md`、`docs/ai/CODEX_LOG.md` を読んでください。以後、Codexは実装担当として、いきなり実装せず「現状分析 → 実装案 → 質問 → 停止」の順で進めてください。

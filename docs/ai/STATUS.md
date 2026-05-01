# STATUS

## 現在の状態

- Flappy Bird風の横スクロールWebゲーム。
- 一度完成扱い。
- ゲーム本体は `flappy-bird/` に配置。
- HTML / CSS / JavaScript / Canvas で実装。
- Canvasサイズは `800 x 450`。
- 画像素材を使った最小プロトタイプ。
- 操作は通常ジャンプのみ。
- 起動直後は開始前画面で待機する。
- 強ジャンプは削除済み。

## 実装済み

- Canvas表示。
- 開始前画面。
- 背景、プレイヤー、障害物の画像表示。
- スペースキー / ポインター操作によるジャンプ。
- 四角判定による当たり判定。
- `debugMode` によるhitbox表示切り替え。
- スコア表示。
- ゲームオーバーと再スタート。
- DOMによるスコアHUD、開始前画面、ゲームオーバー画面。
- ジャンプ、スコア獲得、ゲームオーバーの効果音。
- Web Audio APIによる16ステップのゲーム中ループBGM。
- 横長Canvas向け背景画像。
- スマホ向けタップ操作表示とタッチ干渉防止。
- スマホ画面に合わせてCanvasを最大化するフルスクリーン寄り表示。
- 初回障害物を `x = width - 200` から生成。
- スコアに応じた障害物速度上昇。

## 主要パラメータ

- Canvas: `800 x 450`
- Player: `x: 90`, `y: 220`, `size: 48`
- `jumpPower = -6`
- `gravity = 0.45`
- `baseObstacleSpeed = 4`
- `obstacleSpeedIncreasePerScore = 0.2`
- `gapHeight = 145`
- `obstacleGapMargin = 70`
- `spawnInterval = 90`
- `minSpawnInterval = 42`
- `spawnIntervalDecreasePerScore = 0.8`
- `obstacleWidth = 56`
- `debugMode = false`

## Hitbox

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

## 次にやること

- 新しい作業テーマを決める。

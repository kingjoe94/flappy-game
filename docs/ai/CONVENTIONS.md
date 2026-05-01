# CONVENTIONS

## Working Agreements

- Read `docs/ai/CONVENTIONS.md` before making changes.
- Update `docs/ai/PROGRESS.md` when finishing a task.
- Run tests after modifying source files.
- Keep changes small and reviewable.
- Ask for confirmation before adding new dependencies.

## Never

- Hardcode API keys or secrets.
- Edit files marked `[LOCK]` in `docs/ai/PROGRESS.md`.
- Rewrite working code without being asked.
- Create files in project root without reason.

## Project Context

Always check `docs/ai/` folder for:

- `CONVENTIONS.md` - coding rules, tech stack, build commands.
- `PROGRESS.md` - current status and who's working on what.
- `MEMORIES.md` - past decisions and why.
- `TODO.md` - task list.

## Code Style Defaults

- Keep files under 300 lines.
- Prefer editing existing files over creating new ones.
- No unnecessary comments.

## Roles

- Codex: implementation and code analysis.
- ChatGPT: design and instruction creation.
- Human: final decision.
- External AI such as Grok or Gemini: research.

## Absolute Rules

- Do not fill in missing specifications without instruction.
- Do not add features that were not requested.
- Ask questions whenever something is unclear.
- If there are multiple possible approaches, present options before implementation.
- Do not make changes just because they seem helpful.

## Prohibited Work

- Do not make large changes all at once.
- Do not handle multiple themes in one task.
- Do not write code based on guesses.
- Do not refactor without instruction.

## Work Principles

- Handle only one theme per task.
- Always inspect existing code before acting.
- Explain target areas before making changes.
- Report what changed after making changes.

## Required Flow Before Implementation

Before implementation, always follow this order:

1. Identify related code.
2. Explain current behavior.
3. Present implementation options if there are multiple.
4. Ask questions about unclear points.

Do not implement at this stage.
Implementation starts only after the human decides what to do.

## Implementation Rules

- Keep changes minimal.
- Do not break the existing structure.
- Clarify the scope of impact.

## Output Requirements

Always include:

- Changed files.
- Change details.
- How to verify behavior.
- Expected impact.

## 検索ポリシー

- 外部検索は自動で行わない。
- 必要な場合は、先に「検索提案」を行う。
- 検索は人間が Grok / Gemini で実行する。
- 検索用プロンプトを提示する。
- 検索結果はそのまま使わず、必ず分析してから使う。
- 推測で不足情報を補わない。

## Final Rule

If the design is unclear, do not implement.

## ゲーム開発ルール

### Game Development Rules

- まずは最小限に遊べる状態を作る。
- 1回の作業では、1つの変更テーマだけを扱う。
- 新しい機能を足す前に、今ある挙動を確認する。
- 大きく作り込む前に、実際に動かして違和感を見つける。
- ゲームの見た目、当たり判定、操作感、ルールは分けて考える。

### Asset Rules

- 画像素材は、必要に応じてCodex側で生成・編集する。
- ゲーム用画像は `assets/` に置く。
- Canvasで使うキャラクターや障害物は、透過PNGを基本にする。
- 画像サイズは、実際にゲーム内で表示するサイズに近づける。
- 透明な余白はできるだけ少なくする。
- 画像素材の変更とゲームロジックの変更は、原則として同時に行わない。

### Hitbox Rules

- 描画サイズと当たり判定サイズは分けて管理する。
- 当たり判定の値は、後から調整しやすいように定数化する。
- 最初は四角い当たり判定を使う。
- ピクセル単位の透明判定は、必要になった時だけ検討する。
- 当たり判定を調整する時は、デバッグ表示で枠を確認する。
- デバッグ表示は `debugMode` のような切り替え設定で管理する。
- 調整が終わったら、デバッグ表示は通常時非表示にする。

### Input And Feel Tuning

- ジャンプ力、重力、障害物の速度、出現間隔などは調整前提で設計する。
- 操作感に関わる値は、ファイル上部など分かりやすい場所で定数化する。
- 操作感を変える時は、一度に多くの値を変えない。
- 短押し、長押し、クリック、タッチなどの違いを分けて考える。
- 既存の操作感を壊さないように、変更前後の違いを確認する。

### Iteration Flow

- まず小さく作る。
- 次に実際に触って確認する。
- 違和感があれば、まず定数を調整する。
- 定数調整で足りない場合だけ、ロジックを変更する。
- 変更が終わったら、`docs/ai/PROGRESS.md` に記録する。

## 中断・再開ルール

- チャットが長くなった場合は中断してよい。
- 中断時は `docs/ai/HANDOFF.md` を最新状態に更新する。
- 再開時は新しいチャットで `HANDOFF.md` を貼る。
- 再開時に現在のフェーズ（例: 設計 / 実装 / 調整）を明示する。
- 状態説明を毎回やり直さない。

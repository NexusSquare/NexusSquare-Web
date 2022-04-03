# NexusSquareフロントエンド

大学生間の情報格差をなくすアプリ「NexusSquare」のフロントエンドのリポジトリです。

## Requirements

- Next.js(latest)
- Chakra UI(latest)

## Usage

### デバック

npm run dev

## functions

| url | 機能 |
| ---- | ---- |
| / | ログインページへのボタンと宣伝 |
| /login | ログインページ |
| /qa | Q&Aのトップ |
| /qa/category | カテゴリごとの質問表示画面 |
| /qa/all?sortBy=x&isDesc=y | 全ての質問(質問日時以外でも並べ替え可能) |
| /qa/ranking | アクセス数ランキング |
| /qa/result?title=x | 検索結果 |
| /qa/[qaId] | 質問のページ(回答もここからできる) |
| /qa/post | 質問の投稿ページ |
| /profile | プロフィール |
| /gift | プレゼント選択画面(必要？) |
| /privacy | プライバシー・ポリシー |
| /rule | 利用規約 |
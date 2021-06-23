# gohan-dekitayo

Discord のサーバーにあるボイスチャンネルに誰かが入室したら、任意の Slack Workspace のチャンネルへ通知を行います。

## 環境構築手順

1. Discord の Bot トークンを取得
2. Slack の Incoming Webhook URL を取得
3. `.env.default` をコピーして `.env` を作り `DISCORD_TOKEN` と `SLACK_WEBHOOK` を設定

### Discord Bot トークンの取得方法

1. https://discord.com/developers/applications から任意のアプリケーションを選択
2. 左側メニューから `BOT` を選択。開いたページで `Build-A-Bot` の欄に `TOKEN` があるので `Copy` ボタンをクリック

#### Discord Bot の作り方

<details><summary>クリックで開きます</summary>

1. https://discord.com/developers/applications > New Application をクリック
2. `NAME` に適当なお名前を記入 `Create`
3. 左側メニューから `BOT` を選択。開いたページで `Add Bot` をクリック (ポップアップが出るので `Yes, do its!` を選択する)
4. 左側メニューから `OAuth2` を選択。`OAuth2 URL Generator`から `bot` にチェックをつける
5. 下に URL が生成されるのでその URL を開き、自分の Discord サーバに追加してください
</details>

## デプロイ方法

`master` に push すると自動的にデプロイされます。

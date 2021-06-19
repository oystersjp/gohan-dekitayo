# gohan-dekitayo

Discordのサーバーにあるボイスチャンネルに誰かが入室したら、任意のSlack Workspaceのチャンネルへ通知を行います。

## 環境構築手順

1. Discordのbotトークンを取得
2. SlackのIncoming Webhook URLを取得
3. `.env.default` をコピーして `.env` を作り `DISCORD_TOKEN` と `SLACK_WEBHOOK` を設定

### Discord botの作り方

1. https://discord.com/developers/applications > New Applicationをクリック
2. `NAME` に適当なお名前を記入 `Create`
3. 左側メニューから `BOT` を選択。開いたページで `Add Bot` をクリック (ポップアップが出るので `Yes, do its!` を選択する)
4. 左側メニューから `OAuth2` を選択。`OAuth2 URL Generator`から `bot` にチェックをつける
5. 下にURLが生成されるのでそのURLを開き、自分のDiscordサーバに追加してください

#### Discord Botトークンの取得方法

1. https://discord.com/developers/applications から任意のアプリケーションを選択
2. 左側メニューから `BOT` を選択。開いたページで `Build-A-Bot` の欄に `TOKEN` があるので `Copy` ボタンをクリック

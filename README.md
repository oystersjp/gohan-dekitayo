# gohan-dekitayo

Discord のサーバーにあるボイスチャンネルに誰かが入室したら、任意の Slack Workspace のチャンネルへ通知を行います。

## 環境構築手順

1. Discord の Bot トークンを取得
2. Slack の Incoming Webhook URL を取得
3. `.env.default` をコピーして `.env` を作り `DISCORD_TOKEN` と `SLACK_WEBHOOK` を設定
4. `npm run dev` を実行

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

## セルフホスティング方法

1. heroku のアカウントを作る
1. この repository を fork する
1. fork した repository の github secret に HEROKU_API_KEY, HEROKU_EMAIL, DISCORD_TOKEN, SLACK_WEBHOOK を設定する
1. heroku_app_name(https://github.com/oystersjp/gohan-dekitayo/blob/c8dbf9937f954baf3d832408751527b1b9e089dc/.github/workflows/deploy-to-heroku.yml#L16)を変更する
1. 変更を master へ push し、deploy の github action を実行させる

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

1. この repository を fork する
2. [Fly.io](https://fly.io) のアカウントを作る
3. Local PC で flyctl コマンドを使ってアプリの設定を行う(FYI: [Hands-on with Fly.io](https://fly.io/docs/hands-on/install-flyctl/))

```sh
$ brew install flyctl
$ flyctl auth login
$ flyctl launch
Creating app in /Users/misato/ghq/github.com/oystersjp/gohan-dekitayo
An existing fly.toml file was found for app gohan-dekitayo
? Would you like to copy its configuration to the new app? Yes
Scanning source code
Detected a Dockerfile app
? Choose an app name (leaving blank will default to 'gohan-dekitayo')
? Select Organization: oysters (oysters)
App will use 'nrt' region as primary
Created app 'gohan-dekitayo' in organization 'oysters'
Admin URL: https://fly.io/apps/gohan-dekitayo
Hostname: gohan-dekitayo.fly.dev
? Would you like to set up a Postgresql database now? No
? Would you like to set up an Upstash Redis database now? No
Wrote config file fly.toml
? Would you like to deploy now? No
Validating /Users/misato/ghq/github.com/oystersjp/gohan-dekitayo/fly.toml
Platform: machines
✓ Configuration is valid
Your app is ready! Deploy with `flyctl deploy`
$ flyctl secrets set DISCODE_TOKEN=<your-discord-token>
$ flyctl secrets set SLACK_WEBHOOK=<your-slack-webhook>
$ flyctl scale count 1 # 通知が二重で届く場合は実行してください
$ flyctl deploy
```

4. 以下のコマンドを実行して、Deploy Token を発行する。この値を fork した repository の GitHub Actions secrets に `FLY_API_TOKEN` として保存する

```sh
$ flyctl tokens create deploy -x 999999h | pbcopy
```

5. 変更を `master` へ push し、deploy の github action を実行させる

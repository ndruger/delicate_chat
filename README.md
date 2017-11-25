# DelicateChat(α)

Elixirのアンチーパターンとそれで発生する問題時のErlangVMの状態を体験するためのWebチャット

## 発表スライドへのリンク(TODO)

## To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Install Node.js dependencies with `cd assets && yarn`
  * Start Phoenix endpoint with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## 対応済みアンチパターン

- 1. ユーザー入力から動的にAtomを生成する。
- 2. GenServerで処理量より多くのメッセージを定常的に受け取る。

## 対応予定アンチパターン

- GenServerでのinit/1でのコネクション接続によるエラー
- メモリリーク
- プロセスリーク
- NIFによるErlangVMクラッシュ


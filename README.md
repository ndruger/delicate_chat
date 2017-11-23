# DelicateChat

## To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Install Node.js dependencies with `cd assets && yarn`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## 対応済みアンチパターン

- 1. ユーザー入力から動的にAtomを生成する。
- 2. GenServerで処理量より多くのメッセージを定常的に受け取る。
- 3. 


## 将来的に対応する可能性のあるアンチパターン

- 末尾再帰最適化の妨害

- GenServerを利用したモジュールでinit/1にて、ネットワークコネクション確率などエラーになる可能性がある処理を直接行い、start_link()の呼び出し側に絶望を与える。
- receiveでマッチしないメッセージを受け取ることで、メールボックスのキューに入っているメッセージが増え続ける
  - GenServerではhanlde_cast/handle_callでマッチしないメッセージもreceiveで取り出してその後エラーログを吐くので発生しない。GenServerを使わずreceiveしてこの問題を起こすような自然な流れが思いつかない。これは止めとく？
- NIFを利用してErlangVMスケジューラーを止める。
- NIFを利用してErlangVMをクラッシュさせる。
- Large Binary(>64byte)をGCの発生頻度の少ないプロセスとメッセージでやりとりしてShared Heapのメモリリークを引き起こす。
- Processをリークさせる。どのパターンでリークさせるか・・・。
- Hot Code Loadingをローカル呼び出しのループをしているモジュールに適用してクラッシュさせる。
  - 通常GenServerを使うので起き辛い。自然に起きそうなケースがあるか考える。他のモジュールのローカルへの参照をGenServerのstateに入れてエラーになるパターンをする？

## 参考

- [How to Crash Erlang](http://prog21.dadgum.com/43.html)
- [Stuff Goes Bad: Erlang in Anger](https://www.erlang-in-anger.com/)
- [Designing for Scalability with Erlang/OTP](http://shop.oreilly.com/product/0636920024149.do)
- [すごいErlangゆかいに学ぼう！](https://www.amazon.co.jp/dp/B00MLUGZIS)

defmodule DelicateChat.XmlValidator do
  # Anti-Pattern 1: 動的にAtomを生成する。
  # ユーザー入力からAtomを作る。ユーザー入力は内容が制限さえてないので作成されるAtomに際限がなくなり、Atomは解放されないのでメモリを消費が増え続ける。
  # そもそも正常系であるxmlのバリデーションに:xmerl_scan.string/1で:exitをキャッチするのが正気ではない。
  # xmerlは"Erlang In Anger"でも名指しで書かれている有名なライブラリ
  # > If you use the xmerl library that ships with Erlang, consider open source alternatives2 or figuring the way to add your own SAX parser that can be safe
  def is_valid?(text) do
    try do
      x = text
      |> :binary.bin_to_list()
      |> :xmerl_scan.string()
      x |> inspect() |> IO.puts()
      true
    catch
      :exit, _ -> false
    end    
  end
end

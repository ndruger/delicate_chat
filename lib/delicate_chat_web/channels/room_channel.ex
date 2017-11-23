defmodule DelicateChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  # Anti-Pattern: 動的にAtomを生成する。
  # ユーザー入力からAtomを作る。ユーザー入力は内容が制限さえてないので作成されるAtomに際限がなくなり、Atomは解放されないのでメモリを消費が増え続ける。
  # そもそも正常系であるxmlのバリデーションに:xmerl_scan.string/1で:exitをキャッチするのが正気ではない。
  # xmerlは"Erlang In Anger"でも名指しで書かれている有名なライブラリ
  # > If you use the xmerl library that ships with Erlang, consider open source alternatives2 or figuring the way to add your own SAX parser that can be safe
  def is_valid_xml?(text) do
    try do
      text
      |> :binary.bin_to_list()
      |> :xmerl_scan.string()
      true
    catch
      :exit, _ -> false
    end    
  end

  def join("room:chat", _auth_msg, socket) do
    Logger.debug("RoomChannel.join")
    name = "nobody-#{(:rand.uniform() * 1000_00) |> round()}"
    socket2 = assign(socket, :name, name)
    {:ok, socket2}
  end

  # Anti-Pattern: Let it crashの誤解。他のメッセージ内容をハンドルせずにサーバとして「正常系」でもcrashさせる。
  def handle_in("new:msg", %{"type" => "text", "body" => body}, %Phoenix.Socket{assigns: %{name: name}} = socket) do
    broadcast!(socket, "new_msg", %{name: name, type: "text", body: body})
    {:noreply, socket}
  end
  def handle_in("new:msg", %{"type" => "xml", "body" => body}, %Phoenix.Socket{assigns: %{name: name}} = socket) do
    # XMLはサーバサイドでチェックしてXMLとして有効なXMLのみ転送する。まあ、この方針は別に間違ってない。
    case is_valid_xml?(body) do
      true  -> broadcast!(socket, "new_msg", %{name: name, type: "xml", body: body})
      false -> broadcast!(socket, "new_msg", %{name: "system", type: "text", body: "#{name} による不正なXMLはフィルターされました。"})
    end
    {:noreply, socket}
  end
end

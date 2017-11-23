defmodule DelicateChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:chat", _auth_msg, socket) do
    Logger.debug("RoomChannel.join")
    name = "nobody-#{round(:rand.uniform() * 1000_00)}"
    socket2 = assign(socket, :name, name)
    {:ok, socket2}
  end

  # Anti-Pattern: Let it crashの誤解。他のメッセージ内容をハンドルせずにサーバとして「正常系」でもcrashさせる。
  def handle_in("new:msg", %{"type" => "text", "body" => body}, %Phoenix.Socket{assigns: %{name: name}} = socket) do
    DelicateChat.ViolenceTextdJudgement.judge(name, body)
    broadcast!(socket, "new_msg", %{name: name, type: "text", body: body})
    {:noreply, socket}
  end
  def handle_in("new:msg", %{"type" => "xml", "body" => body}, %Phoenix.Socket{assigns: %{name: name}} = socket) do
    # XMLはサーバサイドでチェックしてXMLとして有効なXMLのみ転送する。まあ、この方針は別に間違ってない。
    case DelicateChat.XmlValidator.is_valid?(body) do
      true  -> broadcast!(socket, "new_msg", %{name: name, type: "xml", body: body})
      false -> broadcast!(socket, "new_msg", %{name: "system", type: "text", body: "#{name} による不正なXMLはフィルターされました。"})
    end
    {:noreply, socket}
  end
end

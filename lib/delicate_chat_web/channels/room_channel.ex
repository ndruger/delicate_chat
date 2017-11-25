defmodule DelicateChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:chat", _auth_msg, socket) do
    Logger.debug("RoomChannel.join")
    name = "nobody-#{round(:rand.uniform() * 1000_00)}"
    socket2 = assign(socket, :name, name)
    {:ok, socket2}
  end

  def handle_in("new:msg", %{"type" => "text", "body" => body}, %Phoenix.Socket{assigns: %{name: name}} = socket) do
    DelicateChat.ViolenceTextdJudgement.judge(name, body)
    broadcast!(socket, "new_msg", %{name: name, type: "text", body: body})
    {:noreply, socket}
  end
  def handle_in("new:msg", %{"type" => "xml", "body" => body}, %Phoenix.Socket{assigns: %{name: name}} = socket) do
    # XMLはサーバサイドでチェックしてXMLとしてXMLとして有効かどうかを付加する。
    broadcast!(socket, "new_msg", %{name: name, type: "xml", body: body, meta: %{"isValid" => DelicateChat.XmlValidator.is_valid?(body)}})
    {:noreply, socket}
  end
  def handle_in("new:msg", _, socket) do
    {:noreply, socket}
  end
end

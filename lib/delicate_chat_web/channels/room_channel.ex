defmodule DelicateChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:chat", _auth_msg, socket) do
    Logger.debug("RoomChannel.join")
    name = "nobody-#{(:rand.uniform() * 1000_00) |> round()}"
    socket2 = assign(socket, :name, name)
    {:ok, socket2}
  end

  # Anti-Pattern: Let it crashの誤解。他のメッセージタイプをハンドルせずに「正常系」でもcrashさせる。
  def handle_in("new:msg", %{"type" => type, "body" => body}, %Phoenix.Socket{assigns: %{name: name}} = socket) do
    Logger.debug("RoomChannel: message")
    broadcast!(socket, "new_msg", %{name: name, type: type, body: body})
    {:noreply, socket}
  end
end
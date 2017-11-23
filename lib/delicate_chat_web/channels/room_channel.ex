defmodule DelicateChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:chat", _auth_msg, socket) do
    Logger.debug("RoomChannel.join")
    {:ok, socket}
  end

 def handle_in("new:msg", %{"name" => uid, "body" => body}, socket) do
    Logger.debug("RoomChannel: message")
    broadcast!(socket, "new_msg", %{uid: uid, body: body})
    {:noreply, socket}
  end
end
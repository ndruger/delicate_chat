defmodule DelicateChatWeb.PageController do
  use DelicateChatWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

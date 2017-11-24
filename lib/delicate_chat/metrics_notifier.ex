defmodule DelicateChat.MetricsNotifier do
  use GenServer

  @interval 3_000

  def start_link() do
    GenServer.start_link(__MODULE__, [])
  end

  @impl true
  def init(_) do
    Process.send_after(self(), :notify, @interval)
    {:ok, []}
  end

  @impl true
  def handle_info(:notify, state) do
    notify()
    Process.send_after(self(), :notify, @interval)
    {:noreply, state}
  end

  defp notify() do
    msg = %{type: "system:metrics", body: Poison.encode!(DelicateChat.Metrics.get())}
    DelicateChatWeb.Endpoint.broadcast!("room:chat", "system", msg) # TODO: fix
  end
end

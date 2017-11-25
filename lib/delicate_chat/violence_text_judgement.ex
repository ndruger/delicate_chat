defmodule DelicateChat.ViolenceTextJudgement do
  use GenServer
  # Anti-Pattern 2: 処理できる流量以上のでメッセージを受け取る
  # mail boxにメッセージが溜まり利用メモリが増え続ける。

  @violence_words [
    "kill",
    "殺"
  ]

  def start_link() do
    GenServer.start_link(__MODULE__, [], [name: __MODULE__])
  end

  @impl true
  def init(_) do
    {:ok, []}
  end

  # 重いてメモリを食う実装になる予定なので、非同期で1個ずつ処理していく。
  def judge(name, text) do
    GenServer.cast(__MODULE__, {:judge, name, text})
  end

  @impl true
  def handle_cast({:judge, name, text}, state) do
    # 今は暫定実装なので少しばかりシンプルだが、実際は誤検知をしないように非常に高度に考えられた処理になるので、2秒ぐらいかかるとしておく。
    Process.sleep(5_000)
    if String.contains?(text, "nekoneko") do
      k = 1 + "neko"
    end
    if String.contains?(text, @violence_words) do  # this algorithm is inspired by twitter!
      notify(name)
    end
    {:noreply, state}
  end

  defp notify(name) do
    msg = %{name: "system", type: "text", body: "#{name} による攻撃的な言動が検出されました。"}
    DelicateChatWeb.Endpoint.broadcast!("room:chat", "new_msg", msg) # TODO: fix
  end
end

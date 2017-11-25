defmodule DelicateChat.Metrics do
  defp total_message_queue_len() do
    Enum.reduce(Process.list(), 0, fn p, acc ->
      {_, len} = Process.info(p, :message_queue_len)
      acc + len
    end)
  end

  defp memory() do
    Enum.into(:erlang.memory(), %{})
  end

  defp system() do
    %{
      atom_count: :erlang.system_info(:atom_count)
    }
  end

  def get() do
    %{
      "Process.list/0 && Process.info/2" => %{total_message_queue_len: total_message_queue_len()},
      ":erlang.memroy/0" => memory(),
      ":erlang.system_info/1" => system(),
    }
  end
end

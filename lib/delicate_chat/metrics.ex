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
    memory()
    |> Map.put(:total_message_queue_len, total_message_queue_len())
    |> Map.merge(system())
  end
end

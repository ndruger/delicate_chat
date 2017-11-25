defmodule DelicateChat.Metrics do
  def get() do
    %{
      "Process.list/0 && Process.info/2" => %{total_message_queue_len: total_message_queue_len()},
      ":erlang.memroy/0" => memory(),
      ":erlang.system_info/1" => system(),
      ":recon.proc_count/1" => %{memory: recon_proc_count_memory()},
    }
  end

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

  def recon_proc_count_memory() do
    recon_to_jsonable(:recon.proc_count(:memory, 3))
  end

  defp recon_to_jsonable(v) when is_pid(v) do
    v |> :erlang.pid_to_list |> to_string
  end
  defp recon_to_jsonable(v) when is_tuple(v) do
    recon_to_jsonable(Tuple.to_list(v))
  end
  defp recon_to_jsonable(v) when is_list(v) do
    Enum.map(v, &recon_to_jsonable(&1))
  end
  defp recon_to_jsonable(v), do: v
end

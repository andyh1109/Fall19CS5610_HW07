defmodule Timesheetsspa.Sheets do
  @moduledoc """
  The Sheets context.
  """

  import Ecto.Query, warn: false
  alias Timesheetsspa.Repo

  alias Timesheetsspa.Sheets.Sheet


  def list_sheets do
    Repo.all(Sheet)
  end

  def get_sheet!(id), do: Repo.get!(Sheet, id)


  def create_sheet(attrs \\ %{}) do
    %Sheet{}
    |> Sheet.changeset(attrs)
    |> Repo.insert()
  end


  def update_sheet(%Sheet{} = sheet, attrs) do
    sheet
    |> Sheet.changeset(attrs)
    |> Repo.update()
  end


  def delete_sheet(%Sheet{} = sheet) do
    Repo.delete(sheet)
  end


  def change_sheet(%Sheet{} = sheet) do
    Sheet.changeset(sheet, %{})
  end
end

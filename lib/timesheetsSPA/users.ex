defmodule Timesheetsspa.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias Timesheetsspa.Repo

  alias Timesheetsspa.Users.User

  def list_users do
    Repo.all(User)
  end


  def get_user!(id), do: Repo.get!(User, id)
  def get_user(id), do: Repo.get(User, id)
  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  def authenticate(email, pass) do
    user = Repo.get_by(User, email: email)
    case Argon2.check_pass(user, pass) do
      {:ok, user} -> user
      _ -> nil
    end
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end


  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end


  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end
end

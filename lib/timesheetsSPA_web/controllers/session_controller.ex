defmodule TimesheetsspaWeb.SessionController do
  use TimesheetsspaWeb, :controller

  action_fallback TimesheetsspaWeb.FallbackController

  alias Timesheetsspa.Users

  def create(conn, %{"email" => email, "password" => password}) do
    IO.inspect("seesion create")
    user = Users.authenticate(email, password)
    if user do
      token = Phoenix.Token.sign(conn, "session", user.id)
      resp = %{token: token, user_id: user.id, user_name: user.name, is_manager: user.is_manager}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    else
      resp = %{errors: ["Authentication Failed"]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(resp))
    end
  end
end

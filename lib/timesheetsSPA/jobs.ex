defmodule Timesheetsspa.Jobs do
  @moduledoc """
  The Jobs context.
  """

  import Ecto.Query, warn: false
  alias Timesheetsspa.Repo

  alias Timesheetsspa.Jobs.Job



  def list_jobs do
    Repo.all(Job)
  end


  def get_job!(id), do: Repo.get!(Job, id)
 def get_job_by_job_code(job_code) do
    Repo.get_by(Job, job_code: job_code)
  end



  def create_job(attrs \\ %{}) do
    %Job{}
    |> Job.changeset(attrs)
    |> Repo.insert()
  end


  def update_job(%Job{} = job, attrs) do
    job
    |> Job.changeset(attrs)
    |> Repo.update()
  end


  def delete_job(%Job{} = job) do
    Repo.delete(job)
  end

 
  def change_job(%Job{} = job) do
    Job.changeset(job, %{})
  end
end

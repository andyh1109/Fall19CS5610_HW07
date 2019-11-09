defmodule TimesheetsspaWeb.TaskView do
  use TimesheetsspaWeb, :view
  alias TimesheetsspaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      hours: task.hours,
      notes: task.notes}
  end
end

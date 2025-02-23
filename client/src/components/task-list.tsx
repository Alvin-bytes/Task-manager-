import { useQuery } from "@tanstack/react-query";
import type { Task } from "@shared/schema";
import { TaskItem } from "./task-item";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskList() {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks yet. Create one to get started!
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

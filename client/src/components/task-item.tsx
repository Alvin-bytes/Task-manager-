import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import type { Task } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Calendar, Trash2 } from "lucide-react";

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<Task>) => {
      const res = await apiRequest("PATCH", `/api/tasks/${task.id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/tasks/${task.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={task.completed ? "opacity-60" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => {
              updateMutation.mutate({ completed: checked === true });
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium mb-1 ${task.completed ? "line-through" : ""}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span className={isOverdue ? "text-destructive" : "text-muted-foreground"}>
                {format(new Date(task.dueDate), "PPp")}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

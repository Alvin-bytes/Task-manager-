import { useState } from "react";
import { CreateTask } from "@/components/create-task";
import { TaskList } from "@/components/task-list";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Tasks</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateTask onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </header>
        
        <main>
          <TaskList />
        </main>
      </div>
    </div>
  );
}

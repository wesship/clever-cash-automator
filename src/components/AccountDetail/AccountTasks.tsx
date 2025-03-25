
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Task } from "@/types/account.types";

interface AccountTasksProps {
  tasks: Task[];
  getStatusColor: (status: string) => string;
}

const AccountTasks = ({ tasks, getStatusColor }: AccountTasksProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Assigned Tasks</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-center text-muted-foreground">Task assignment form would go here</p>
            </div>
            <DialogFooter>
              <Button>Assign Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{task.name}</h3>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>Progress: {task.completions}/{task.total}</span>
                  <span className="text-vibrant-green">(${task.earnings.toFixed(2)})</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-vibrant-blue" 
                    style={{ width: `${(task.completions / task.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  {task.status === "active" ? "Pause" : "Resume"}
                </Button>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountTasks;

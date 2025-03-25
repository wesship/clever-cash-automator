
import React from "react";
import TaskForm from "@/components/Forms/TaskForm";

interface CreateTaskTabProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CreateTaskTab: React.FC<CreateTaskTabProps> = ({ onSubmit, onCancel }) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <TaskForm 
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default CreateTaskTab;

'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type BoardProps = {
  id: string;
};

export function Board({ id }: BoardProps) {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [{ id: 'task-1', content: 'Sample task' }] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ]);

  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [addingTaskToColumn, setAddingTaskToColumn] = useState<string | null>(null);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find((col) => col.id === destination.droppableId);

    if (sourceColumn && destColumn) {
      const newSourceTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = newSourceTasks.splice(source.index, 1);

      if (sourceColumn.id === destColumn.id) {
        newSourceTasks.splice(destination.index, 0, movedTask);
        const newColumns = columns.map((col) =>
          col.id === sourceColumn.id ? { ...col, tasks: newSourceTasks } : col
        );
        setColumns(newColumns);
      } else {
        const newDestTasks = Array.from(destColumn.tasks);
        newDestTasks.splice(destination.index, 0, movedTask);
        const newColumns = columns.map((col) => {
          if (col.id === sourceColumn.id) {
            return { ...col, tasks: newSourceTasks };
          }
          if (col.id === destColumn.id) {
            return { ...col, tasks: newDestTasks };
          }
          return col;
        });
        setColumns(newColumns);
      }
    }
  };

  const startAddingTask = (columnId: string) => {
    setAddingTaskToColumn(columnId);
    setNewTaskContent('');
  };

  const cancelAddingTask = () => {
    setAddingTaskToColumn(null);
    setNewTaskContent('');
  };

  const addTask = (columnId: string) => {
    if (newTaskContent.trim() === '') return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: newTaskContent.trim(),
    };

    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        return { ...col, tasks: [...col.tasks, newTask] };
      }
      return col;
    });

    setColumns(newColumns);
    setAddingTaskToColumn(null);
    setNewTaskContent('');
  };

  const addColumn = () => {
    if (newColumnTitle.trim() === '') return;
    const newColumn: Column = {
      id: `column-${Date.now()}`,
      title: newColumnTitle,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
    setNewColumnTitle('');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-secondary p-4 rounded-lg w-72 flex-shrink-0">
            <h2 className="font-semibold mb-4">{column.title}</h2>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2 min-h-[50px]"
                >
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-background p-2 rounded"
                        >
                          {task.content}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            {addingTaskToColumn === column.id ? (
              <div className="mt-2">
                <Input
                  type="text"
                  placeholder="Enter task content"
                  value={newTaskContent}
                  onChange={(e) => setNewTaskContent(e.target.value)}
                  className="mb-2"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-grow"
                    onClick={() => addTask(column.id)}
                  >
                    Add
                  </Button>
                  <Button variant="ghost" size="sm" onClick={cancelAddingTask}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2"
                onClick={() => startAddingTask(column.id)}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Task
              </Button>
            )}
          </div>
        ))}
        <div className="bg-secondary p-4 rounded-lg w-72 flex-shrink-0">
          <Input
            type="text"
            placeholder="New column title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="mb-2"
          />
          <Button variant="default" size="sm" className="w-full" onClick={addColumn}>
            <Plus className="w-4 h-4 mr-2" /> Add Column
          </Button>
        </div>
      </div>
    </DragDropContext>
  );
}

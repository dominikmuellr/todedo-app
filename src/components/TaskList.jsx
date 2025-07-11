import React from 'react';
import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTaskDate, activeFilter, totalTaskCount }) {
  // Render
  if (tasks.length === 0) {
    const emptyMessage = totalTaskCount === 0 ? 'Waiting for your tasks!' : `No ${activeFilter} tasks!`;
    // Empty State
    return (
      <ul className="todo-list">
        <div className="empty-state">{emptyMessage}</div>
      </ul>
    );
  }

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onUpdateDate={(newDate) => onUpdateTaskDate(task.id, newDate)}
        />
      ))}
    </ul>
  );
}

export default TaskList; 
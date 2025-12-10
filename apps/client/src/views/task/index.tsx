import { useEffect, useState, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { type Task as TaskPropType } from 'shared/src/types';

import { useAppDispatch } from '@/hooks';

import { openModal } from '@/store/features/modal';
import { useUpdateTaskMutation } from '@/store/features/tasks';

import { Input } from '@/components/input';

import * as styles from './task.styles';

export const Task = (task: TaskPropType) => {
  const { name, id } = task;

  const dispatch = useAppDispatch();

  const [updateTask] = useUpdateTaskMutation();

  const [taskName, setTaskName] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `task-${id}`,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  useEffect(() => {
    setTaskName(name);
  }, [name]);

  useEffect(() => {
    if (isEditing && inputContainerRef.current) {
      const input = inputContainerRef.current.querySelector('input');

      if (input) {
        input.focus();
        input.select();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleBlur = async () => {
    setIsEditing(false);

    if (taskName === name) {
      return;
    }

    try {
      await updateTask({ ...task, name: taskName }).unwrap();
    } catch (error) {
      console.error('Failed to rename task:', error);
      setTaskName(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.currentTarget as HTMLInputElement).blur();
    } else if (e.key === 'Escape') {
      setTaskName(name);
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    if (isEditing) {
      return;
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      dispatch(openModal({ instance: 'task', type: 'edit', data: task }));
      clickTimeoutRef.current = null;
    }, 150);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <dd
      ref={setNodeRef}
      style={style}
      css={styles.task}
      {...attributes}
      {...(!isEditing ? listeners : {})}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <div 
          ref={inputContainerRef} 
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            css={styles.name}
            variant="secondary"
          />
        </div>
      ) : (
        <span css={styles.nameDisplay}>{name}</span>
      )}
    </dd>
  );
};

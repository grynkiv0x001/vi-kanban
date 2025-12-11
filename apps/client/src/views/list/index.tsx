import { useEffect, useState, useMemo, useRef } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { List as ListPropType } from 'shared/src/types';

import { TrashIcon } from '@/assets/icons';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { openModal } from '@/store/features/modal';
import { selectTasksByListId } from '@/store/features/tasks';
import { useDeleteListMutation, useUpdateListMutation } from '@/store/features/lists';

import { Task } from '@/views/task';

import { Button } from '@/components/button';
import { Input } from '@/components/input';

import * as styles from './list.styles';

export const List = ({ isListDragging, ...list }: ListPropType & { isListDragging?: boolean }) => {
  const { id, projectId, name } = list;

  const [removeList, { isLoading }] = useDeleteListMutation();
  const [updateList, { isLoading: updating }] = useUpdateListMutation();

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => selectTasksByListId(state, id));

  const [listName, setListName] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `list-${id}`,
    data: {
      type: 'List',
      list,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  useEffect(() => {
    setListName(name);
  }, [name]);

  const handleBlur = async () => {
    setIsEditing(false);

    if (listName === name) {
      return;
    }

    try {
      await updateList({ ...list, name: listName }).unwrap();
    } catch (error) {
      console.error('Failed to rename list:', error);
      setListName(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.currentTarget as HTMLInputElement).blur();
    } else if (e.key === 'Escape') {
      setListName(name);
      setIsEditing(false);
    }
  };

  const handleListRemoval = async () => {
    await removeList({ id, projectId });
  };

  const handleTaskCreation = () => {
    dispatch(openModal({
      type: 'create',
      instance: 'task',
      ids: {
        listId: id,
      },
    }));
  };

  const taskIds = useMemo(() => {
    if (isListDragging) {
      return [];
    }

    return tasks?.map(t => `task-${t.id}`) ?? [];
  }, [tasks, isListDragging]);

  return (
    <dl
      ref={setNodeRef}
      style={style}
      css={styles.list}
      {...attributes}
      {...(!isEditing ? listeners : {})}
    >
      <dt css={styles.head}>
        {isEditing ? (
          <div 
            ref={inputContainerRef} 
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              required
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled={updating}
              css={styles.name}
              variant="secondary"
            />
          </div>
        ) : (
          <span css={styles.name} onDoubleClick={() => setIsEditing(true)}>
            {listName}
          </span>
        )}
        
        <button css={styles.removeListBtn} onClick={handleListRemoval} disabled={isLoading} onPointerDown={(e) => e.stopPropagation()}>
          <TrashIcon width={16} height={16} />
        </button>
      </dt>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        {!isListDragging && tasks?.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </SortableContext>
      <dd css={styles.createTaskBtn}>
        <Button onClick={handleTaskCreation} variant="secondary">
          + Add task
        </Button>
      </dd>
    </dl>
  );
};

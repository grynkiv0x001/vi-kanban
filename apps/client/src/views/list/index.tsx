import { useEffect, useState, useMemo } from 'react';
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
    if (listName === name) {
      return;
    }

    try {
      await updateList({ ...list, name: listName }).unwrap();
    } catch (error) {
      console.error('Failed to rename list:', error);
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
      {...listeners}
    >
      <dt css={styles.head}>
        <Input
          required
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onBlur={handleBlur}
          disabled={updating}
          css={styles.name}
          variant="secondary"
        />
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

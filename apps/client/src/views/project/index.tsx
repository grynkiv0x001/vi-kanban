import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  type DropAnimation,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { List as ListType, Task as TaskType } from 'shared/src/types';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { useGetProjectListsQuery, useReorderListsMutation } from '@/store/features/lists';
import { setProjectTasks, useGetListTasksQuery, useReorderTasksMutation } from '@/store/features/tasks';
import { setProjectLists, reorderLists } from '@/store/features/lists';
import { reorderTasks } from '@/store/features/tasks';
import { openModal } from '@/store/features/modal';

import { List } from '@/views/list';
import { Task } from '@/views/task';

import { Button } from '@/components/button';

import * as styles from './project.styles';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.8',
      },
    },
  }),
};

export const ProjectView = () => {
  const dispatch = useAppDispatch();
  const { currentProject } = useAppSelector(state => state.project);
  const { projectLists } = useAppSelector(state => state.lists);
  const { projectTasks } = useAppSelector(state => state.tasks);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'list' | 'task' | null>(null);
  const [activeItem, setActiveItem] = useState<ListType | TaskType | null>(null);

  const [reorderListsApi] = useReorderListsMutation();
  const [reorderTasksApi] = useReorderTasksMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { data: lists, isLoading: listsLoading } = useGetProjectListsQuery(currentProject?.id ?? 0, {
    skip: !currentProject,
  });

  const { data: tasks, isLoading: tasksLoading } = useGetListTasksQuery({
    projectId: currentProject?.id ?? 0,
    ids: lists?.map((list) => Number(list?.id)) ?? [],
  }, {
    skip: !currentProject || !lists || !lists.length,
  });

  useEffect(() => {
    if (tasks && !tasksLoading) {
      dispatch(setProjectTasks(tasks));
    }
  }, [dispatch, tasks, tasksLoading]);

  useEffect(() => {
    if (lists && !listsLoading) {
      dispatch(setProjectLists(lists));
    }
  }, [dispatch, lists, listsLoading]);

  const handleListCreation = async () => {
    dispatch(openModal({
      type: 'create',
      instance: 'list',
    }));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id as string;

    setActiveId(id);

    if (active.data.current?.type === 'Task') {
      setActiveType('task');
      setActiveItem(active.data.current.task);
      return;
    }

    if (active.data.current?.type === 'List') {
      setActiveType('list');
      setActiveItem(active.data.current.list);
      return;
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) {
      return;
    }

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverList = over.data.current?.type === 'List';

    if (!isActiveTask) {
      return;
    }

    // Parse IDs back to numbers for Redux/API
    const activeTaskId = Number(activeId.replace('task-', ''));

    if (isActiveTask && isOverTask) {
      const overTaskId = Number(overId.replace('task-', ''));
      const activeIndex = projectTasks?.findIndex(projectTask => projectTask.id === activeTaskId);
      const overIndex = projectTasks?.findIndex(projectTask => projectTask.id === overTaskId);

      if (activeIndex !== undefined && overIndex !== undefined && activeIndex !== -1 && overIndex !== -1 && projectTasks) {
        if (projectTasks[activeIndex].listId !== projectTasks[overIndex].listId) {

          const updatedTasks = [...projectTasks];
          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            listId: projectTasks[overIndex].listId,
          };

          dispatch(reorderTasks(arrayMove(updatedTasks, activeIndex, overIndex)));
        } else if (activeIndex !== overIndex) {
          dispatch(reorderTasks(arrayMove(projectTasks, activeIndex, overIndex)));
        }
      }
    }

    if (isActiveTask && isOverList) {
      const overListId = Number(overId.replace('list-', ''));
      const activeIndex = projectTasks?.findIndex(projectTask => projectTask.id === activeTaskId);

      if (activeIndex !== undefined && activeIndex !== -1 && projectTasks) {
        if (projectTasks[activeIndex].listId !== overListId) {
          const updatedTasks = [...projectTasks];

          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            listId: overListId,
          };

          dispatch(reorderTasks(updatedTasks));
        }
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setActiveType(null);
    setActiveItem(null);

    if (!over) {
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    if (active.data.current?.type === 'List') {
      if (activeId !== overId) {
        const activeListId = Number(activeId.replace('list-', ''));
        const overListId = Number(overId.replace('list-', ''));

        const oldIndex = projectLists?.findIndex(projectList => projectList.id === activeListId);
        const newIndex = projectLists?.findIndex(projectList => projectList.id === overListId);

        if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== -1 && newIndex !== -1 && projectLists && currentProject) {
          const newLists = arrayMove(projectLists, oldIndex, newIndex);

          dispatch(reorderLists(newLists));
          reorderListsApi({ projectId: currentProject.id, listIds: newLists.map(l => l.id) });
        }
      }
    } else if (active.data.current?.type === 'Task') {
      const activeTaskId = Number(activeId.replace('task-', ''));
      const task = projectTasks?.find(projectTask => projectTask.id === activeTaskId);

      if (task && currentProject) {
        const listId = task.listId;
        const tasksInList = projectTasks?.filter(projectTask => projectTask.listId === listId).map(projectTask => projectTask.id);

        if (tasksInList) {
          reorderTasksApi({
            listId,
            projectId: currentProject.id,
            taskIds: tasksInList,
          });
        }
      }
    }
  };

  if (listsLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <section css={styles.project}>
        <SortableContext
          items={projectLists?.map(l => `list-${l.id}`) ?? []}
          strategy={horizontalListSortingStrategy}
        >
          {projectLists?.map((list) => (
            <List key={list.id} {...list} isListDragging={activeType === 'list'} />
          ))}
        </SortableContext>

        <Button onClick={handleListCreation} disabled={listsLoading} styles={styles.addListBtn}>
          + Add list
        </Button>
      </section>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeId ? (
          activeType === 'list' ? (
            <div style={{ transform: 'rotate(3deg)' }}>
              <List {...(activeItem as ListType)} />
            </div>
          ) : (
            <div style={{ transform: 'rotate(3deg)' }}>
              <Task {...(activeItem as TaskType)} />
            </div>
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

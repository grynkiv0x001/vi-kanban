import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';
import { useUpdateTaskMutation } from '@/store/features/tasks';

import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { TextArea } from '@/components/textarea';

import * as styles from './edit-form.styles';

export const EditTaskForm = () => {
  const dispatch = useAppDispatch();
  const { formId, data } = useAppSelector(state => state.modal);
  const { projectLists } = useAppSelector(state => state.lists);

  const [updateTask, { isLoading, isSuccess }] = useUpdateTaskMutation();

  const [name, setName] = useState<string>(data?.name || '');
  const [description, setDescription] = useState<string>(data?.description || '');
  const [listId, setListId] = useState<number>(data?.listId || 0);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    return () => {
      setShowPreview(true);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data) {
      return;
    }

    await updateTask({
      ...data,
      name,
      description,
      listId,
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit} css={styles.form}>
      <Input
        type="text"
        name="name"
        placeholder="Task name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      {(showPreview && description) ? (
        <div
          tabIndex={0}
          onDoubleClick={() => setShowPreview(false)}
          css={styles.description}
        >
          <Markdown>{description}</Markdown>
        </div>
      ) : (
        <TextArea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => {
            if (description.trim()) {
              setShowPreview(true);
            }
          }}
          disabled={isLoading}
          styles={styles.description}
          autoFocus
        />
      )}
      <Select
        value={String(listId)}
        onChange={(value) => setListId(Number.parseInt(value))}
        options={
          projectLists?.map((item) => ({
            value: String(item.id),
            label: item.name,
          }))
        }
      />
    </form>
  );
};

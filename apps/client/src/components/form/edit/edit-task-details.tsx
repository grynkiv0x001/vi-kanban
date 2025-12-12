import { useAppSelector } from '@/hooks';

import * as styles from './edit-form.styles';

type DateType = Date | string | null | undefined;

export const EditTaskDetails = () => {
  const { data } = useAppSelector(state => state.modal);

  if (!data) {
    return null;
  }

  const formatDate = (date: DateType): string => {
    if (!date) {
      return '-';
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return '-';
    }

    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDateShort = (date: DateType): string => {
    if (!date) {
      return '-';
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return '-';
    }

    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div css={styles.detailItem}>
        <span css={styles.detailLabel}>Deadline</span>
        <span css={styles.detailValue}>{formatDateShort(data.deadline)}</span>
      </div>

      <div css={styles.detailItem}>
        <span css={styles.detailLabel}>Created</span>
        <span css={styles.detailValue}>{formatDate(data.createdAt)}</span>
      </div>

      {data.updatedAt && (
        <div css={styles.detailItem}>
          <span css={styles.detailLabel}>Updated</span>
          <span css={styles.detailValue}>{formatDate(data.updatedAt)}</span>
        </div>
      )}
    </>
  );
};

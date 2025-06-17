import type { List as ListPropType } from 'shared/src/types';

import * as styles from './list.styles';

export const List = ({ name }: ListPropType) => {
  return (
    <dl css={styles.list}>
      <dt css={styles.head}>{name}</dt>
    </dl>
  );
};

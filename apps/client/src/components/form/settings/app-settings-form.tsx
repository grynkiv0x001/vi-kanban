import { useAppDispatch, useAppSelector } from '@/hooks';

import { toggleVi } from '@/store/features/vi';
import { setTheme, Themes } from '@/store/features/app-settings';
import { useAppSettingsFormSelector } from '@/store/selectors';

import { Toggle } from '@/components/toggle';

import * as styles from './settings-form.styles';

export const AppSettingsForm = () => {
  const dispatch = useAppDispatch();
  const { formId, enabled, theme } = useAppSelector(useAppSettingsFormSelector);

  return (
    <form id={formId} css={styles.form}>
      <Toggle
        label="Enable Vi"
        checked={enabled}
        onChange={(e) => dispatch(toggleVi(e.target.checked))}
      />
      <Toggle
        label="Dark mode"
        checked={theme === Themes.DARK}
        onChange={(e) => {
          dispatch(setTheme(e.target.checked ? Themes.DARK : Themes.LIGHT));
        }}
      />
      <Toggle
        label="System based theme"
        checked={theme === Themes.SYSTEM}
        onChange={(e) => {
          dispatch(setTheme(e.target.checked ? Themes.SYSTEM : Themes.LIGHT));
        }}
      />
    </form>
  );
};

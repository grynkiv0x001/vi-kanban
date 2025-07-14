import { useAppSelector } from '@/hooks';
import { Toggle } from '@/components/toggle';

export const AppSettingsForm = () => {
  const { formId } = useAppSelector(state => state.modal);

  return (
    <form id={formId}>
      <Toggle />
    </form>
  );
};

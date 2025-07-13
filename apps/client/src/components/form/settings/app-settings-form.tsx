import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

export const AppSettingsForm = () => {
  const dispatch = useAppDispatch();
  const { formId } = useAppSelector(state => state.modal);

  return (
    <form id={formId}>
      test
    </form>
  );
};

import { useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { closeModal } from '@/store/features/modal';

import { AuthModal, CreateModal, SettingsModal } from '@/components/modal/types';

import { wrapper } from './modal-wrapper.styles';

export const ModalWrapper = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector(state => state.modal);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
        return;
      }

      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const renderModal = () => {
    switch (type) {
    case 'create':
      return (
        <CreateModal />
      );
    case 'auth':
      return (
        <AuthModal />
      );
    case 'settings':
      return <SettingsModal />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dialog = dialogRef.current;
      if (!dialog || !dialog.open) return;

      const rect = dialog.getBoundingClientRect();
      const clickInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!clickInside) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    <dialog ref={dialogRef} onClose={handleClose} css={wrapper}>
      {renderModal()}
    </dialog>
  );
};

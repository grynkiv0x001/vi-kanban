import { ListSchema } from '@shared/types';

export const createListSchema = ListSchema.omit({ id: true });
export const updateListSchema = ListSchema.partial();

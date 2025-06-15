import { ListSchema } from '@shared/types';

export const createListSchema = ListSchema.omit({ id: true });

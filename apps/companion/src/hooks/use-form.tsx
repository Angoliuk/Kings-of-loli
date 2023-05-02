import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldValues, useForm, type UseFormProps } from 'react-hook-form';
import { type Schema } from 'zod';

type UseHookFormProps<T extends FieldValues> = Omit<UseFormProps<T>, 'resolver'> & {
  schema: Schema;
};

export const useHookForm = <T extends FieldValues>({ schema, ...properties }: UseHookFormProps<T>) => {
  return useForm<T>({
    mode: 'onBlur',
    ...properties,
    resolver: zodResolver(schema),
  });
};

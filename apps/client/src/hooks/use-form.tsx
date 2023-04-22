import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { Schema } from 'zod';

type UserFormProperty<T extends FieldValues> = Omit<UseFormProps<T>, 'resolver'> & {
  schema: Schema;
};

export const useHookForm = <T extends FieldValues>({
  schema,
  ...properties
}: UserFormProperty<T>) => {
  return useForm<T>({
    mode: 'onBlur',
    ...properties,
    resolver: zodResolver(schema),
  });
};

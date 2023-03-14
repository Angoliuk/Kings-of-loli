import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { Schema } from 'zod';
type userFormProperty<T extends FieldValues> = Omit<UseFormProps<T>, 'resolver'> & {
  schema: Schema;
};

export const useHookForm = <T extends FieldValues>({
  schema,
  ...properties
}: userFormProperty<T>) => {
  return useForm<T>({
    mode: 'onBlur',
    ...properties,
    resolver: zodResolver(schema),
  });
};

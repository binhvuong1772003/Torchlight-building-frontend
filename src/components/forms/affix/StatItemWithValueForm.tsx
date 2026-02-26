import {
  useFieldArray,
  type UseFormRegister,
  type Control,
  Controller,
} from 'react-hook-form';
import { CreateBaseAffixFormData } from '@/lib/validations/affixSchema';
import { Plus, Trash2 } from 'lucide-react';
import type { StatDefinition } from '@/types/affix';
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
interface Props {
  statIndex: number;
  register: UseFormRegister<CreateBaseAffixFormData>;
  control: Control<CreateBaseAffixFormData>;
  onRemove: () => void;
  statDefs: StatDefinition[];
  error?: any;
}
export const StatItemWithValue = ({
  statIndex,
  register,
  control,
  onRemove,
  error,
  statDefs,
}: Props) => {
  return (
    <div className="space-y-3 border rounded-lg p-4">
      <div className="flex justify-between">
        <span>Stat {statIndex + 1}</span>
        <Button onClick={onRemove} variant={'ghost'}>
          <Trash2 className="text-red-500"></Trash2>
        </Button>
      </div>
      <Field>
        <FieldLabel>Stat test</FieldLabel>
        <Controller
          name={`stats.${statIndex}.statKey`}
          control={control}
          render={({ field }) => (
            <Combobox
              items={statDefs.map((stat) => stat.key)}
              value={field.value}
              onValueChange={field.onChange}
            >
              <ComboboxInput placeholder="Select a type" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {statDefs.map((stat) => (
                    <ComboboxItem key={stat.id} value={stat.key}>
                      {stat.key}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        ></Controller>
        {error?.statKey && (
          <p className="text-sm text-destructive">{error.statKey.message}</p>
        )}
      </Field>
      <Field>
        <FieldLabel>Value</FieldLabel>
        <Input
          {...register(`stats.${statIndex}.value`, { valueAsNumber: true })}
        />
      </Field>
    </div>
  );
};

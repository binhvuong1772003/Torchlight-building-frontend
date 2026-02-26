import {
  useFieldArray,
  type UseFormRegister,
  type Control,
  Controller,
} from 'react-hook-form';
import { CreateAffixFormData } from '@/lib/validations/affixSchema';
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
  register: UseFormRegister<CreateAffixFormData>;
  control: Control<CreateAffixFormData>;
  onRemove: () => void;
  statDefs: StatDefinition[];
  error?: any;
}
export const StatItemWithRollTabe = ({
  statIndex,
  register,
  control,
  onRemove,
  error,
  statDefs,
}: Props) => {
  const {
    fields: rollFields,
    append: appendRoll,
    remove: removeRoll,
  } = useFieldArray({ control, name: `stats.${statIndex}.rollTables` });
  const category = ['weapon', 'armor', 'ring'];
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
      <div className="space-y-2">
        <div className="pt-2 flex flex-row justify-between space-y-2">
          <span className="text-sm font-medium">Roll Tables</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              appendRoll({ category: 'WEAPON', min: 0, max: 0 });
            }}
          >
            <Plus /> Add Roll
          </Button>
        </div>
        {rollFields.map((roll: any, rollIndex: any) => (
          <div key={roll.id} className="grid grid-cols-4 gap-2 items-end">
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Controller
                name={`stats.${statIndex}.rollTables.${rollIndex}.category`}
                control={control}
                render={({ field }) => (
                  <Combobox
                    items={category}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ComboboxInput placeholder="Select a type" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Min</FieldLabel>
              <Input
                {...register(`stats.${statIndex}.rollTables.${rollIndex}.min`)}
              />
            </Field>
            <Field>
              <FieldLabel>Max</FieldLabel>
              <Input
                {...register(`stats.${statIndex}.rollTables.${rollIndex}.max`)}
              />
            </Field>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeRoll(rollIndex)}
              className="flex justify-end text-lg"
            >
              <Trash2 className="text-red-500 w-4 h-4"></Trash2>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

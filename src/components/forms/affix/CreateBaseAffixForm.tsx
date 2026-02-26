import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCraftBaseAffix } from '@/hooks/useCraftBaseAffix';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { StatItemWithValue } from './StatItemWithValueForm';
export const CreateBaseAffixForm = () => {
  const {
    form,
    statFields,
    appendStat,
    removeStat,
    statDefs,
    isLoadingStats,
    apiError,
    isSubmitting,
    onSubmit,
  } = useCraftBaseAffix();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto p-6"
    >
      {apiError && (
        <Alert>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>Create Base Affix</CardHeader>
        <CardContent className="gap-4 grid grid-cols-2 ">
          <Field>
            <FieldLabel className="text-xl">Name</FieldLabel>
            <Input {...register('name')}></Input>
          </Field>
          <Field>
            <FieldLabel className="text-xl">Key</FieldLabel>
            <Input {...register('key')}></Input>
          </Field>
          <Field className="col-span-2">
            <FieldLabel className="text-xl">Description</FieldLabel>
            <Input {...register('description')}></Input>
          </Field>
          <Field>
            <FieldLabel className="text-xl">Min Item Level</FieldLabel>
            <Input {...register('minItemLevel')}></Input>
          </Field>
          <Field>
            <FieldLabel className="text-xl">Is Priceless</FieldLabel>
            <Controller
              name="isPriceless"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={['true', 'false']}
                  value={field.value ? 'true' : 'false'}
                  onValueChange={(val) => field.onChange(val === 'true')}
                >
                  <ComboboxInput placeholder="Select priceless" />
                  <ComboboxContent>
                    <ComboboxEmpty>No Item Found</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item === 'true' ? 'Priceless' : 'Non Priceless'}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            />
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stats</CardTitle>
          <Button
            type="button"
            variant={'outline'}
            size="sm"
            onClick={() => appendStat({ statKey: '', value: 0 })}
          >
            <Plus></Plus>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoadingStats ? (
            <div className="flex justify-center">
              <Loader2></Loader2>
            </div>
          ) : (
            statFields.map((stat, statIndex) => (
              <StatItemWithValue
                key={stat.id}
                statIndex={statIndex}
                register={register}
                control={control}
                statDefs={statDefs}
                onRemove={() => removeStat(statIndex)}
                error={errors.stats?.message}
              />
            ))
          )}
        </CardContent>
      </Card>
      <Button
        type="submit"
        className="flex justify-center w-full"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}:
        {isSubmitting ? 'Creating...' : 'Create Base Affix'}
      </Button>
    </form>
  );
};

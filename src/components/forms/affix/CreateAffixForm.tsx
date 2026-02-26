import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCreateAffix } from '@/hooks/useCraftAffix';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';
import { StatItemWithRollTabe } from './StatItemWithRollTabeForm';
import { Loader2, Plus } from 'lucide-react';

export const CreateAffixForm = () => {
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
  } = useCreateAffix();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  const affixtype = ['PREFIX', 'SUFFIX', 'LEGENDARY', 'BASE'];
  const affixtier = ['BASIC', 'ADVANCE', 'ULTIMATE', 'LEGENDARY', 'BASE'];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto p-6"
    >
      <h1>Create Affix</h1>
      {apiError && (
        <Alert variant={'destructive'}>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-2">
          <Field>
            <FieldLabel>Key</FieldLabel>
            <Input placeholder="Key-Value" {...register('key')} />
            {errors.key && (
              <p className="text-sm text-destructive"> {errors.key.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="Name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive"> {errors.name.message}</p>
            )}
          </Field>
          <Field className="col-span-2">
            <FieldLabel>Desciption</FieldLabel>
            <Input {...register('description')} />
          </Field>
          <Field>
            <FieldLabel>Affix Type</FieldLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={affixtype}
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
            <FieldLabel>Tags</FieldLabel>
            <Input {...register('tags')} />
          </Field>
          <Field>
            <FieldLabel>AFFIX TIER</FieldLabel>
            <Controller
              name="tier"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={affixtier}
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
            <FieldLabel>Tier Level</FieldLabel>
            <Controller
              name="tierlevel"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={['0', '1', '2', '3', '4']}
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
            <FieldLabel>Min Item Level</FieldLabel>
            <Input {...register('minItemLevel')} />
          </Field>
          <Field>
            <FieldLabel>Max Item Level</FieldLabel>
            <Input {...register('maxItemLevel')} />
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stats</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendStat({
                statKey: '',
                rollTables: [{ category: 'WEAPON', min: 0, max: 0 }],
              })
            }
          >
            <Plus className="w-4 mr-1" />
            Add Stat
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingStats ? (
            <div className="flex justify-center py-4">
              <Loader2 />
            </div>
          ) : (
            statFields.map((stat, statIndex) => (
              <StatItemWithRollTabe
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
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Creating...' : 'Create Affix'}
      </Button>
    </form>
  );
};

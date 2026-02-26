import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
import { useCreateStat } from '@/hooks/useCraftStat';
import { Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
export const CreateStatForm = () => {
  const { form, isSubmitting, apiError, onSubmit } = useCreateStat();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto p-6"
    >
      <h1>Create Stat</h1>
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
            <FieldLabel className="text-xl">Key</FieldLabel>
            <Input placeholder="Please fill key" {...register('key')} />
            {errors.key && (
              <p className="text-sm text-destructive">{errors.key.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel className="text-xl">Name</FieldLabel>
            <Input placeholder="Please fill name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </Field>
          <Field className="col-span-2">
            <FieldLabel className="text-xl">Description</FieldLabel>
            <Input
              placeholder="Please fill name"
              {...register('description')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.description?.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel className="text-xl">Value Type</FieldLabel>
            <Controller
              name="valueType"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={['FLAT', 'PERCENTAGE', 'MULTIPLIER']}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput placeholder="Please fill Type"></ComboboxInput>
                  <ComboboxContent>
                    <ComboboxEmpty>No Items Found</ComboboxEmpty>
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
            <FieldLabel className="text-xl">Category</FieldLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={['OFFENSIVE', 'DEFENSIVE', 'UTILITY', 'RESOURCE']}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput placeholder="Please fill category"></ComboboxInput>
                  <ComboboxContent>
                    <ComboboxEmpty>No Items Found</ComboboxEmpty>
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
        </CardContent>
      </Card>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && (
          <Loader2 className="mr-2 w-4 h-4 animate-spin"></Loader2>
        )}
        {isSubmitting ? 'Creating...' : 'Creat Stat'}
      </Button>
    </form>
  );
};

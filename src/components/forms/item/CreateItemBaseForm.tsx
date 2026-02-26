import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UploadImage from '@/components/ui/upload-image';
import { useCreateItemBase } from '@/hooks/useCreateItemBaseAffix';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from '@/components/ui/combobox';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
export const CreateItemBaseForm = () => {
  const {
    form,
    baseAffixes,
    isLoadingBA,
    isSubmitting,
    apiError,
    files,
    setFiles,
    onSubmit,
  } = useCreateItemBase();
  const { register, handleSubmit, control } = form;
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
      <Card className="max-w-3xl mx-auto p-6">
        <CardHeader>
          <CardTitle>Create Item Base</CardTitle>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-2">
          <Field>
            <FieldLabel className="text-xl">Name</FieldLabel>
            <Input {...register('name')}></Input>
          </Field>
          <Field>
            <FieldLabel className="text-xl">Key</FieldLabel>
            <Input {...register('key')}></Input>
          </Field>
          <Field>
            <FieldLabel className="text-xl">Description</FieldLabel>
            <Input {...register('description')}></Input>
          </Field>
          <Field>
            <FieldLabel className="text-xl">Category</FieldLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={[
                    'WEAPON',
                    'SHIELD',
                    'HELMET',
                    'CHEST',
                    'GLOVES',
                    'BELT',
                    'SHOES',
                    'AMULET',
                    'RING',
                  ]}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput placeholder="Select Category"></ComboboxInput>
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
            ></Controller>
          </Field>
          <Field className="col-span-2 mb-10">
            <FieldLabel className="text-xl">Base Affix Key</FieldLabel>
            <Controller
              name="baseAffixKeys"
              control={control}
              render={({ field }) =>
                isLoadingBA ? (
                  <div className="flex justify-center py-2">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  <Combobox
                    items={baseAffixes.map((base) => base.key)}
                    value={field.value[0] ?? ''}
                    onValueChange={(val) => field.onChange([val])}
                  >
                    <ComboboxInput placeholder="Select Base Affix Key" />
                    <ComboboxContent>
                      <ComboboxEmpty>No Items Found</ComboboxEmpty>
                      <ComboboxList>
                        {baseAffixes.map((b) => (
                          <ComboboxItem key={b.id} value={b.key}>
                            {b.name}
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )
              }
            />
          </Field>
          <Field className="col-span-2 flex flex-col items-center">
            <UploadImage files={files} onValueChange={setFiles} maxFiles={1} />
          </Field>
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

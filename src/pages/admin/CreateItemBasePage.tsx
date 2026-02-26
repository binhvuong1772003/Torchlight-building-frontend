import { CreateItemBaseForm } from '@/components/forms/item/CreateItemBaseForm';
import { ModeToggle } from '@/components/toggles/mode-toggle';

export default function CreateItemBasePage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <CreateItemBaseForm />
    </div>
  );
}

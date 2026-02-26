import { CreateBaseAffixForm } from '@/components/forms/affix/CreateBaseAffixForm';
import { ModeToggle } from '@/components/toggles/mode-toggle';

export default function CreateBaseAffixPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <CreateBaseAffixForm />
    </div>
  );
}

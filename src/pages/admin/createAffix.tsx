import { CreateAffixForm } from '@/components/forms/affix/CreateAffixForm';
import { ModeToggle } from '@/components/toggles/mode-toggle';

export default function CreateAffixPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <CreateAffixForm />
    </div>
  );
}

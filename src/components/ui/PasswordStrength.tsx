// components/ui/PasswordStrength.tsx
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const rules = [
  {
    id: 'length',
    label: 'At least 8 Characters',
    test: (v: string) => v.length >= 8,
  },
  {
    id: 'upper',
    label: 'One uppercase letter (A-Z)',
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    id: 'number',
    label: 'One number (0-9)',
    test: (v: string) => /[0-9]/.test(v),
  },
  {
    id: 'special',
    label: 'One special character (!@#...)',
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

const getStrength = (password: string) => {
  const passed = rules.filter((r) => r.test(password)).length;
  if (passed <= 1)
    return {
      label: 'Weak',
      color: 'bg-red-500',
      width: 'w-1/4',
      textColor: 'text-red-500',
    };
  if (passed === 2)
    return {
      label: 'Fair',
      color: 'bg-orange-400',
      width: 'w-2/4',
      textColor: 'text-orange-400',
    };
  if (passed === 3)
    return {
      label: 'Strong',
      color: 'bg-yellow-400',
      width: 'w-3/4',
      textColor: 'text-yellow-400',
    };
  return {
    label: 'Very Strong',
    color: 'bg-green-500',
    width: 'w-full',
    textColor: 'text-green-500',
  };
};

export const PasswordStrength = ({ password }: { password: string }) => {
  if (!password) return null;
  const strength = getStrength(password);

  return (
    <div className="mt-2 space-y-3">
      {/* Thanh strength */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              strength.color,
              strength.width
            )}
          />
        </div>
        <span
          className={cn(
            'text-xs font-medium w-20 text-right',
            strength.textColor
          )}
        >
          {strength.label}
        </span>
      </div>

      {/* Danh sách điều kiện */}
      <ul className="space-y-1">
        {rules.map((rule) => {
          const passed = rule.test(password);
          return (
            <li key={rule.id} className="flex items-center gap-2 text-xs">
              {passed ? (
                <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
              )}
              <span
                className={passed ? 'text-green-500' : 'text-muted-foreground'}
              >
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

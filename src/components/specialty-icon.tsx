import { Car, Cog, Cpu } from 'lucide-react';
import type { Specialty } from '@/lib/content';

const ICONS = { cpu: Cpu, cog: Cog, car: Car };

export function SpecialtyIcon({ name, className }: { name: Specialty['icon']; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden />;
}

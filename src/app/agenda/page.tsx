import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingForm } from '@/components/booking-form';

export const metadata: Metadata = { title: 'Agenda tu hora' };

export default function AgendaPage() {
  return (
    <div className="bg-gradient-to-b from-white to-ink-50">
      <div className="container max-w-4xl py-14">
        <p className="eyebrow">Agenda tu hora</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Reserva con nuestros especialistas</h1>
        <p className="mt-2 text-ink-600">Horas reales disponibles del taller. Recibes tu código de reserva al instante.</p>
        <Suspense>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}

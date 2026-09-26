import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const CalculadoraTempo: React.FC = () => {
  const [income, setIncome] = useState(8000);
  const [hoursWeek, setHoursWeek] = useState(6);
  const [workHoursMonth, setWorkHoursMonth] = useState(176);

  const result = useMemo(() => {
    const hourly = workHoursMonth > 0 ? income / workHoursMonth : 0;
    const monthlyLostHours = hoursWeek * 4.33;
    const monthlyValue = hourly * monthlyLostHours;
    const annualValue = monthlyValue * 12;
    return { hourly, monthlyLostHours, monthlyValue, annualValue };
  }, [income, hoursWeek, workHoursMonth]);

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <section className="px-6 py-16 md:py-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-300 font-semibold uppercase text-sm">Ferramenta gratuita</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-black">Quanto custa o tempo que você perde toda semana?</h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Transforme horas desperdiçadas em um número concreto e descubra o valor de oportunidade por mês e por ano.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 md:p-9">
            <h2 className="text-2xl font-black">Faça sua conta</h2>
            <div className="mt-7 space-y-6">
              <label className="block">
                <span className="text-sm text-slate-300">Renda mensal aproximada</span>
                <input type="number" min="0" value={income} onChange={(e) => setIncome(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-lg outline-none focus:border-cyan-300" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Horas de trabalho por mês</span>
                <input type="number" min="1" value={workHoursMonth} onChange={(e) => setWorkHoursMonth(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-lg outline-none focus:border-cyan-300" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Horas que você acredita perder por semana</span>
                <input type="range" min="1" max="20" step="1" value={hoursWeek} onChange={(e) => setHoursWeek(Number(e.target.value))} className="mt-4 w-full" />
                <div className="mt-2 text-3xl font-black text-cyan-300">{hoursWeek} h/semana</div>
              </label>
            </div>
            <p className="mt-6 text-xs text-slate-500">Estimativa de valor de oportunidade; não representa promessa de ganho financeiro.</p>
          </div>

          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-7 md:p-9">
            <p className="text-slate-400">Seu tempo vale aproximadamente</p>
            <div className="mt-2 text-4xl font-black">{currency.format(result.hourly)}<span className="text-lg text-slate-400">/hora</span></div>
            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl bg-black/20 border border-white/10 p-5"><p className="text-sm text-slate-400">Horas perdidas por mês</p><p className="mt-1 text-3xl font-black">{result.monthlyLostHours.toFixed(1)} h</p></div>
              <div className="rounded-2xl bg-black/20 border border-white/10 p-5"><p className="text-sm text-slate-400">Valor de oportunidade por mês</p><p className="mt-1 text-3xl font-black">{currency.format(result.monthlyValue)}</p></div>
              <div className="rounded-2xl bg-black/20 border border-white/10 p-5"><p className="text-sm text-slate-400">Valor de oportunidade por ano</p><p className="mt-1 text-4xl font-black text-cyan-300">{currency.format(result.annualValue)}</p></div>
            </div>
            <Link to="/10horas" className="mt-8 block text-center w-full rounded-xl bg-cyan-300 hover:bg-cyan-200 text-slate-950 font-black px-5 py-4 transition">
              Quero recuperar essas horas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculadoraTempo;

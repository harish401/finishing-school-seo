import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SleepData {
  timeSlept: string;
  quality: number;
  changePercent: number;
  startTime: string;
  endTime: string;
  stages: Record<string, string>;
  graphData: Array<{
    stage: string;
    duration: number;
    height: number;
  }>;
}

interface SleepTrackerCardProps {
  data: SleepData;
  icons?: {
    sleep?: ReactNode;
    moon?: ReactNode;
    sun?: ReactNode;
    arrowUp?: ReactNode;
  };
  className?: string;
}

const stageColors: Record<string, string> = {
  Awake: "bg-[#f59e0b]",
  REM: "bg-[#8b5cf6]",
  Core: "bg-[#2563eb]",
  Deep: "bg-[#111827]",
};

export function SleepTrackerCard({
  data,
  icons,
  className,
}: SleepTrackerCardProps) {
  return (
    <article
      className={cn(
        "w-full max-w-sm rounded-[8px] border border-[#eadbea] bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#f3e8f3] text-[#251324]">
            {icons?.sleep}
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7b697b]">
              Sleep
            </p>
            <h3 className="font-heading text-2xl font-black text-[#251324]">
              {data.timeSlept}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-[8px] bg-[#ecfdf5] px-2.5 py-1 text-xs font-black text-success">
          {icons?.arrowUp}
          {data.changePercent}%
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#6c5a6c]">
          <span>{data.startTime}</span>
          <span>{data.endTime}</span>
        </div>
        <div className="flex h-24 items-end gap-1 rounded-[8px] bg-[#fff8ef] p-2">
          {data.graphData.map((item, index) => (
            <div
              key={`${item.stage}-${index}`}
              className={cn(
                "min-w-1 flex-1 rounded-t",
                stageColors[item.stage] ?? "bg-[#94a3b8]"
              )}
              style={{ height: `${Math.max(16, item.height)}%` }}
              title={`${item.stage}: ${item.duration}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {Object.entries(data.stages).map(([stage, value]) => (
          <div
            key={stage}
            className="rounded-[8px] border border-[#eadbea] bg-[#fffaf5] p-3"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#7b697b]">
              {stage}
            </p>
            <p className="mt-1 font-heading text-base font-black text-[#251324]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-[8px] bg-[#f6fbff] px-3 py-2 text-xs font-bold text-[#536272]">
        <span className="flex items-center gap-2">{icons?.moon} Start</span>
        <span className="flex items-center gap-2">Wake {icons?.sun}</span>
      </div>
    </article>
  );
}

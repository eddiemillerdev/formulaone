import { cn } from "@/lib/utils";

type RacingLineSeparatorProps = {
  className?: string;
  /** Mirror horizontally (matches “right” variant in original module). */
  flip?: boolean;
};

/**
 * F1-style angled stripe separator (vector from racing line pattern).
 */
export function RacingLineSeparator({ className, flip }: RacingLineSeparatorProps) {
  return (
    <div
      className={cn("w-full overflow-hidden text-primary", className)}
      aria-hidden
    >
      <svg
        fill="none"
        viewBox="0 0 25200 200"
        preserveAspectRatio="none"
        className={cn("block h-3 w-full min-h-[12px] md:h-[18px]", flip && "scale-x-[-1]")}
        role="presentation"
      >
        <g fill="currentColor">
          <path d="M200 0h25000v91h-25091Z" />
          <path d="M0 200h25200v-97h-25103Z" />
        </g>
      </svg>
    </div>
  );
}

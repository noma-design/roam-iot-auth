type SpinnerProps = {
  className?: string;
};

export function Spinner({ className = "" }: SpinnerProps) {
  return (
    <span
      className={`inline-block size-5 animate-spin rounded-full border-2 border-white/30 border-t-white ${className}`}
      aria-hidden
    />
  );
}

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`flex flex-col gap-2 px-2 py-2 bg-gray-200 rounded-md border border-amber-900 ${className}`}
    >
      {children}
    </div>
  );
}

type ErrorMessageProps = {
  children: React.ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
  return <span className="text-sm text-red-700">{children}</span>;
}

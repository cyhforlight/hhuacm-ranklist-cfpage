interface EmptyValueProps {
  label?: string;
}

export function EmptyValue({ label = '—' }: EmptyValueProps) {
  return <span className="text-text-light">{label}</span>;
}

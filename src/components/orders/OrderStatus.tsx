import { getStatusConfig } from '@/utils';
import clsx from 'clsx';

interface Props {
  status: string;
  className?: string
}

export const OrderStatus = ({ status, className }: Props) => {
  const { color, icon, text } = getStatusConfig({status})

  return (
    <div
      className={
        `flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-${color} ${className}`}
    >
      {icon}
      <span className="mx-2">{text}</span>
    </div>
  );
};

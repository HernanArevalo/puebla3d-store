import clsx from 'clsx';
import { IoCartOutline } from 'react-icons/io5';

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
        {
          'bg-red-600': !isPaid,
          'bg-green-600': isPaid,
        }
      )}
    >
      <IoCartOutline size={30} />
      {/* <span className="mx-2">Pendiente</span> */}
      <span className="mx-2">{isPaid ? 'Pagado' : 'No pagado'}</span>
    </div>
  );
};

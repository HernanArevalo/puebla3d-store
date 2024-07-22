import { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
  return (
    <div className=''>
      <h3 className='font-bold mb-4'>Size</h3>

      <div className='flex gap-2'>
        {availableSizes.map((size) => (
          <button
					key={size}
					onClick={() => onSizeChanged(size)}
            className={clsx('hover:underline text-lg p-1 rounded min-w-[32px]', {
              'bg-gray-200 font-semibold': size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

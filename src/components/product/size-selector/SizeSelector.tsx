import clsx from 'clsx';

interface Props {
  selectedSize?: string;
  availableSizes: string[];

  onSizeChanged: (size: string) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
  return (
    <div className=''>
      <h3 className='font-bold text-lg underline mb-2'>Tamaño:</h3>

      <div className='flex gap-2'>
        {availableSizes.map((size) => (
          <button
					key={size}
					onClick={() => onSizeChanged(size)}
            className={
              clsx('capitalize hover:bg-puebla-dark text-lg px-2 rounded min-w-[32px] transition-all', {
                'text-black font-normal': size !== selectedSize,
                'bg-puebla-dark text-white font-semibold': size === selectedSize,
  
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

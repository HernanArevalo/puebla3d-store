import { ProductColor } from '@/interfaces';
import clsx from 'clsx'

interface Props {
  selectedColor?: ProductColor;
  availableColors: ProductColor[];

  onColorChanged: (color: ProductColor) => void;
}

export const ColorSelector = ({ selectedColor: selectedColor, availableColors: availableColors, onColorChanged }: Props) => {
  return (
    <>
      <h3 className='font-bold mb-2 mt-5'>Colores</h3>

      <div className='flex gap-2'>
        {availableColors.map((color) => (
          <button key={color.name}
          onClick={()=> onColorChanged(color)}
          className={
            clsx('capitalize hover:bg-puebla-dark text-lg px-2 rounded-sm min-w-[32px] transition-all', {
              'text-black font-normal': color !== selectedColor,
              'bg-puebla-dark text-white font-semibold': color === selectedColor,
          })}
          >
            {color.name}
          </button>
        ))}
      </div>
    </>
  )
}

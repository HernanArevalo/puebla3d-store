import { getStatusConfig } from '@/utils';
import clsx from 'clsx';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCubeOutline, IoPaperPlaneOutline, IoTimeOutline } from 'react-icons/io5';

interface Props {
  status: string;
  className?: string
}

export const OrderStatus = ({ status, className }: Props) => {
  const { color, icon, text, bg } = getStatusConfig({ status })

  switch (status) {
    case 'PENDING':
      return (<div
        className={`flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-yellow-600 ${className}`}
      >
        <IoTimeOutline size={30}/>
        <span className="mx-2">{text}</span>
      </div>);
    case 'PROCESSING':
      return (<div
        className={`flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-blue-600 ${className}`}
      >
        <IoCubeOutline size={30}/>
        <span className="mx-2">{text}</span>
      </div>);
    case 'PRODUCTION':
      return (<div
        className={`flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-purple-600 ${className}`}
      >
        <IoCubeOutline size={30}/>
        <span className="mx-2">{text}</span>
      </div>);
    case 'SHIPPED':
      return (
        <div
          className={`flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-orange-600 ${className}`}
        >
          <IoPaperPlaneOutline size={30}/>
          <span className="mx-2">{text}</span>
        </div>);
    case 'DELIVERED':
      return (
        <div
          className={`flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-green-600 ${className}`}
        >
          <IoCheckmarkCircleOutline size={30}/>
          <span className="mx-2">{text}</span>
        </div>

      )
    case 'CANCELLED':
      return (<div
        className={`flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-red-600 ${className}`}
      >
        <IoCloseCircleOutline size={30}/>
        <span className="mx-2">{text}</span>
      </div>)
    default:
      return (<div
        className={`flex items-center gap-4 rounded-lg py-2 px-3.5 text-xs font-bold text-white bg-gray-600 ${className}`}
      >
        <IoTimeOutline size={30}/>
        <span className="mx-2">{text}</span>
      </div>
      )
  }
};

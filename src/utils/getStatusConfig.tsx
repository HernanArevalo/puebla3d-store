import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCubeOutline, IoPaperPlaneOutline, IoTimeOutline } from 'react-icons/io5';

interface Props {
  status: string;
  iconSize?: number;
}

export const getStatusConfig = ({status, iconSize=30}:Props) => {
  switch (status) {
    case 'PENDING':
      return {
        text: 'Pendiente de pago',
        color: 'text-yellow-600',
        bg: 'bg-yellow-600',
        icon: <IoTimeOutline size={iconSize}/>
      };
    case 'PROCESSING':
      return {
        text: 'Procesando pago',
        color: 'text-blue-600',
        bg: 'bg-blue-600',
        icon: <IoCubeOutline size={iconSize} />,
      };
    case 'PRODUCTION':
      return {
        text: 'En producción',
        color: 'text-purple-600',
        bg: 'bg-purple-600',
        icon: <IoCubeOutline size={iconSize} />,
      };
    case 'SHIPPED':
      return {
        text: 'Enviado',
        color: 'text-orange-600',
        bg: 'bg-orange-600',
        icon: <IoPaperPlaneOutline size={iconSize} />,
      };
    case 'DELIVERED':
      return {
        text: 'Pedido entregado',
        color: 'text-green-600',
        bg: 'bg-green-600',
        icon: <IoCheckmarkCircleOutline size={iconSize} />,
      };
    case 'CANCELLED':
      return {
        text: 'Pedido cancelado',
        color: 'text-red-600',
        bg: 'bg-red-600',
        icon: <IoCloseCircleOutline size={iconSize} />,
      };
    default:
      return {
        text: 'Estado desconocido',
        color: 'text-gray-600',
        bg: 'bg-gray-600',
        icon: <IoTimeOutline size={iconSize} />,
      };
  }
};
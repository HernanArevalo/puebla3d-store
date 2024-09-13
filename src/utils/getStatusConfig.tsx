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
        color: 'yellow-600',
        icon: <IoTimeOutline size={iconSize}/>
      };
    case 'PROCESSING':
      return {
        text: 'Procesando pago',
        color: 'blue-600',
        icon: <IoCubeOutline size={iconSize} />,
      };
    case 'PRODUCTION':
      return {
        text: 'En producción',
        color: 'purple-600',
        icon: <IoCubeOutline size={iconSize} />,
      };
    case 'SHIPPED':
      return {
        text: 'Enviado',
        color: 'orange-600',
        icon: <IoPaperPlaneOutline size={iconSize} />,
      };
    case 'DELIVERED':
      return {
        text: 'Pedido entregado',
        color: 'green-600',
        icon: <IoCheckmarkCircleOutline size={iconSize} />,
      };
    case 'CANCELLED':
      return {
        text: 'Pedido cancelado',
        color: 'red-600',
        icon: <IoCloseCircleOutline size={iconSize} />,
      };
    default:
      return {
        text: 'Estado desconocido',
        color: 'gray-600',
        icon: <IoTimeOutline size={iconSize} />,
      };
  }
};
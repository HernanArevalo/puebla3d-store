import { ReactNode } from "react"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCubeOutline, IoPaperPlaneOutline, IoTimeOutline } from "react-icons/io5";

interface Props {
  status:string;
}

export const OrderStatusInRow = ({status}:Props) => {
  switch (status) {
    case 'PENDING':
      return (
        <>
        <span className={`text-yellow-600
            `}><IoTimeOutline/>
        </span>
        <span className={`mx-2 text-yellow-600`}>Pendiente de pago</span>
    </>);
    case 'PROCESSING':
      return (
        <>
        <span className={`text-blue-600`}>
          <IoCubeOutline/>
        </span>
        <span className={`mx-2 text-blue-600`}>Procesando pago</span>
    </>);
    case 'PRODUCTION':
      return (
        <>
        <span className={`text-purple-600`}>
          <IoCubeOutline/>
        </span>
        <span className={`mx-2 text-purple-600`}>En producción</span>
    </>);
    case 'SHIPPED':
      return (
        <>
        <span className={`text-orange-600`}>
          <IoPaperPlaneOutline/>
        </span>
        <span className={`mx-2 text-orange-600`}>Enviado</span>
    </>);
    case 'DELIVERED':
      return (
        <>
        <span className={`text-green-600`}>
          <IoCheckmarkCircleOutline/>
        </span>
        <span className={`mx-2 text-green-600`}>Pedido entregado</span>
    </>);
    case 'CANCELLED':
      return (
        <>
        <span className={`text-red-600`}>
          <IoCloseCircleOutline/>
        </span>
        <span className={`mx-2 text-red-600`}>Pedido cancelado</span>
    </>);
    default:
      return (
        <>
        <span className={`text-gray-600`}>
          <IoTimeOutline/>
        </span>
        <span className={`mx-2 text-gray-600`}>Estado desconocido</span>
    </>);
  }
}

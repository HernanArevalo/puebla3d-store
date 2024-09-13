import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

interface Props {
  icon?: SweetAlertIcon;
  title: string;
  position?: SweetAlertPosition;
  background?: string;
  color?: string;
  iconColor?: string;
  width?: string;
}

export const SweetAlert = ({
  icon, 
  title,
  position = "top",
  background = "#92C7D7",
  color = "black",
  iconColor = "white",
  width = "auto",
}: Props) => {

  const Toast = Swal.mixin({
    toast: true,
    position: position || "top",
    background: background || "#92C7D7",
    color: color || "black",
    iconColor: iconColor || "white",
    width: width || "auto",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  
  Toast.fire({
    icon: icon,
    title: title,
  });
};

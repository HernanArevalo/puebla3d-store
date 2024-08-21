
interface Params {
  color?: string
}

export const Divider = ({ color = '#92C7D7'}: Params) => {
  return (
    <div className="w-full h-0.5 rounded mb-10 " style={{backgroundColor: color}}/>
  )
}


interface Params {
  color?: string
  className?: string

}

export const Divider = ({ color = '#92C7D7', className}: Params) => {
  return (
    <div className={`w-full h-0.5 rounded ${className}`} style={{backgroundColor: color}}/>
  )
}

import * as icons from "react-feather"

export default function Icon({ name, ...rest }) {
  const IconComponent = icons[name]
  return <IconComponent {...rest} />
}
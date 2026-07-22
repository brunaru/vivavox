import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function PersonIcon(props) {
  return (
    <Svg
      width={15}
      height={22}
      viewBox="0 0 15 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.214 12.035C2.414 12.007 1.167 20 1.167 20l12 .07s-1.153-8.007-5.953-8.035z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={2}
      />
      <Circle
        cx={7.25459}
        cy={5.035}
        r={4.5}
        transform="rotate(.335 7.255 5.035)"
        fill="#fff"
        stroke="#fff"
      />
    </Svg>
  )
}

export default PersonIcon

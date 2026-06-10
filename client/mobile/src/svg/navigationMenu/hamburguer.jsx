import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HamburguerIcon(props) {
  return (
    <Svg
      width={23}
      height={19}
      viewBox="0 0 23 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.5 17.5h19.364M1.5 9.5h19.364M1.5 1.5h19.364"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default HamburguerIcon

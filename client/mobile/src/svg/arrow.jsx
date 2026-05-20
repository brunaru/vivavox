import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function Arrow(props) {
  return (
    <Svg
      width={46}
      height={28}
      viewBox="0 0 46 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect y={10} width={32} height={8} rx={2} fill="#fff" />
      <Path
        d="M44.903 13.194a1 1 0 010 1.612l-13.81 10.148a1 1 0 01-1.593-.805V3.85a1 1 0 011.592-.805l13.811 10.148z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Arrow
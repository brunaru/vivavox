import * as React from "react"
import Svg, { Mask, Rect, Path } from "react-native-svg"

function BoardIcon(props) {
  return (
    <Svg
      width={23}
      height={26}
      viewBox="0 0 23 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask id="a" fill="#fff">
        <Rect
          x={0.122762}
          y={4.4502}
          width={22}
          height={21}
          rx={2}
          transform="rotate(.335 .123 4.45)"
        />
      </Mask>
      <Rect
        x={0.122762}
        y={4.4502}
        width={22}
        height={21}
        rx={2}
        transform="rotate(.335 .123 4.45)"
        stroke="#fff"
        strokeWidth={6}
        mask="url(#a)"
      />
      <Path
        d="M5.133 2.752L5.117 5.48l12 .07.005-.909.01-1.818-2.727-.016L12.782.524 8.964.502 7.86 2.768l-2.727-.016z"
        fill="#fff"
        stroke="#fff"
      />
    </Svg>
  )
}

export default BoardIcon

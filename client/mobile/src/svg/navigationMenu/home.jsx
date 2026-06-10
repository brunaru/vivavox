import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon(props) {
  return (
    <Svg
      width={22}
      height={24}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.006 22.393l.064-11 10.058-9.94 8.942 10.052-.064 11-6.5-.039.052-9-5.5-.032-.052 9-7-.04z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default HomeIcon

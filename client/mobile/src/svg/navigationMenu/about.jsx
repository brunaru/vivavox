import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AboutIcon(props) {
  return (
    <Svg
      width={20}
      height={23}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.828 14.612S3.885 3.517.932 6.92c-4.157 4.792 6.674 16.652 11.186 16.024 6.433-.894 8.79-22.197 5.277-22.91-4.32-.875-5.567 14.577-5.567 14.577z"
        fill="#fff"
      />
    </Svg>
  )
}

export default AboutIcon

import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useDisplaySettings } from "../../contexts/displaySettingsContext"

function BoardIcon(props) {
  const { contrastTheme } = useDisplaySettings();
    
  return (
    <Svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M24.475.7h-8.837c-.553 0-1.001.454-1.001 1.015v8.47c0 .56.448 1.015 1 1.015h8.838c.553 0 1.001-.454 1.001-1.015v-8.47c0-.56-.448-1.015-1-1.015z"
        fill="#fff"
        stroke="#000"
        strokeWidth={1.4}
        strokeMiterlimit={3.5}
      />
      <Path
        d="M24.887.7h-9.66a.593.593 0 00-.59.597v9.306c0 .33.264.597.59.597h9.66c.325 0 .59-.268.59-.597V1.297a.593.593 0 00-.59-.597z"
        stroke="#A34373"
        strokeWidth={2}
      />
      <Path
        d="M24.475 14.2h-8.837c-.553 0-1.001.454-1.001 1.015v8.47c0 .56.448 1.015 1 1.015h8.838c.553 0 1.001-.454 1.001-1.015v-8.47c0-.56-.448-1.015-1-1.015z"
        fill="#fff"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={3.5}
      />
      <Path
        d="M24.887 14.2h-9.66a.593.593 0 00-.59.597v9.306c0 .33.264.597.59.597h9.66c.325 0 .59-.267.59-.597v-9.306a.593.593 0 00-.59-.597z"
        stroke="#0072EB"
        strokeWidth={2}
      />
      <Path
        d="M10.539.7H1.7c-.553 0-1 .454-1 1.015v8.47c0 .56.447 1.015 1 1.015h8.838c.553 0 1-.454 1-1.015v-8.47c0-.56-.447-1.015-1-1.015z"
        fill="#fff"
        stroke="#000"
        strokeWidth={1.4}
        strokeMiterlimit={3.5}
      />
      <Path
        d="M10.95.7H1.29a.593.593 0 00-.59.597v9.306c0 .33.264.597.59.597h9.66c.326 0 .59-.268.59-.597V1.297A.593.593 0 0010.95.7z"
        stroke="#0072EB"
        strokeWidth={2}
      />
      <Path
        d="M10.539 14.2H1.7c-.553 0-1 .454-1 1.015v8.47c0 .56.447 1.015 1 1.015h8.838c.553 0 1-.454 1-1.015v-8.47c0-.56-.447-1.015-1-1.015z"
        fill="#fff"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={3.5}
      />
      <Path
        d="M10.95 14.2H1.29a.593.593 0 00-.59.597v9.306c0 .33.264.597.59.597h9.66c.326 0 .59-.267.59-.597v-9.306a.593.593 0 00-.59-.597z"
        stroke="#999F1A"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default BoardIcon

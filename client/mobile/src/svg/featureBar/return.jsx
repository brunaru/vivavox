import * as React from "react"
import Svg, { G, Circle, Path, Text, TSpan } from "react-native-svg"
import { useDisplaySettings } from "../../contexts/displaySettingsContext"

export default function ReturnIcon(props) {
  const { contrastTheme } = useDisplaySettings();
  return (
    <Svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 15 15"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G>
        <Path
          d="M-49.195 24.887c-1.293.01-2.957 1.014-3.528 1.517-.425.375-.458 1.22-.168 1.71.545.922 3.264 3.537 4.643 2.451.116-.09.217-.692.284-1.46.067.011.136.018.207.018h4.322c.641 0 1.157-.526 1.157-1.179v-.177c0-.653-.516-1.178-1.157-1.178h-4.322c-.042 0-.083.002-.123.006-.018-.688-.08-1.22-.2-1.332-.294-.273-.684-.38-1.115-.377z"
          transform="translate(55.18 -20.354)"
          fill="#e41223"
          fillOpacity={1}
          stroke={contrastTheme.iconStroke}
          strokeWidth={0.634893}
          strokeDasharray="none"
          strokeOpacity={1}
        />
      </G>
    </Svg>
  )
}



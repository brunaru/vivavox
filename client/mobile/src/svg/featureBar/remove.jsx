import * as React from "react"
import Svg, { G, Circle, Path, Text, TSpan, Rect } from "react-native-svg"
import { useDisplaySettings } from "../../contexts/displaySettingsContext"

export default function RemoveIcon(props) {
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
      <G
        transform="translate(52.54 -20.188) matrix(.28238 0 0 .2792 150.503 -6.043)"
        fill="#fff"
        fillOpacity={1}
        stroke={contrastTheme.iconStroke}
        strokeWidth={2.42531}
        strokeDasharray="none"
        strokeOpacity={1}
      >
        <Circle
          cx={35.813763}
          cy={86.690102}
          r={8.284234}
          fill="#a34930"
          fillOpacity={1}
          stroke={contrastTheme.iconStroke}
          strokeWidth={2.42531}
          strokeLinejoin="round"
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M35.868 94.867c-9.393-.124-12.84 8.542-11.313 12.728.05.246.604.455 1.508.628 1.432-.02 19.196-.06 19.196-.06s1.807.088 1.953-.763c.913-5.322-2.783-12.42-11.344-12.533z"
          fill="#b332ee"
          fillOpacity={1}
          stroke={contrastTheme.iconStroke}
          strokeWidth={2.42531}
          strokeLinejoin="round"
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M50.484 78.56c1.45-1.671 3.914 1.372 4.445 4.252.68 3.684-2.124 8.858-4.3 7.158-1.426-1.115-.527-2.213.394-3.565.5-.734.612-1.672.636-2.566.073-2.686-2.989-3.187-1.175-5.278zM56.938 73.59c1.87-1.375 4.664 3.503 5.782 6.79.536 1.577.83 5.1-.347 8.69-1.189 3.628-4.164 7.262-5.74 5.556-1.706-1.85.79-2.635 2.156-5.659.613-1.356 1.273-3.515.812-6.76-.836-5.882-5.508-6.523-2.663-8.616z"
          fill="#fff"
          fillOpacity={1}
          stroke={contrastTheme.iconStroke}
          strokeWidth={2.42531}
          strokeLinejoin="round"
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M64.508 66.078c1.95-1.318 6.78 5.951 8.54 12.57.806 3.03.743 7.742-.058 11.356-.755 3.41-5.774 13.876-8.491 12.231-3.977-2.409 2.75-3.653 4.502-10.932.058-.24 2.736-7.551-.253-15.116-2.907-7.356-7.437-7.947-4.24-10.109z"
          fill="#fff"
          fillOpacity={1}
          stroke={contrastTheme.iconStroke}
          strokeWidth={2.42531}
          strokeLinejoin="round"
          strokeDasharray="none"
          strokeOpacity={1}
        />
      </G>
      <G transform="translate(52.54 -20.188) matrix(.28238 0 0 .2792 -37.334 -19.665) translate(119.2 -1.68) translate(-132.38 149.577)">
        <Circle
          cx={-38.083298}
          cy={171.98366}
          r={7.3153419}
          fill="#a34930"
          fillOpacity={1}
          stroke={contrastTheme.iconStroke}
          strokeWidth={2.14165}
          strokeLinejoin="round"
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M-38.036 179.204c-8.294-.11-11.338 7.543-9.99 11.24.045.217.534.402 1.333.554 1.263-.018 16.95-.053 16.95-.053s1.596.078 1.724-.673c.807-4.7-2.457-10.968-10.017-11.068z"
          fill="#b332ee"
          fillOpacity={1}
          stroke={contrastTheme.iconStroke}
          strokeWidth={2.14165}
          strokeLinejoin="round"
          strokeDasharray="none"
          strokeOpacity={1}
        />

      </G>
      <G>
        <G transform="translate(53.424 -19.183) translate(111.516 -44.706)">
          <Path
            d="M36.768 86.517l3.607 3.363-2.147 1.727-3.608-2.825z"
            fill="#fff"
            fillOpacity={1}
            strokeWidth={1.07815}
            strokeLinejoin="round"
          />
          <G fill="#d52020" fillOpacity={1}>
            <Path
              transform="translate(-28.737 -2.557) rotate(-46.398)"
              d="M-18.982651 108.88808H-12.0217135V113.7949704H-18.982651z"
              fill="#d52020"
              fillOpacity={1}
              stroke="none"
              strokeWidth={1.3698}
              strokeLinejoin="round"
              strokeDasharray="none"
              strokeDashoffset={0}
              strokeOpacity={1}
            />
          </G>
          <Rect
            width={8.6481352}
            height={0.66849637}
            x={33.739376}
            y={90.895805}
            ry={0.33424819}
            fill="#000"
            fillOpacity={1}
            stroke="none"
            strokeWidth={0.37443}
            strokeLinejoin="round"
            strokeDasharray="none"
            strokeDashoffset={0}
            strokeOpacity={1}
          />
          <Path
            d="M42.02 81.178c-.372 0-.743.15-1.04.45l-5.934 5.982c-.593.598-.643 1.424-.052 2.024l1.528 1.55c.308.312 2.862.254 3.12-.004l5.477-5.486c.595-.597.624-1.389.028-1.985l-2.085-2.085a1.466 1.466 0 00-1.042-.446zm-.061.637c.243.008.514.174.89.547l1.772 1.759c.53.525.16 1.08-.196 1.434l-5.23 5.202c-.036.036-2.03.026-2.055.004l-1.434-1.37c-.818-.782-.285-1.294.37-1.955l5.162-5.21c.263-.265.478-.417.72-.41z"
            fill="#000"
            fillOpacity={1}
            stroke={contrastTheme.iconStroke}
            strokeWidth={0.126}
            strokeLinejoin="round"
            strokeDasharray="none"
            strokeOpacity={1}
          />
          <Rect
            width={4.7016716}
            height={0.88025713}
            x={-92.75515}
            y={-36.678352}
            ry={0}
            transform="matrix(-.71532 -.6988 .72174 -.69216 0 0)"
            fill="#000"
            fillOpacity={1}
            stroke="none"
            strokeWidth={0.176383}
            strokeLinejoin="round"
            strokeDasharray="none"
            strokeDashoffset={0}
            strokeOpacity={1}
          />
          <Path
            d="M-160.325 72.02l3.608 3.363-2.148 1.727-3.607-2.825z"
            fill="#fff"
            fillOpacity={1}
            strokeWidth={1.07815}
            strokeLinejoin="round"
          />
          <G fill="#d52020" fillOpacity={1}>
            <Path
              transform="translate(-225.83 -17.054) rotate(-46.398)"
              d="M-18.982651 108.88808H-12.0217135V113.7949704H-18.982651z"
              fill="#d52020"
              fillOpacity={1}
              stroke="none"
              strokeWidth={1.3698}
              strokeLinejoin="round"
              strokeDasharray="none"
              strokeDashoffset={0}
              strokeOpacity={1}
            />
          </G>
          <Rect
            width={8.6481352}
            height={0.66849637}
            x={-163.35228}
            y={76.398865}
            ry={0.33424819}
            fill={contrastTheme.iconStroke}
            fillOpacity={1}
            stroke="none"
            strokeWidth={0.37443}
            strokeLinejoin="round"
            strokeDasharray="none"
            strokeDashoffset={0}
            strokeOpacity={1}
          />
          <Path
            d="M-155.072 66.68c-.372.001-.744.151-1.04.45l-5.934 5.983c-.594.598-.644 1.424-.052 2.024l1.527 1.55c.308.312 2.863.254 3.12-.004l5.477-5.486c.596-.597.624-1.389.028-1.985l-2.084-2.085a1.466 1.466 0 00-1.042-.446zm-.062.639c.243.007.515.173.89.546l1.773 1.759c.53.526.16 1.08-.197 1.434l-5.23 5.202c-.036.036-2.03.026-2.054.004l-1.434-1.37c-.819-.782-.286-1.294.37-1.955l5.161-5.21c.263-.265.478-.417.721-.41z"
            fill={contrastTheme.iconStroke}
            fillOpacity={1}
            stroke={contrastTheme.iconStroke}
            strokeWidth={0.126}
            strokeLinejoin="round"
            strokeDasharray="none"
            strokeOpacity={1}
          />
          <Rect
            width={4.7016716}
            height={0.88025713}
            x={54.205288}
            y={-164.10471}
            ry={0}
            transform="matrix(-.71532 -.6988 .72174 -.69216 0 0)"
            fill="#000"
            fillOpacity={1}
            stroke="none"
            strokeWidth={0.176383}
            strokeLinejoin="round"
            strokeDasharray="none"
            strokeDashoffset={0}
            strokeOpacity={1}
          />
        </G>
      </G>
    </Svg>
  )
}



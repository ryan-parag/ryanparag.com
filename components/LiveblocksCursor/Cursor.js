import { useEventListener } from '@liveblocks/react'
import React from 'react'

const SVG_CURSOR_OFFSET_X = 8
const SVG_CURSOR_OFFSET_Y = -2

const COLORS = [
  'var(--secondary)',
  'var(--tertiary)',
  'var(--primary)'
]

const BORDERS = [
  'var(--secondaryDark)',
  'var(--tertiaryDark)',
  'var(--primaryDark)'
]

export function Cursor({ connectionId, x, y }) {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      transform: `translateX(${x}px) translateY(${y}px)`,
    }}>
      <svg
        style={{
          position: "absolute",
          left: '50%',
          top: '50%',
          transition: "transform 0.5s cubic-bezier(.17,.93,.38,1)",
          transform: 'translate(-50%,-50%)'
        }}
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.65376 14.8681L7.6538 14.8681H13.7841H15L14.1358 14.0127L2.85173 2.84386L2 2.00082V3.19922V18.8837V20.015L2.83659 19.2534L7.65376 14.8681Z"
          fill={COLORS[connectionId % COLORS.length]}
          stroke={BORDERS[connectionId % COLORS.length]}
        />
      </svg>
    </div>
  )
}
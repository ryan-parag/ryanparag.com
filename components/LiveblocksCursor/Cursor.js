import { useEventListener } from '@liveblocks/react'
import React from 'react'

const SVG_CURSOR_OFFSET_X = 8
const SVG_CURSOR_OFFSET_Y = -2

const COLORS = [
  '#EF4444',
  '#FBBF24',
  '#10B981',
  '#3B82F6',
  '#6366F1',
  '#EC4899',
  '#F87171',
  '#831843',
  '#064E3B',
]

export function Cursor({ x, y }) {
  return (
    <svg
      style={{
        transition: 'transform 0.5s cubic-bezier(.17,.93,.38,1)',
        transform: `translateX(${
          x + SVG_CURSOR_OFFSET_X
        }px) translateY(${y + SVG_CURSOR_OFFSET_Y}px)`,
      }}
      className="absolute hidden md:inline"
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.65376 14.8681L7.6538 14.8681H13.7841H15L14.1358 14.0127L2.85173 2.84386L2 2.00082V3.19922V18.8837V20.015L2.83659 19.2534L7.65376 14.8681Z"
        fill="red"
        stroke="white"
      />
    </svg>
  )
}
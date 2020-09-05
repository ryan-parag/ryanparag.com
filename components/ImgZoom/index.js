import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

export default function({src,alt}) {
  return(
      <TransformWrapper
       maxScale={3}
      >
        <div
          style={{
            border: '1px solid var(--grey300)',
            cursor: 'zoom-in'
          }}
          title="Click or scroll to zoom, drag to navigate"
        >
          <TransformComponent>
            <img
              src={src}
              alt={alt}
            />
          </TransformComponent>
        </div>
      </TransformWrapper>
  )
}
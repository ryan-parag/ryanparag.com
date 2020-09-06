import React from 'react'
import Zoom from 'react-medium-image-zoom'

export default function({src,alt}) {
  return(
      <Zoom
      overlayBgColorEnd={'var(--transparent)'}
      overlayBgColorStart={'var(--transparent)'}
      closeText={'Close'}
      zoomMargin={40}
      >
        <img
          src={src}
          alt={alt}
          width="500"
          style={{
            display: 'block',
            margin: 'auto',
            border: '1px solid var(--grey300)'
          }}
        />
      </Zoom>
  )
}
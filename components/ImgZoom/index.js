import React from 'react'
import Zoom from 'react-medium-image-zoom'

const ImgZoom = ({src,alt}) => {
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
          style={{
            display: 'block',
            margin: 'auto',
            border: '1px solid var(--grey300)',
            width: '100%'
          }}
        />
      </Zoom>
  )
}

export default ImgZoom
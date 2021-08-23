import React from 'react'
import Zoom from 'react-medium-image-zoom'
import Image from 'next/image'

const ImgZoom = ({src,alt}) => {
  return(
      <Zoom
        overlayBgColorEnd={'var(--transparent)'}
        overlayBgColorStart={'var(--transparent)'}
        closeText={'Close'}
        zoomMargin={40}
        wrapElement={'picture'}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            margin: 'auto',
            width: '100%'
          }}
        />
      </Zoom>
  )
}

export default ImgZoom
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const LogoLabelContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${designTokens.space[2]} ${designTokens.space[2]} ${designTokens.space[2]} 0;
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    background: var(--grey100);
    padding-left: ${designTokens.space[3]};
    box-shadow: inset ${designTokens.space[1]} 0px 0px var(--primary);
  }
`

const LogoLabel = styled.strong`
  font-size: ${designTokens.fontSizes[2]};
  display:block;
`

const LogoSubtitle = styled.span`
  font-size: ${designTokens.fontSizes[0]};
  margin-top: ${designTokens.space[1]};
  display: block;
`

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: rotate(-6deg);
  svg {
    display: block;
    width: 100%;
  }
  .shadow {
    position: relative;
    transform: translateY(10px);
  }
`

export const WorkLogo = () => {
  return(
    <LogoIcon>
      <svg viewBox="0 0 312 312" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M146.021 6.72671C149.203 3.14658 154.797 3.14658 157.979 6.7267L185.053 37.185C186.976 39.3486 189.918 40.3044 192.746 39.6845L232.552 30.9569C237.231 29.931 241.757 33.2191 242.227 37.986L246.227 78.541C246.511 81.4217 248.33 83.9242 250.982 85.0847L288.315 101.421C292.704 103.342 294.432 108.662 292.011 112.795L271.41 147.956C269.946 150.453 269.946 153.547 271.41 156.044L292.011 191.205C294.432 195.338 292.704 200.658 288.315 202.579L250.982 218.915C248.33 220.076 246.511 222.578 246.227 225.459L242.227 266.014C241.757 270.781 237.231 274.069 232.552 273.043L192.746 264.315C189.918 263.696 186.976 264.651 185.053 266.815L157.979 297.273C154.797 300.853 149.203 300.853 146.021 297.273L118.947 266.815C117.024 264.651 114.082 263.696 111.254 264.315L71.4478 273.043C66.7689 274.069 62.2434 270.781 61.7732 266.014L57.7728 225.459C57.4886 222.578 55.6704 220.076 53.0185 218.915L15.6846 202.579C11.2963 200.658 9.56767 195.338 11.9892 191.205L32.5904 156.044C34.0538 153.547 34.0538 150.453 32.5904 147.956L11.9892 112.795C9.56768 108.662 11.2963 103.342 15.6846 101.421L53.0185 85.0847C55.6704 83.9242 57.4886 81.4217 57.7728 78.541L61.7732 37.986C62.2434 33.2191 66.7689 29.931 71.4478 30.9569L111.254 39.6845C114.082 40.3044 117.024 39.3486 118.947 37.185L146.021 6.72671Z" className="shadow" fill="var(--grey200)"/>
        <path d="M146.021 6.72671C149.203 3.14658 154.797 3.14658 157.979 6.7267L185.053 37.185C186.976 39.3486 189.918 40.3044 192.746 39.6845L232.552 30.9569C237.231 29.931 241.757 33.2191 242.227 37.986L246.227 78.541C246.511 81.4217 248.33 83.9242 250.982 85.0847L288.315 101.421C292.704 103.342 294.432 108.662 292.011 112.795L271.41 147.956C269.946 150.453 269.946 153.547 271.41 156.044L292.011 191.205C294.432 195.338 292.704 200.658 288.315 202.579L250.982 218.915C248.33 220.076 246.511 222.578 246.227 225.459L242.227 266.014C241.757 270.781 237.231 274.069 232.552 273.043L192.746 264.315C189.918 263.696 186.976 264.651 185.053 266.815L157.979 297.273C154.797 300.853 149.203 300.853 146.021 297.273L118.947 266.815C117.024 264.651 114.082 263.696 111.254 264.315L71.4478 273.043C66.7689 274.069 62.2434 270.781 61.7732 266.014L57.7728 225.459C57.4886 222.578 55.6704 220.076 53.0185 218.915L15.6846 202.579C11.2963 200.658 9.56767 195.338 11.9892 191.205L32.5904 156.044C34.0538 153.547 34.0538 150.453 32.5904 147.956L11.9892 112.795C9.56768 108.662 11.2963 103.342 15.6846 101.421L53.0185 85.0847C55.6704 83.9242 57.4886 81.4217 57.7728 78.541L61.7732 37.986C62.2434 33.2191 66.7689 29.931 71.4478 30.9569L111.254 39.6845C114.082 40.3044 117.024 39.3486 118.947 37.185L146.021 6.72671Z" fill="var(--primary)"/>
        <path d="M123.872 84.3044C123.972 78.974 116.87 77.0653 114.284 81.7274L77.8499 147.41C75.9791 150.783 78.3714 154.934 82.2273 155.006L102.13 155.379C104.955 155.432 107.201 157.764 107.149 160.589L106.301 205.868C106.201 211.198 113.303 213.107 115.889 208.445L152.323 142.762C154.194 139.389 151.801 135.238 147.945 135.166L128.043 134.794C125.218 134.741 122.971 132.408 123.024 129.583L123.872 84.3044Z" className="shadow" fill="rgba(0,0,0,0.2)"/>
        <path d="M200.233 114.651C196.842 116.3 195.525 120.432 192.893 128.695L178.768 173.026C176.653 179.663 175.596 182.982 176.681 185.849C176.87 186.348 177.104 186.828 177.38 187.285C178.965 189.909 182.229 191.125 188.756 193.559C195.283 195.993 198.547 197.21 201.463 196.265C201.97 196.1 202.462 195.89 202.931 195.637C205.628 194.18 207.002 190.979 209.749 184.577L228.096 141.821C231.516 133.852 233.226 129.867 231.742 126.4C230.259 122.932 226.196 121.417 218.07 118.388L215.814 117.546C207.687 114.516 203.624 113.001 200.233 114.651Z" className="shadow" fill="rgba(0,0,0,0.2)"/>
        <path d="M169.514 202.751C167.968 204.176 167.111 206.475 165.397 211.071C163.683 215.668 162.826 217.967 163.061 220.056C163.271 221.916 164.068 223.661 165.337 225.037C166.762 226.583 169.061 227.44 173.657 229.154L176.864 230.35C181.461 232.064 183.76 232.921 185.849 232.685C187.709 232.476 189.454 231.679 190.83 230.41C192.376 228.985 193.233 226.686 194.947 222.089C196.661 217.493 197.518 215.194 197.282 213.105C197.073 211.245 196.276 209.5 195.007 208.124C193.582 206.578 191.283 205.721 186.687 204.007L183.48 202.811C178.883 201.097 176.584 200.24 174.495 200.476C172.635 200.685 170.89 201.482 169.514 202.751Z" className="shadow" fill="rgba(0,0,0,0.2)"/>
        <path d="M123.872 84.3044C123.972 78.974 116.87 77.0653 114.284 81.7274L77.8499 147.41C75.9791 150.783 78.3714 154.934 82.2273 155.006L102.13 155.379C104.955 155.432 107.201 157.764 107.149 160.589L106.301 205.868C106.201 211.198 113.303 213.107 115.889 208.445L152.323 142.762C154.194 139.389 151.801 135.238 147.945 135.166L128.043 134.794C125.218 134.741 122.971 132.408 123.024 129.583L123.872 84.3044Z" fill="var(--grey0)"/>
        <path d="M200.233 114.651C196.842 116.3 195.525 120.432 192.893 128.695L178.768 173.026C176.653 179.663 175.596 182.982 176.681 185.849C176.87 186.348 177.104 186.828 177.38 187.285C178.965 189.909 182.229 191.125 188.756 193.559C195.283 195.993 198.547 197.21 201.463 196.265C201.97 196.1 202.462 195.89 202.931 195.637C205.628 194.18 207.002 190.979 209.749 184.577L228.096 141.821C231.516 133.852 233.226 129.867 231.742 126.4C230.259 122.932 226.196 121.417 218.07 118.388L215.814 117.546C207.687 114.516 203.624 113.001 200.233 114.651Z" fill="var(--grey0)"/>
        <path d="M169.514 202.751C167.968 204.176 167.111 206.475 165.397 211.071C163.683 215.668 162.826 217.967 163.061 220.056C163.271 221.916 164.068 223.661 165.337 225.037C166.762 226.583 169.061 227.44 173.657 229.154L176.864 230.35C181.461 232.064 183.76 232.921 185.849 232.685C187.709 232.476 189.454 231.679 190.83 230.41C192.376 228.985 193.233 226.686 194.947 222.089C196.661 217.493 197.518 215.194 197.282 213.105C197.073 211.245 196.276 209.5 195.007 208.124C193.582 206.578 191.283 205.721 186.687 204.007L183.48 202.811C178.883 201.097 176.584 200.24 174.495 200.476C172.635 200.685 170.89 201.482 169.514 202.751Z" fill="var(--grey0)"/>
      </svg>
    </LogoIcon>
  )
}

export const AMALogo = () => {
  return(
    <LogoIcon>
      <svg viewBox="0 0 288 224" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M143.774 222.681C223.018 222.681 287.258 172.875 287.258 111.436C287.258 49.9969 223.018 0.190796 143.774 0.190796C64.5292 0.190796 0.288818 49.9969 0.288818 111.436C0.288818 139.857 14.0362 165.79 36.6567 185.453C38.0606 186.674 38.5094 188.697 37.5656 190.3C31.2659 201 21.4518 207.449 9.34771 212.057C6.03135 213.319 5.64831 217.792 8.98599 218.996C29.1992 226.294 57.3078 225.508 77.5506 212.092C78.679 211.344 80.0971 211.16 81.3647 211.635C100.234 218.713 121.406 222.681 143.774 222.681Z" fill="var(--grey200)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M143.774 222.681C223.018 222.681 287.258 172.875 287.258 111.436C287.258 49.9969 223.018 0.190796 143.774 0.190796C64.5292 0.190796 0.288818 49.9969 0.288818 111.436C0.288818 139.857 14.0362 165.79 36.6567 185.453C38.0606 186.674 38.5094 188.697 37.5656 190.3C31.2659 201 21.4518 207.449 9.34771 212.057C6.03135 213.319 5.64831 217.792 8.98599 218.996C29.1992 226.294 57.3078 225.508 77.5506 212.092C78.679 211.344 80.0971 211.16 81.3647 211.635C100.234 218.713 121.406 222.681 143.774 222.681Z" fill="var(--primary)"/>
        <g clipPath="url(#clip0)" filter="url(#filter0_d)">
          <path d="M168.45 51.9453C169.906 46.5082 163.114 42.7475 159.279 46.868L105.251 104.919C102.476 107.9 103.873 112.762 107.806 113.815L128.107 119.255C130.988 120.027 132.698 122.989 131.926 125.87L119.551 172.055C118.094 177.492 124.886 181.253 128.721 177.132L182.75 119.081C185.524 116.1 184.127 111.239 180.194 110.185L159.893 104.745C157.012 103.973 155.302 101.012 156.074 98.1306L168.45 51.9453Z" fill="var(--grey0)"/>
        </g>
        <defs>
          <filter id="filter0_d" x="72" y="42" width="144" height="144" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
          <clipPath id="clip0">
            <rect width="136" height="136" fill="white" transform="translate(76 44)"/>
          </clipPath>
        </defs>
      </svg>
    </LogoIcon>
  )
}

export const ListensIcon = () => {
  return(
    <LogoIcon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 257 256">
        <g clipPath="url(#listens_clip0)">
          <path fill="url(#listens_paint0_linear)" d="M128.952 256c56.089 0 87.269 0 107.635-20.365 20.365-20.366 20.365-51.546 20.365-107.635 0-56.089 0-87.27-20.365-107.635C216.221 0 185.041 0 128.952 0 72.863 0 41.682 0 21.317 20.365.952 40.731.952 71.911.952 128c0 56.089 0 87.269 20.365 107.635C41.682 256 72.863 256 128.952 256z"/>
          <path className="shadow" fill="rgba(0,0,0,0.2)" d="M129 169.57V86.431L94.292 66.393c-8-4.62-18 1.154-18 10.392v102.431c0 9.237 10 15.011 18 10.392L129 169.57zM186.75 118.25a3 3 0 00-3 3v13.5a3 3 0 106 0v-13.5a3 3 0 00-3-3zM171.75 115.812a3 3 0 016 0v24.375a3 3 0 11-6 0v-24.375zM162.75 106.062a3 3 0 00-3 3v37.875a3 3 0 106 0v-37.875a3 3 0 00-3-3zM147.75 101.562a3 3 0 016 0v52.875a3 3 0 11-6 0v-52.875zM138.75 91.625a3 3 0 00-3 3v66.75a3 3 0 106 0v-66.75a3 3 0 00-3-3z"/>
          <path fill="#F5F5F5" d="M129 169.57V86.431L94.292 66.393c-8-4.62-18 1.154-18 10.392v102.431c0 9.237 10 15.011 18 10.392L129 169.57zM186.75 118.25a3 3 0 00-3 3v13.5a3 3 0 106 0v-13.5a3 3 0 00-3-3zM171.75 115.812a3 3 0 016 0v24.375a3 3 0 11-6 0v-24.375zM162.75 106.062a3 3 0 00-3 3v37.875a3 3 0 106 0v-37.875a3 3 0 00-3-3zM147.75 101.562a3 3 0 016 0v52.875a3 3 0 11-6 0v-52.875zM138.75 91.625a3 3 0 00-3 3v66.75a3 3 0 106 0v-66.75a3 3 0 00-3-3z"/>
        </g>
        <defs>
          <linearGradient id="listens_paint0_linear" x1="256.952" x2=".952" y1="0" y2="256" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ED77E1"/>
            <stop offset="1" stopColor="#6FA8FF"/>
          </linearGradient>
          <clipPath id="listens_clip0">
            <path fill="#fff" d="M0 0h256v256H0z" transform="translate(.952)"/>
          </clipPath>
        </defs>
      </svg>
    </LogoIcon>
  )
}

export const WorksheetsIcon = () => {
  return(
    <LogoIcon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
        <path fill="#F7FE8B" d="M128 256c56.089 0 87.269 0 107.635-20.365C256 215.269 256 184.089 256 128c0-56.089 0-87.27-20.365-107.635C215.269 0 184.089 0 128 0 71.911 0 40.73 0 20.365 20.365 0 40.731 0 71.911 0 128c0 56.089 0 87.269 20.365 107.635C40.731 256 71.911 256 128 256z"/>
        <path stroke="#000" strokeOpacity=".12" strokeWidth="4" d="M234.221 234.221c-9.771 9.77-22.191 14.745-39.298 17.255C177.749 253.995 156.101 254 128 254s-49.75-.005-66.923-2.524c-17.107-2.51-29.527-7.485-39.297-17.255-9.771-9.771-14.746-22.191-17.256-39.298C2.004 177.749 2 156.101 2 128s.005-49.75 2.524-66.923C7.034 43.97 12.01 31.55 21.78 21.78 31.55 12.008 43.97 7.033 61.078 4.523 78.25 2.004 99.899 2 128 2s49.749.005 66.923 2.524c17.107 2.51 29.527 7.485 39.298 17.255 9.77 9.771 14.745 22.19 17.255 39.298C253.995 78.25 254 99.899 254 128s-.005 49.749-2.524 66.923c-2.51 17.107-7.485 29.527-17.255 39.298z"/>
        <path fill="#29264B" d="M190.52 179.567c10.61-5.846 17.48-15.19 17.48-25.72 0-17.709-19.432-32.065-43.403-32.065s-43.404 14.356-43.404 32.065c0 17.71 19.433 32.066 43.404 32.066 2.888 0 5.711-.209 8.442-.607L191.315 198l-.795-18.433z"/>
        <path fill="#29264B" d="M75.305 148.267C58.732 139.135 48 124.538 48 108.089 48 80.426 78.356 58 115.801 58c37.446 0 67.801 22.426 67.801 50.089 0 27.664-30.355 50.09-67.801 50.09-4.513 0-8.922-.326-13.188-.947l-28.548 19.829 1.24-28.794z"/>
        <path fill="#F7FE8B" fillRule="evenodd" d="M180.154 123.904c-8.383 18.626-31.168 32.394-58.6 34.097a24.066 24.066 0 01-.361-4.154c0-17.709 19.433-32.065 43.404-32.065 5.482 0 10.727.751 15.557 2.122z" clipRule="evenodd"/>
      </svg>
    </LogoIcon>
  )
}

export const NowLogo = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 304 304">
      <circle cx="152" cy="152" r="144.5" fill="var(--primary)" fillOpacity=".05"/>
      <circle cx="152" cy="152" r="121" fill="var(--primary)" fillOpacity=".1"/>
      <circle cx="152" cy="152" r="99" fill="var(--primary)" fillOpacity=".2"/>
      <circle cx="152" cy="152" r="75" fill="var(--primary)"/>
      <path className="shadow" fill="rgba(0,0,0,0.2)" d="M169.259 109.608c1.028-3.838-3.767-6.492-6.474-3.584l-38.137 40.978c-1.959 2.104-.973 5.536 1.804 6.279l14.33 3.84a3.813 3.813 0 012.695 4.669l-8.735 32.602c-1.029 3.838 3.766 6.492 6.473 3.584l38.138-40.978c1.958-2.104.972-5.535-1.804-6.279l-14.33-3.84a3.812 3.812 0 01-2.696-4.669l8.736-32.602z"/>
      <path fill="var(--grey0)" d="M169.259 109.608c1.028-3.838-3.767-6.492-6.474-3.584l-38.137 40.978c-1.959 2.104-.973 5.536 1.804 6.279l14.33 3.84a3.813 3.813 0 012.695 4.669l-8.735 32.602c-1.029 3.838 3.766 6.492 6.473 3.584l38.138-40.978c1.958-2.104.972-5.535-1.804-6.279l-14.33-3.84a3.812 3.812 0 01-2.696-4.669l8.736-32.602z"/>
    </svg>
  )
}

export const NotesLogo = () => {
  return(
    <svg viewBox="0 0 55 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#notesFilter0_i)">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.105.333A3 3 0 006.79 2.982L2.039 45.584.797 50.09a3 3 0 002.095 3.69l.602.165a3 3 0 00.298.082l33.288 9.175a3 3 0 003.69-2.095l1.11-4.03a2.987 2.987 0 00.788-1.715l.215-1.924 10.662-38.684a3 3 0 00-2.095-3.69l-3.727-1.027.275-2.46a3 3 0 00-2.65-3.315L10.106.333z" fill="var(--grey0)"/>
      </g>
      <rect x="7.123" width="41.463" height="54.082" rx="3" transform="rotate(6.364 7.123 0)" fill="var(--grey200)" stroke="var(--grey300)" strokeWidth="1px"/>
      <g filter="url(#notesFilter1_i)">
        <rect x="14.37" y=".845" width="41.463" height="54.082" rx="3" transform="rotate(15.409 14.37 .845)" fill="var(--primary)"/>
      </g>
      <g filter="url(#notesFilter2_i)">
        <rect x="14.37" y=".845" width="41.463" height="54.082" rx="3" transform="rotate(15.409 14.37 .845)" fill="url(#paint0_linear)"/>
      </g>
      <rect x="9.224" y="33.086" width="34.252" height="5.408" rx="2.704" transform="rotate(15.409 9.224 33.086)" fill="var(--grey0)"/>
      <rect x="6.829" y="41.776" width="21.633" height="5.408" rx="2.704" transform="rotate(15.409 6.829 41.776)" fill="var(--grey0)"/>
      <path d="M30.7276 11.5769C31.2243 10.7166 30.2383 9.76537 29.3964 10.2926L17.5354 17.7201C16.9263 18.1015 16.9424 18.994 17.5647 19.3533L20.7767 21.2077C21.2325 21.4709 21.3887 22.0538 21.1255 22.5097L16.9066 29.8171C16.4099 30.6773 17.3959 31.6286 18.2378 31.1014L30.0988 23.6738C30.7078 23.2925 30.6918 22.3999 30.0695 22.0407L26.8575 20.1862C26.4017 19.923 26.2455 19.3401 26.5087 18.8843L30.7276 11.5769Z" fill="var(--grey0)"/>
      <defs>
        <filter id="notesFilter0_i" x=".689" y=".314" width="52.965" height="62.998" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="notesFilter1_i" x="0" y=".845" width="54.342" height="63.154" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="notesFilter2_i" x="0" y=".845" width="54.342" height="63.154" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><linearGradient id="paint0_linear" x1="13.884" y1=".845" x2="32.519" y2="62.028" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity=".26"/><stop offset=".471" stopColor="#fff" stopOpacity=".078"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
      </defs>
    </svg>
  )
}

export default function Logo() {
  return(
    <LogoIcon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 264 264">
        <g clipPath="url(#logoClip0)">
          <path className="shadow" fill="var(--grey200)" d="M128 256c56.089 0 87.269 0 107.635-20.365C256 215.269 256 184.089 256 128c0-56.089 0-87.27-20.365-107.635C215.269 0 184.089 0 128 0 71.911 0 40.73 0 20.365 20.365 0 40.731 0 71.911 0 128c0 56.089 0 87.269 20.365 107.635C40.731 256 71.911 256 128 256z"/>
          <path fill="var(--primary)" d="M128 256c56.089 0 87.269 0 107.635-20.365C256 215.269 256 184.089 256 128c0-56.089 0-87.27-20.365-107.635C215.269 0 184.089 0 128 0 71.911 0 40.73 0 20.365 20.365 0 40.731 0 71.911 0 128c0 56.089 0 87.269 20.365 107.635C40.731 256 71.911 256 128 256z"/>
          <path className="shadow" fill="rgba(0,0,0,0.2)" d="M156.764 57.347c1.714-6.396-6.277-10.82-10.788-5.973L82.412 119.67c-3.263 3.506-1.62 9.226 3.007 10.466l23.883 6.399a6.354 6.354 0 014.493 7.782l-14.559 54.336c-1.714 6.396 6.277 10.821 10.789 5.973l63.563-68.295c3.264-3.507 1.62-9.227-3.007-10.467l-23.883-6.399a6.354 6.354 0 01-4.493-7.782l14.559-54.336z"/>
          <path fill="var(--grey0)" d="M156.764 57.347c1.714-6.396-6.277-10.82-10.788-5.973L82.412 119.67c-3.263 3.506-1.62 9.226 3.007 10.466l23.883 6.399a6.354 6.354 0 014.493 7.782l-14.559 54.336c-1.714 6.396 6.277 10.821 10.789 5.973l63.563-68.295c3.264-3.507 1.62-9.227-3.007-10.467l-23.883-6.399a6.354 6.354 0 01-4.493-7.782l14.559-54.336z"/>
        </g>
        <defs>
          <clipPath id="logoClip0">
            <path fill="#fff" d="M0 0h256v256H0z"/>
          </clipPath>
        </defs>
      </svg>
    </LogoIcon>
  )
}

export const LogoWithLabel = ({logo}) => {
  return(
    <Link href="/">
      <a>
        <LogoLabelContainer>
          {
            logo ? (
              <div style={{
                width: `calc(${designTokens.space[5]} + ${designTokens.space[2]})`,
                marginRight: designTokens.space[3]
              }}>
                <Logo/>
              </div>
            )
            :
            null
          }
          <div>
            <LogoLabel>Ryan Parag</LogoLabel>
            <LogoSubtitle>Product Designer</LogoSubtitle>
          </div>
        </LogoLabelContainer>
      </a>
    </Link>
  )
}
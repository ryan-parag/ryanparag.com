import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout/'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import ContactBox from '@components/ContactBox'
import ThemeCreator from '@components/ThemeCreator'

const CreateTheme = ({ title, description, ...props }) => {

  return (
    <>
      <Layout pageTitle={`${title} | Create a Theme`} description={description}>
        <h2>[WIP] Create a Theme 🎨</h2>
        <p>If you've stumbled onto this website, you're most likely a designer - or probably very design minded 👍.</p>
        <p>As designers, we're naturally curious and enjoy tinkering with things - so why not play around with creating a new theme for this website! <strong>Have fun!</strong></p>
        <ThemeCreator/>
        <div style={{
          textAlign: 'center',
          padding: `${designTokens.space[3]} 0 ${designTokens.space[5]}`
        }}>
          <div style={{
            marginBottom: designTokens.space[2],
            color: 'var(--grey400)'
          }}>
            <small>Powered by</small>
          </div>
          <a
            style={{
              display: 'inline-flex',
              alignItems: 'center'
            }}
            href="https://github.com/lyft/coloralgorithm"
            target="_blank"
          >
          <svg width="24px" height="24px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="90.5486726%" y1="-18.7679634%" x2="29.4247788%" y2="84.8213047%" id="linearGradient-1">
                <stop stop-color="#191445" offset="0%"></stop>
                <stop stop-color="#645EE9" offset="27%"></stop>
                <stop stop-color="#943FFF" offset="66%"></stop>
                <stop stop-color="#FF01BE" offset="91%"></stop>
              </linearGradient>
            </defs>
            <g id="Artboard" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
              <rect fill="#FFFFFF" x="0" y="0" width="29" height="29"></rect>
              <g id="Asset-1" transform="translate(1.000000, 1.000000)">
                <polyline id="Path" stroke="#1A1445" strokeWidth="4.8467498" points="26.3144782 25.8848301 0.562415289 25.8848301 0.562415289 0.410267857"></polyline>
                <path d="M0.562415289,0.410267857 L26.3235972,0.410267857 L26.3235972,25.8938508 L26.3235972,25.8938508 C12.0960893,25.8938508 0.562415289,14.4844621 0.562415289,0.410267857 L0.562415289,0.410267857 L0.562415289,0.410267857 Z" id="Path" stroke="url(#linearGradient-1)" strokeWidth="6"></path>
              </g>
            </g>
          </svg>
          <span style={{
            marginLeft: designTokens.space[2]
          }}>
            <strong>ColorBox</strong>{' '}
            <small>by Lyft Design</small>
          </span>
          </a>
        </div>
        <div style={{
          padding: designTokens.space[3],
          background: 'var(--secondaryTransparent)',
          borderRadius: designTokens.space[2],
          marginBottom: designTokens.space[4]
        }}>
          <h5>Logged Issues</h5>
          <ul>
            <li>
              Switching between light and dark mode does not update the theme right away. In the meantime, when switching between light/dark modes, alter one of the neutral sliders.
              <br/>
              <small>Currently trying to fix this issue with the refactoring of the initial state.</small>
            </li>
          </ul>
        </div>
        <ContactBox/>
      </Layout>
    </>
  )
}

export default CreateTheme

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}

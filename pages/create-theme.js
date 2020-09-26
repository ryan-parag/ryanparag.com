import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout/'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import ContactBox from '@components/ContactBox'
import ThemeCreator from '@components/ThemeCreator'

const CreateTheme = ({ title, description, ...props }) => {

  return (
    <>
      <Layout pageTitle={`${title} | Create a Theme`} description={description} ogImage="../static/designing-for-personalization.png">
        <h2>Create a Theme 🎨</h2>
        <p>I like to believe design is a fluid skill and that <strong>everyone is a bit of a designer</strong> 👍 - we all have the ability to feel certain ways about things that are designed.</p>
        <p>Many of us are also naturally curious and enjoy tinkering with things - so why not <strong>feed that curiousity</strong> and play around with creating a new theme for this website! <strong>Have fun!</strong></p>
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
                <stop stopColor="#191445" offset="0%"></stop>
                <stop stopColor="#645EE9" offset="27%"></stop>
                <stop stopColor="#943FFF" offset="66%"></stop>
                <stop stopColor="#FF01BE" offset="91%"></stop>
              </linearGradient>
            </defs>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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

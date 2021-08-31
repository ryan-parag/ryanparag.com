import React from 'react'
import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'

const variants = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  p: "p",
  small: "small",
  label: "span"
};

export const Label = styled.div`
  font-size: ${designTokens.sizing._sm};
  margin-bottom: ${props => props.mb ? `${designTokens.space[props.mb]}` : '0'};
  margin-top: ${props => props.mt ? `${designTokens.space[props.mt]}` : '0'};
`

export const Body = styled.p`
  margin-bottom: 0;
  color: var(--grey600);
  font-size: ${props => props.small ? designTokens.sizing._sm : designTokens.sizing._base};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    font-size: ${designTokens.sizing._sm};
  }
`

export const ItemTitle = styled.h6`
  margin-top: 0;
  margin-bottom: ${designTokens.space[2]};
  font-size: ${props => props.small ? designTokens.sizing._base : designTokens.sizing._lg};
`

const Typography = ({ variant, children, customClass=null, ...props }) => {

  const Component = variant ? variants[variant] : "p";

  const getCustomClasses = () => {
    switch(variant) {
      case('lead'):
        return 'lead'
        break;
      default:
        return ''

    }
  }

  return (
    <Component
      {...props}
      className={`${getCustomClasses()} ${customClass && (customClass)}`}
    >
      {children}
    </Component>
  );
};

export default Typography;
import { ButtonAnchorTag } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'

const SheetTitleSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${designTokens.space[3]};
`

const SheetTitle = styled.h3`
  margin-right: ${designTokens.space[3]};
  margin-top: 0;
  margin-bottom: 0;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    margin-bottom: ${designTokens.space[3]};
  }
`

const Intro = ({sheet}) => {

  const getContent = (sheet) => {
    switch (sheet) {
      case 'research':
        return 'Use these questions to get a better understanding of your users, their needs and behaviors, and define business goals and outcomes.'
        break;
      case 'behavioral':
        return 'Use the following Psychology backed techniques to generate concepts and ideas aimed at changing or influencing user behavior. Identify the target behavior and leverage these principles to come up with ideas. Note that not all of the techniques are applicable to every project.'
        break;
      case 'feedback':
        return 'The following worksheet includes over 20 example questions to help you guide while providing (or soliciting) design feedback. Tip: Highlight specific areas of focus such as visual design, format, navigation or interactions etc. during feedback sessions.'
        break;
      case 'testing':
        return 'The following worksheet includes over 20 example questions to help you guide during user testing sessions. You can use these questions while running usability testing, conducting ethnographic research etc. with participants. Encourage participants to think out loud during testing.'
        break;
      case 'critique':
        return 'As part of the interview process at companies like Facebook, an app critique is conducted to get a better understanding of your product thinking and visual/interaction skills, all the way up to wider strategic decisions that could be behind the design. Use the following prompts to guide your thinking during the app critique sessions.'
        break;
      default:
        return ''
    }
  }

  const getTableLink = (sheet) => {
    switch (sheet) {
      case 'research':
        return 'https://airtable.com/shrnWev57Pm0X0WwR'
        break;
      case 'behavioral':
        return 'https://airtable.com/shrcAf2OV53FCI0SD'
        break;
      case 'feedback':
        return 'https://airtable.com/shrGu6KDolXLPObqs'
        break;
      case 'testing':
        return 'https://airtable.com/shrIUL4yOmkB6MHkz'
        break;
      case 'critique':
        return 'https://airtable.com/shrSR2MvUADm5bK5E'
        break;
      default:
        return ''
    }
  }

  return(
    <>
      <SheetTitleSection>
        <SheetTitle>
          {sheet.charAt(0).toUpperCase() + sheet.slice(1)} Questions
        </SheetTitle>
        {
          getTableLink(sheet).length > 0 ? (
            <ButtonAnchorTag small href={getTableLink(sheet)} target="_blank">
              <svg style={{ marginRight: designTokens.space[2] }} width="16" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0169 1.21808L2.06897 4.92056C1.57138 5.12649 1.57654 5.83339 2.07725 6.03186L11.0625 9.59502C11.8519 9.90812 12.7311 9.90812 13.5206 9.59502L22.5059 6.03172C23.0065 5.83339 23.0119 5.12662 22.5141 4.9207L13.5664 1.21794C12.7501 0.880152 11.8331 0.880152 11.0168 1.21794" fill="#FCB400"/>
                <path d="M13.0888 11.5407V20.4421C13.0888 20.8653 13.5157 21.1553 13.9092 20.9993L23.9215 17.113C24.0332 17.0688 24.129 16.992 24.1965 16.8926C24.2639 16.7932 24.3 16.6759 24.3 16.5558V7.6545C24.3 7.23112 23.8731 6.94122 23.4795 7.09723L13.4673 10.9835C13.3556 11.0278 13.2598 11.1046 13.1924 11.204C13.1249 11.3033 13.0888 11.4207 13.0888 11.5408" fill="#18BFFF"/>
                <path d="M10.7507 11.9999L7.7793 13.4346L7.4776 13.5805L1.20511 16.586C0.807631 16.7778 0.300003 16.488 0.300003 16.0463V7.69175C0.300003 7.53195 0.38194 7.39398 0.491822 7.29021C0.5369 7.24532 0.588042 7.20696 0.643757 7.17625C0.793522 7.08631 1.00732 7.0623 1.1891 7.1342L10.7008 10.903C11.1843 11.0948 11.2223 11.7723 10.7507 12.0001" fill="#F82B60"/>
                <path d="M10.7507 11.9999L7.7793 13.4346L0.491821 7.29007C0.536909 7.24523 0.58805 7.20692 0.643757 7.17625C0.793522 7.08631 1.00732 7.0623 1.1891 7.1342L10.7008 10.903C11.1843 11.0948 11.2223 11.7723 10.7507 12.0001" fill="black" fillOpacity="0.25"/>
              </svg>
              View in Airtable
              <span className="icon">&rarr;</span>
            </ButtonAnchorTag>
          )
          :
          null
        }
      </SheetTitleSection>
      <p style={{ color: 'var(--grey700)'}}>
        <small>
          {getContent(sheet)}
        </small>
      </p>
    </>
  )
}

export default Intro
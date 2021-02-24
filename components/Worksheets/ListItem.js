import { designTokens } from '@components/Theme/designTokens'
import { Box } from '@components/Box'
import styled from 'styled-components'
import Chip, {PrimaryChip, TertiaryChip, SecondaryChip} from '@components/Chip'

const SmallText = styled.div`
  font-size: ${designTokens.fontSizes[1]};
  color: ${props => props.primary ? 'inherit' : 'var(--grey700)'};
  line-height: ${designTokens.lineHeights.smallHeading};
  padding-top: ${props => props.space ? designTokens.space[2] : '0'};
  font-weight: ${props => props.bold ? designTokens.fontWeights.bold : 'inherit'};
`

const Label = styled.span`
  font-size: ${designTokens.fontSizes[0]};
  color: var(--grey700);
  margin-right: ${designTokens.space[2]};
`

const Flex = styled.div`
  display: flex;
  width: 100%:
`

const FlexCol = styled.div`
  flex: 1 1 0%;
  padding-left: ${designTokens.space[3]};
`

const Avatar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: ${designTokens.space[5]};
  width: ${designTokens.space[5]};
  background: var(--grey200);
  font-size: ${designTokens.fontSizes[0]};
  font-weight: ${designTokens.fontWeights.bold};
  color: var(--grey700);
  box-shadow: 0px 0px 0px 1px var(--grey300), inset 0px 0px 4px var(--grey300);
`

const ListItem = ({type, data, number}) => {
  switch (type) {
    case 'research':
      return (
        <Box>
          <Flex>
            <div>
              <Avatar>
                {number}
              </Avatar>
            </div>
            <FlexCol>
              <SmallText bold primary>{data.Questions}</SmallText>
              <div style={{ paddingTop: designTokens.space[3] }}>
                <Label>Stakeholder:</Label>
                <PrimaryChip>{data.Stakeholder}</PrimaryChip>
              </div>
              <div style={{ paddingTop: designTokens.space[3] }}>
                <Label>Goals:</Label>
                {
                  data.Goal.map((goal, i) => (
                    <SecondaryChip key={i}>{goal}</SecondaryChip>
                  ))
                }
              </div>
              <div style={{ paddingTop: designTokens.space[3] }}>
                <Label>Stage:</Label>
                <TertiaryChip>{data.Stage}</TertiaryChip>
              </div>
            </FlexCol>
          </Flex>
        </Box>
      )
      break;
    case 'behavioral':
      return (
        <Box>
          <Flex>
            <div>
              <Avatar>
                {number}
              </Avatar>
            </div>
            <FlexCol>
              <SmallText bold primary>{data.Name}</SmallText>
              <SmallText space>{data.Notes}</SmallText>
              <div style={{ paddingTop: designTokens.space[3] }}>
                <Label>Target Behavior:</Label>
                {
                  data.Behavior.map((item, i) => (
                    <SecondaryChip key={i}>{item}</SecondaryChip>
                  ))
                }
              </div>
              <div style={{ paddingTop: designTokens.space[3] }}>
                <Label>Examples</Label>
                <SmallText space primary>{data.Examples}</SmallText>
              </div>
            </FlexCol>
          </Flex>
        </Box>
      )
      break;
    case 'feedback':
      return (
        <Box>
          <Flex>
            <div>
              <Avatar>
                {number}
              </Avatar>
            </div>
            <FlexCol>
              <SmallText primary>{data.Name}</SmallText>
            </FlexCol>
          </Flex>
        </Box>
      )
      break;
    case 'testing':
      return (
        <Box>
          <Flex>
            <div>
              <Avatar>
                {number}
              </Avatar>
            </div>
            <FlexCol>
              <SmallText primary>{data.Name}</SmallText>
            </FlexCol>
          </Flex>
        </Box>
      )
      break;
    case 'critique':
      return (
        <Box>
          <Flex>
            <div>
              <Avatar>
                {number}
              </Avatar>
            </div>
            <FlexCol>
              <SmallText primary>{data.Name}</SmallText>
            </FlexCol>
          </Flex>
        </Box>
      )
      break;
    default:
      return (
        <div>a {number}</div>
      )
  }
}

export default ListItem
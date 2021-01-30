import { designTokens } from '@components/Theme/designTokens'
import { Box } from '@components/Box'
import styled from 'styled-components'

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
  height: ${designTokens.space[6]};
  width: ${designTokens.space[6]};
  background: var(--primaryTransparent);
  font-size: ${designTokens.fontSizes[1]};
  color: var(--primaryDark);
`

const Chip = styled.div`
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  padding: ${designTokens.space[1]} ${designTokens.space[2]};
  border: 1px solid var(--grey500);
  font-size: ${designTokens.fontSizes[0]};
  margin-right: ${designTokens.space[1]};
`

const PrimaryChip = styled(Chip)`
  color: var(--primaryDark);
  border-color: var(--primary);
`

const SecondaryChip = styled(Chip)`
  color: var(--secondaryDark);
  border-color: var(--secondary);
`

const TertiaryChip = styled(Chip)`
  color: var(--tertiaryDark);
  border-color: var(--tertiary);
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
              <SmallText primary>{data.Questions}</SmallText>
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
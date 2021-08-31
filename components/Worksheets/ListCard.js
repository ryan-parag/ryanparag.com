import { designTokens } from '@components/Theme/designTokens'
import Avatar from '@components/Avatar'
import styled from 'styled-components'
import {PrimaryChip, TertiaryChip, SecondaryChip} from '@components/Chip'
import { ItemTitle, Body, Label } from '@components/Typography'

const SmallText = styled(Body)`
  color: ${props => props.primary ? 'inherit' : 'var(--grey700)'};
  padding-top: ${props => props.space ? designTokens.space[2] : '0'};
  font-weight: ${props => props.bold ? designTokens.fontWeights.bold : 'inherit'};
`

const Flex = styled.div`
  display: flex;
  width: 100%;
  padding: ${designTokens.space[3]} 0;
  line-height: ${designTokens.lineHeights.smallHeading};
`

const FlexCol = styled.div`
  flex: 1 1 0%;
  padding-left: ${designTokens.space[3]};
`

const Grid = styled.div`
  display: flex;
`

const GridCol = styled.div`
  padding-top: ${designTokens.space[3]};
  padding-right: ${designTokens.space[3]};
`

const ListCard = ({type, data, number}) => {
  switch (type) {
    case 'research':
      return (
        <Flex>
          <div>
            <Avatar type={'default'} text={number}/>
          </div>
          <FlexCol>
            <SmallText bold primary>{data.Questions}</SmallText>
            <Grid>
              <GridCol>
                <Label mb={2}>Stakeholder:</Label>
                <PrimaryChip>{data.Stakeholder}</PrimaryChip>
              </GridCol>
              <GridCol>
                <Label mb={2}>Goals:</Label>
                {
                  data.Goal.map((goal, i) => (
                    <SecondaryChip key={i}>{goal}</SecondaryChip>
                  ))
                }
              </GridCol>
              <GridCol>
                <Label mb={2}>Stage:</Label>
                <TertiaryChip>{data.Stage}</TertiaryChip>
              </GridCol>
            </Grid>
          </FlexCol>
        </Flex>
      )
      break;
    case 'behavioral':
      return (
        <Flex>
          <div>
            <Avatar type={'default'} text={number}/>
          </div>
          <FlexCol>
            <SmallText bold primary>{data.Name}</SmallText>
            <SmallText space>{data.Notes}</SmallText>
            <GridCol>
              <Label mb={2}>Target Behavior:</Label>
              {
                data.Behavior.map((item, i) => (
                  <SecondaryChip key={i}>{item}</SecondaryChip>
                ))
              }
            </GridCol>
            <GridCol>
              <Label>Examples</Label>
              <SmallText>{data.Examples}</SmallText>
            </GridCol>
          </FlexCol>
        </Flex>
      )
      break;
    case 'feedback':
      return (
        <Flex>
          <div>
            <Avatar type={'default'} text={number}/>
          </div>
          <FlexCol>
            <SmallText bold primary>{data.Name}</SmallText>
          </FlexCol>
        </Flex>
      )
      break;
    case 'testing':
      return (
        <Flex>
          <div>
            <Avatar type={'default'} text={number}/>
          </div>
          <FlexCol>
            <SmallText bold primary>{data.Name}</SmallText>
          </FlexCol>
        </Flex>
      )
      break;
    case 'critique':
      return (
        <Flex>
          <div>
            <Avatar type={'default'} text={number}/>
          </div>
          <FlexCol>
            <SmallText bold primary>{data.Name}</SmallText>
          </FlexCol>
        </Flex>
      )
      break;
    default:
      return (
        <div>a {number}</div>
      )
  }
}

export default ListCard
import React, { useState } from 'react'
import Layout from '@components/Layout/'
import { ProjectItem } from '@components/Projects'
import Title from '@components/Title'
import List, { ListItem } from '@components/List'
import { designTokens } from '@components/Theme/designTokens'
import CodeBlock from '@components/CodeBlock'
import Link from 'next/link'
import { Box } from '@components/Box'
import CurrentTheme from '@components/Theme/CurrentTheme'
import { Button, ButtonPrimary } from '@components/Button'
import Chip, { PrimaryChip, SecondaryChip, TertiaryChip } from '@components/Chip'
import ColorPicker from '@components/ColorPicker'
import { TabBar, TabItem } from '@components/Tabs'
import LoadingBox from '@components/LoadingBox'

const Notes = ({ title, description}) => {

  const [defaultColor, setDefaultColor] = useState('#ff0000')

  const sections = [
    { name: 'Current Theme', href: '#currentTheme'},
    { name: 'Typography', href: '#typography'},
    { name: 'Box', href: '#box'},
    { name: 'Buttons', href: '#buttons'},
    { name: 'Chips', href: '#chips'},
    { name: 'Code Block', href: '#codeBlock'},
    { name: 'Color Picker', href: '#colorPicker'},
    { name: 'List and Project Items', href: '#list'},
    { name: 'Loading Box', href: '#loading'},
    { name: 'Tabs', href: '#tabs'}
  ]

  const examplePoject = {
    name: 'Example List Link',
    description: 'This is an example description of a link inside of a list item',
    image: '/static/projects/icon-portfolio.png',
    link:'#',
    outbound: false
  }

  return (
    <>
      <Layout pageTitle={`${title} | Style Guide`} description={description} ogImage="/notes-social-media.png">
        <Title>
          <h1>Style Guide</h1>
          <p className="lead">Check out the functional components used to build most of this site!</p>
        </Title>
        <h5>Navigate to a section</h5>
        <ul>
          {
            sections.map((item,i) => (
              <li key={i}><a className="link" href={item.href}>{item.name}</a></li>
            ))
          }
          <li><em>I'll document more components soon...</em></li>
        </ul>
        <hr/>
        <CurrentTheme/>
        <hr/>
        <h3 id="typography">Typography</h3>
        <CodeBlock
          language={'js'}
          value={designTokens.fonts.body}
        />
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
        <h4>Header 4</h4>
        <h5>Header 5</h5>
        <h6>Header 6</h6>
        <p className="lead">This is lead text</p>
        <p>This is default body text, where some parts may be <em>italic</em>, <strong>bold</strong>, or even <Link href="/"><a className="link">links</a></Link>.</p>
        <hr/>
        <h3 id="box">Box</h3>
        <Box center>Box Component</Box>
        <hr/>
        <h3 id="buttons">Buttons</h3>
        <Button>Default Button</Button>
        <ButtonPrimary marginLeft={designTokens.space[2]}>Primary Button</ButtonPrimary>
        <hr/>
        <h3 id="chips">Chip</h3>
        <Chip>Default Chip</Chip>
        <PrimaryChip>Primary Chip</PrimaryChip>
        <SecondaryChip>Secondary Chip</SecondaryChip>
        <TertiaryChip>Tertiary Chip</TertiaryChip>
        <hr/>
        <h3 id="codeBlock">Code Block</h3>
        <CodeBlock
          language={'js'}
          value={'This is a code block'}
        />
        <hr/>
        <h3 id="colorPicker">Color Picker</h3>
        <ColorPicker
          color={defaultColor}
          changeColor={() => setDefaultColor()}
        />
        <hr/>
        <List>
          <ListItem>
            <h3 id="list">List and Project Items</h3>
          </ListItem>
          <ListItem>
            <ProjectItem project={examplePoject}/>
          </ListItem>
          <ListItem>
            <ProjectItem project={examplePoject}/>
          </ListItem>
          <ListItem>
            <ProjectItem project={examplePoject}/>
          </ListItem>
        </List>
        <hr/>
        <h3 id="loading">Loading Box</h3>
        <LoadingBox title={'Loading Title'} description={'This is a description when loading'}/>
        <hr/>
        <h3 id="tabs">Tabs</h3>
        <TabBar>
          <TabItem className="active"><a href="#tabs">Active Tab</a></TabItem>
          <TabItem><a href="#tabs">Tab</a></TabItem>
          <TabItem><a href="#tabs">Tab</a></TabItem>
        </TabBar>
      </Layout>
    </>
  )
}

export default Notes

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}

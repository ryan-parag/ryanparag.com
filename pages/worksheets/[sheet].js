import { useRouter } from "next/router";
import Layout from '@components/Layout/'
import TabNav from '@components/Worksheets/TabNav'
import { designTokens } from '@components/Theme/designTokens'
import ListCard from '@components/Worksheets/ListCard'
import List, { ListItem } from '@components/List'
import Intro from '@components/Worksheets/Intro'
import Title, { TitleIcon } from '@components/Title'
import styled from 'styled-components'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Button } from '@components/Button'

const ScrolledButton = styled(Button)`
  position: fixed;
  bottom: ${designTokens.space[3]};
  right: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Sheet = ({title, description}) => {
  const router = useRouter();
  const { sheet } = router.query;
  const categories = ['Research', 'Behavioral', 'Feedback', 'Testing', 'Critique']

  const { data } = useSWR(`/api/worksheets/${sheet}`, fetcher);

  if (!data) {
    return null;
  }

  const scrollToTop = () => {
    if(process.browser) {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }
  }

  const filtered = []
  data.items.forEach(item => filtered.push(item.fields))

  return (
    <>
      <Layout pageTitle={`${title} | UX Worksheets`} description={description} ogImage="/worksheets-social-media.png">
        <Title>
          <TitleIcon>
            <img src={'/static/projects/icon-worksheets.png'} alt={'Worksheets'}/>
          </TitleIcon>
          <h1>Worksheets</h1>
          <p className="lead">Questions and framework resources you can use when planning for your UX research process.</p>
          <p>
            <small>Data collected and Inspired from <a className="link" target="_blank" href="https://www.uxworksheets.com/">UX Worksheets</a>, created by <a className="link" href="http://www.abdussalam.pk/">Abdus Salam</a> 🙌.</small>
          </p>
        </Title>
        <TabNav
          items={categories}
          active={sheet}
        />
        <Intro sheet={sheet}/>
        <List>
          {
            filtered.map((item, i) => (
              <ListItem key={i}>
                <ListCard
                  type={sheet}
                  data={item}
                  number={i + 1}
                  key={i}
                />
              </ListItem>
            ))
          }
        </List>
        <ScrolledButton
          onClick={() => scrollToTop()}
        >
          Scroll to Top
        </ScrolledButton>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const categories = ['research', 'behavioral', 'feedback', 'testing', 'critique']
  const paths = categories.map((sheet) => ({
    params: { sheet }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params: {sheet} }) {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}


export default Sheet;
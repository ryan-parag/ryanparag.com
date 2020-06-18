import Layout from '@components/Layout/'

const About = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description}>
        <h2>Hello, I'm Ryan.✌🏼</h2>

        <p>
        I'm a Digital Product Designer currently based in Tampa, Florida. I help build digital products and solve tough problems — focusing on user research & testing, prototyping, visual design, front-end code, and product strategy.
        </p>
        <p>
          I currently reside in Tampa,FL, where I help simplify the home remodeling experience and help build connected, IoT experiences for homeowners at Masonite. Previously, I helped build a problem-solving platform for payments as the first product designer at Chargebacks911.
        </p>
        <p>
          I’m driven to learn why people do what they do so I can create experiences that are intuitive and successful. I’ve helped rethink, prototype and design solutions to help bring empathy and simplicity into complex problems - which is a fancier way of saying I help things make sense.
        </p>
        <p>
          If you'd like to see more of what I've been working on, take a look at my CodePen, Dribbble, and Github. For a more in-depth look at my design process, let's chat.
        </p>
      </Layout>
    </>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}

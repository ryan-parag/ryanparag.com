import ProjectScroll from '@components/ProjectScroll'

const List = () => {

  const projects = {
    masonite: {
      name: 'Masonite Connected',
      description: 'An "Internet of Things" experience that connects a door to a user\'s smart home',
      logo: '/static/projects/masonite/mpwr/logo.svg',
      link: '/work',
      type: 'mobile',
      preview: [
        '/static/projects/masonite/mpwr/view.png',
        '/static/projects/masonite/mpwr/view2.png',
        '/static/projects/masonite/mpwr/view3.png',
        '/static/projects/masonite/mpwr/view4.png',
        '/static/projects/masonite/mpwr/view5.png'
      ]
    },
    soleventure: {
      name: 'SoleVenture',
      description: 'Giving freelancers the security of steady income and traditional benefits',
      logo: '/static/projects/soleventure/web/logo.svg',
      link: '/work',
      type: 'web',
      preview: [
        '/static/projects/soleventure/web/view1.png',
        '/static/projects/soleventure/web/view2.png',
        '/static/projects/soleventure/web/view3.png',
        '/static/projects/soleventure/web/view4.png',
        '/static/projects/soleventure/web/view5.png'
      ]
    }
  }

  return(
    <>
      <ProjectScroll project={projects.masonite} />
      <ProjectScroll project={projects.soleventure} />
    </>
  )
}

export default List
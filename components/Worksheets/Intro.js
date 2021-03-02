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

  return(
    <>
      <h3>{sheet.charAt(0).toUpperCase() + sheet.slice(1)} Questions</h3>
      <p style={{ color: 'var(--grey700)'}}>
        <small>
          {getContent(sheet)}
        </small>
      </p>
    </>
  )
}

export default Intro
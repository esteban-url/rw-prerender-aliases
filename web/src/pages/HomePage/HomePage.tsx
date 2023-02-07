import Emoji from '@ui/Emoji/Emoji'
import Hello from '@ui/Hello/Hello'

import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Hello />
      <Emoji />
    </>
  )
}

export default HomePage

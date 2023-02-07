import { MetaTags } from '@redwoodjs/web'

import Emoji from 'src/components/ui/Emoji/Emoji'
import Hello from 'src/components/ui/Hello/Hello'

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

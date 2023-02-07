// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Emoji> = (args) => {
//   return <Emoji {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Emoji from './Emoji'

export const generated = () => {
  return <Emoji />
}

export default {
  title: 'Components/Emoji',
  component: Emoji,
} as ComponentMeta<typeof Emoji>

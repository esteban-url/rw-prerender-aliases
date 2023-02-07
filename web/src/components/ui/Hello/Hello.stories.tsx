// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Hello> = (args) => {
//   return <Hello {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Hello from './Hello'

export const generated = () => {
  return <Hello />
}

export default {
  title: 'Components/Hello',
  component: Hello,
} as ComponentMeta<typeof Hello>

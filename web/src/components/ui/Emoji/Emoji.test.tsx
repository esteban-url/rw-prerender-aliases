import { render } from '@redwoodjs/testing/web'

import Emoji from './Emoji'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Emoji', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Emoji />)
    }).not.toThrow()
  })
})

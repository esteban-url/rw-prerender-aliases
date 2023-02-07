import { render } from '@redwoodjs/testing/web'

import Hello from './Hello'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Hello', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Hello />)
    }).not.toThrow()
  })
})

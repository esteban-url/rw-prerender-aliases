When you use typescript path aliases to have shorther imports prerendering does not work.

You can configure webpack/vite to run the dev server build if there are no prerendered routes. but if there are, the build will break. AFAICT, there is no way to configure the prerendering process.


## Reproduction steps

### golden path

1. Create a new project, make it a typescript project

    ```sh
    yarn create redwood-app rw-prerender-aliases
    ```

1. Add a new component

    ```sh
    yarn rw g component Hello
    ```

    ```tsx
    // src/components/ui/Hello/Hello.tsx
    const Hello = () => {
      return <h2>Hi!</h2>
    }

    export default Hello
    ```

1. Add another component

    ```sh
    yarn rw g component Emoji
    ```

    ```tsx
    // src/components/ui/Emoji/Emoji.tsx

    const Emoji = () => {
      const randomEmoji = () => {
        const emojis = ['👍', '👌', '👏', '🙌', '🤙', '🤘', '🤝', '👋']
        const randomIndex = Math.floor(Math.random() * emojis.length)
        return emojis[randomIndex]
      }

      return <span role="img">{randomEmoji()}</span>
    }

    export default Emoji
    ```

1. Add a new page with the two components

    ```sh
    yarn rw g page home
    ```

    ```tsx
    // src/pages/HomePage/HomePage.tsx

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
    ```

1. Enable prerendering for the home page

    ```tsx
    // web/src/Routes.tsx
    import { Router, Route } from '@redwoodjs/router'

    const Routes = () => {
      return (
        <Router>
          <Route path="/" page={HomePage} name="home" prerender />
          <Route notfound page={NotFoundPage} />
        </Router>
      )
    }

    export default Routes
    ```

1. Make sure everything works

    Run the dev server, reload the page a few times to get different emojis

    ```sh
    yarn rw dev
    ```

    Run the tests, everything should pass

    ```sh
    yarn rw test
    ```

    Build the project, everything should work, including prerendering

    ```sh
    yarn rw build
    ```

### let's break it

1. Add an alias for the `ui` directory

    ```js
    // web/tsconfig.json
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "src/*": [
            "./src/*",
            "../.redwood/types/mirror/web/src/*",
            "../api/src/*",
            "../.redwood/types/mirror/api/src/*"
          ],
          "@ui/*": ["./src/components/ui/*"],
          ...
        }
      }
    }
    ```
1. update the imports

    ```tsx
    // src/pages/HomePage/HomePage.tsx

    import Emoji from '@ui/Emoji/Emoji'
    import Hello from '@ui/Hello/Hello'
    ```

    > Note: I'm using `@ui` as the alias, but it could be anything

1. Make sure everything still works

    Run the dev server, reload the page a few times to get different emojis

    ```sh
    yarn rw dev
    ```

    ```
    Compiled with problems:

    ERROR in ./src/pages/HomePage/HomePage.tsx 4:0-36

    Module not found: Error: Can't resolve '@ui/Emoji/Emoji' in '/Users/esteban/files/github/esteban-url/rw-prerender-aliases/web/src/pages/HomePage'


    ERROR in ./src/pages/HomePage/HomePage.tsx 5:0-36

    Module not found: Error: Can't resolve '@ui/Hello/Hello' in '/Users/esteban/files/github/esteban-url/rw-prerender-aliases/web/src/pages/HomePage'
    ```

    😭 the page doesn't load anymore, the aliases are not being resolved!

    Run the tests

    ```sh
    yarn rw test
    ```
    ```
    FAIL   web  web/src/pages/HomePage/HomesPage.test.tsx
    ● Test suite failed to run

      Cannot find module '@ui/Emoji/Emoji' from 'web/src/pages/HomePage/HomePage.tsx'
    ```
    😭 the page test fails, the aliases are not being resolved!

    Build the project

    ```sh
    yarn rw build
    ```

    ```
    Command failed with exit code 1:
    ...
    ERROR in ./src/pages/HomePage/HomePage.tsx 2:0-36
    Module not found: Error: Can't resolve '@ui/Emoji/Emoji'
    ```
    😭 the build fails, the aliases are not being resolved!

### let's try to fix it

1. Configure webpack (I tried the 4.1-RC with vite, but the same problem happens)

    ```sh
    yarn rw setup webpack
    ```

1. Add the alias to the webpack config

    ```js
    // web/config/webpack.config.js

    const path = require('path')

    /** @returns {import('webpack').Configuration} Webpack Configuration */
    module.exports = (config, { mode }) => {
      if (mode === 'development') {
        // Add dev plugin
      }
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@ui': path.resolve(__dirname, '../src/components/ui'),
        },
      }
      return config
    }
    ```

    At this point:
    - dev server works! ✨
    - tests still fail 😭
    - build still fails 😭


1. configure the Jest config

    ```js
    // web/jest.config.js

    const config = {
      rootDir: '../',
      preset: '@redwoodjs/testing/config/jest/web',
      moduleNameMapper: {
        '^@ui/(.*)': '<rootDir>/web/src/components/ui/$1',
      },
    }

    module.exports = config
    ```

    At this point:
    - dev server works! ✨
    - tests are passing! ✨
    - build still fails and there is no way to configure the prerender process 😭😭😭😭
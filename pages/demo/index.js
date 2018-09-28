import React from 'react'

// import cookie from 'cookie'
// import { ApolloConsumer } from 'react-apollo'
// import redirect from '../lib/redirect'
// import checkLoggedIn from '../lib/checkLoggedIn'

import Router from 'next/router'

const redirect = (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target)
  }
}

export default class Index extends React.Component {
  static async getInitialProps (context, apolloClient) {
    // const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    // if (!loggedInUser.user) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/demo/dashboard')
    // }

    // return { loggedInUser }
    return
  }

  signout = apolloClient => () => {
    // document.cookie = cookie.serialize('token', '', {
    //   maxAge: -1 // Expire the cookie immediately
    // })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    // apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin')
    // })
  }

  render () {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            {/* Hello {this.props.loggedInUser.user.name}!<br /> */}
            <button onClick={this.signout(client)}>Sign out</button>
          </div>
        )}
      </ApolloConsumer>
    )
  }
};

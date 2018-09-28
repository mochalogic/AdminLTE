// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    // console.log({f: '_document.getInitialProps', initialProps});

    const bodyClass = 'hold-transition skin-blue sidebar-mini';

    return { ...initialProps, bodyClass }
  }

  render() {
    // const title = this.props.__NEXT_DATA__.props.pageProps.title
    // const next = this.props.__NEXT_DATA__
    // console.log({f: '_document.render', title, next})
    return (
      <html>
        <Head/>{/* if Head is not included then there is a CSS unrendered page flash */}
        <body class={this.props.bodyClass}>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}

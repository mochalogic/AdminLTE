import React from 'react'
import Layout from '../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

class Page extends React.Component {
  title = 'The Page Title'

  static async getInitialProps() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
      shows: data,
    }
  }

  render() {
    const title = this.title
    const shows = this.props.shows

    console.log({f: 'index.render', props: this.props, title});
    return (
      <Layout title={title}>
        <h1>Batman TV Shows</h1>
        <ul>
          {shows.map(({show}) => (
            <li key={show.id}>
              <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                <a>{show.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>)
  }
}

export default Page


// const Index = (props) => (
//   <Layout title="AdminLTE Home">
//     <h1>Batman TV Shows</h1>
//     <ul>
//       {props.shows.map(({show}) => (
//         <li key={show.id}>
//           <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
//             <a>{show.name}</a>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </Layout>
// )
//
// Index.title = 'The Page Title'
//
// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()
//
//   console.log(`Show data fetched. Count: ${data.length}`)
//
//   return {
//     shows: data,
//     title: this.title
//   }
// }
//
// export default Index




// import Layout from '../components/MyLayout.js'
// import Link from 'next/link'
// import fetch from 'isomorphic-unfetch'
//
// const Index = (props) => (
//   <Layout>
//     <h1>Batman TV Shows</h1>
//     <ul>
//       {props.shows.map(({show}) => (
//         <li key={show.id}>
//           <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
//             <a>{show.name}</a>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </Layout>
// )
//
// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()
//
//   console.log(`Show data fetched. Count: ${data.length}`)
//
//   return {
//     shows: data
//   }
// }
//
// export default Index

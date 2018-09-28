import React, {Component} from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import {
  Row,
  Col,
  Box,
  BoxHeader,
  BoxBody,
  BoxFooter,
  Percentage
} from '../../components'

class Page extends Component {
  title = 'Blank'
  tagLine = 'Tag Line'
  componentDidMount()  { console.log(`componentDidMount (${this.title})`) }
  componentDidUpdate() { console.log(`componentDidUpdate (${this.title})`) }
  render() {
    return (
      <Layout title={this.title} tagLine={this.tagLine}>
        <Row>
          <Col>Blank Page</Col>
        </Row>
      </Layout>
    )
  }
}

export default Page

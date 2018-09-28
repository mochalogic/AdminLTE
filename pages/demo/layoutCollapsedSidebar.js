import React from 'react'
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


const Page = (props) => (
  <Layout title="Sidebar Collapsed" tagLine="Layout with collapsed sidebar on load">
    <Row>
      <Col>Blank Page</Col>
    </Row>
  </Layout>
)

export default Page

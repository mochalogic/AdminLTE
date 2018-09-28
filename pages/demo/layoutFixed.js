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
  <Layout title="Fixed Layout" tagLine="Blank exaple of the fixed layout">
    <Row>
      <Col>Blank Page</Col>
    </Row>
  </Layout>
)

export default Page

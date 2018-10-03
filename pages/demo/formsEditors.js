import React from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import {
  typeMatch, matchChild, builder,

  Row,
  Col,

  Icon,

  Box,
  BoxHeader,
  BoxTool,
  BoxBody,
  BoxProgress,
  BoxFooter,

  Percentage,
  Image,
  Badge,

  imgRoot
} from '../../components'

import {
  isArray,
  isTrue,
  isDefined,
  isNull,
  isNaN,
  isEmpty,
  cloneFirst,
  FormGroup,
  gridBuilder,
  Input,
  InputLabel,
  InputHelp,
  InputAddon,
  InputButton,
  Button,
  Form,
  H
} from '../../components/base/Form'


class Page extends Component {
  title = 'Text Editors'
  tagLine = 'Advanced form element'
  componentDidMount()  { console.log(`componentDidMount (${this.title})`) }
  componentDidUpdate() { console.log(`componentDidUpdate (${this.title})`) }
  render() {
    return (
      <Layout title={this.title} tagLine={this.tagLine}>
        <Row>
          <Row md="6">
          </Row>
          <Row md="6">
          </Row>
        </Row>
      </Layout>
    )
  }
}

export default Page

import React, {Component} from 'react'
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


// Column 1
const QuickExample = () =>
  <Box context="primary">
    <BoxHeader title="Quick Example" bordered/>
    <BoxBody>
      <Input type="email" id="quickExampleEmail" label="Email address" placeholder="Enter email" help={null}/>
      <Input type="password" id="quickExamplePassword" label="Password" placeholder="Password" help={null}/>
      <Input type="file" id="quickExampleFile" label="File input" placeholder={null} help="Example block-level help text here."/>
      <Input type="checkbox" id="quickExampleCheckbox" label="Check me out" placeholder={null} help={null}/>
    </BoxBody>
    <BoxFooter>
      <Button id="quickExampleSubmit" label="Submit" context="primary" submit/>
    </BoxFooter>
  </Box>
const DifferentHeight = () =>
  <Box context="success">
    <BoxHeader title="Different Height" bordered/>
    <BoxBody>
      <Input type="text" id="differentHeightLarge" placeholder=".input-lg" large/>
      <Input type="text" id="differentHeightDefault" placeholder="Default height"/>
      <Input type="text" id="differentHeightSmall" placeholder=".input-sm" small/>
    </BoxBody>
  </Box>
const DifferentWidth = () =>
  <Box context="danger">
    <BoxHeader title="Different Width" bordered/>
    <BoxBody>
      <Row>
        <Input type="text" xs="3" placeholder=".col-xs-3"/>
        <Input type="text" xs="4" placeholder=".col-xs-4"/>
        <Input type="text" xs="5" placeholder=".col-xs-5"/>
      </Row>
    </BoxBody>
  </Box>
const InputAddons = () =>
  <Box context="info">
    <BoxHeader title="Input Addon" bordered/>
    <BoxBody>
      <Input type="text" placeholder="Username">
        <InputAddon value="@"/>
      </Input>
      <Input type="text">
        <InputAddon right value=".00"/>
      </Input>
      <Input type="text">
        <InputAddon value="$"/>
        <InputAddon right value=".00"/>
      </Input>
      <H h4 title="With icons"/>
      <Input type="email" placeholder="Email">
        <InputAddon><Icon name="fa-envelope"/></InputAddon>
      </Input>
      <Input type="text">
        <InputAddon right><Icon name="fa-check"/></InputAddon>
      </Input>
      <Input type="text">
        <InputAddon><Icon name="fa-dollar"/></InputAddon>
        <InputAddon right><Icon name="fa-ambulance"/></InputAddon>
      </Input>
      <H h4 title="With checkbox and radio inputs"/>
      <Row>
        <Input type="text" lg="6">
          <InputAddon><input type="checkbox"/></InputAddon>
        </Input>
        <Input type="text" lg="6">
          <InputAddon><input type="radio"/></InputAddon>
        </Input>
      </Row>
      <H h4 title="With buttons"/>
      <H margin>Large: <code>.input-group.input-group-lg</code></H>
      <Input type="text" large>
        <InputButton>
          <Button context="warning" label="Action" toggle/>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </InputButton>
      </Input>
      <H margin title="Normal"/>
      <Input type="text">
        <InputButton>
          <Button context="danger" label="Action"/>
        </InputButton>
      </Input>
      <H margin>Small <code>.input-group.input-group-sm</code></H>
      <Input type="text" small>
        <InputButton right>
          <Button context="info" label="Go!" flat/>
        </InputButton>
      </Input>
    </BoxBody>
  </Box>

// Column 2
const HorizontalForm = () =>
  <Box context="info">
    <BoxHeader title="Horizontal Form"/>
    <BoxBody>
      <Form horizontal sm="2">
        <Input type="email" id="horizontalFormEmail" label="Email" placeholder="Email"/>
        <Input type="passsword" id="horizontalFormPassword" label="Password" placeholder="Password"/>
        <Input type="checkbox" id="horizontalFormCheckbox" label="Remember me"/>
      </Form>
    </BoxBody>
    <BoxFooter>
      <Button context="default" label="Cancel" submit/>
      <Button context="info" label="Sign in" submit right/>
    </BoxFooter>
  </Box>
const GeneralElements = () =>
  <Box context="warning">
    <BoxHeader title="General Elements" bordered/>
    <BoxBody>
      <Input type="text" label="Text" placeholder="Enter..."/>
      <Input type="text" label="Text Disabled" placeholder="Enter..." disabled/>
      <Input type="textarea" label="Textarea" placeholder="Enter..." rows="3"/>
      <Input type="textarea" label="Textarea Disabled" placeholder="Enter..." rows="3" disabled/>
      <Input type="text" id="generalElementsSuccess" placeholder="Enter..." help="Help block with success" success>
        <InputLabel><Icon name="fa-check"/> Input with success</InputLabel>
      </Input>
      <Input type="text" id="generalElementsWarning" placeholder="Enter..." help="Help block with warning" warning>
        <InputLabel><Icon name="fa-bell-o"/> Input with warning</InputLabel>
      </Input>
      <Input type="text" id="generalElementsError" placeholder="Enter..." help="Help block with error" error>
        <InputLabel><Icon name="fa-times-circle-o"/> Input with error</InputLabel>
      </Input>
      <FormGroup>
        <Input type="checkbox" label="Checkbox1"/>
        <Input type="checkbox" label="Checkbox2"/>
        <Input type="checkbox" label="Checkbox disabled" disabled/>
      </FormGroup>
      <FormGroup name="generalElementsRadio">
        <Input type="radio" id="generalElementsRadio1" label="Option one is this and that&mdash;be sure to include why it's great"/>
        <Input type="radio" id="generalElementsRadio2" label="Option two can be something else and selecting it will deselect option one"/>
        {/* <Input type="radio" id="generalElementsRadio3" label="Another 1"/> */}
        {/* <Input type="radio" id="generalElementsRadio4" label="Another 2"/> */}
        {/* <Input type="radio" id="generalElementsRadio5" label="Another 3"/> */}
        <Input type="radio" id="generalElementsRadioDisabled" label="Option three is disabled" disabled/>
      </FormGroup>
      <Input type="select">
        <InputLabel>Select</InputLabel>
        <option>option 1</option>
        <option>option 2</option>
        <option>option 3</option>
        <option>option 4</option>
        <option>option 5</option>
      </Input>
      {/* <div class="form-group">
        <label>Select</label>
        <select class="form-control">
          <option>option 1</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
          <option>option 5</option>
        </select>
      </div> */}
      <Input type="select" label="Select Disabled" disabled>
        <option>option 1</option>
        <option>option 2</option>
        <option>option 3</option>
        <option>option 4</option>
        <option>option 5</option>
      </Input>
      <Input type="select" label="Select Multiple" multiple>
        <option>option 1</option>
        <option>option 2</option>
        <option>option 3</option>
        <option>option 4</option>
        <option>option 5</option>
      </Input>
      <Input type="select" label="Select Multiple Disabled" multiple disabled>
        <option>option 1</option>
        <option>option 2</option>
        <option>option 3</option>
        <option>option 4</option>
        <option>option 5</option>
      </Input>
    </BoxBody>
  </Box>

class Page extends Component {
  title = 'General Form Elements'
  tagLine = 'Preview'
  componentDidMount()  { console.log(`componentDidMount (${this.title})`) }
  componentDidUpdate() { console.log(`componentDidUpdate (${this.title})`) }
  render() {
    return (
      <Layout title={this.title} tagLine={this.tagLine}>
        <Row>
          <Row md="6">
            <QuickExample/>
            <DifferentHeight/>
            <DifferentWidth/>
            <InputAddons/>
          </Row>
          <Row md="6">
            <HorizontalForm/>
            <GeneralElements/>
          </Row>
        </Row>
      </Layout>
    )
  }
}

export default Page

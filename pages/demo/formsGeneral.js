import React, {Component} from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import {
  typeMatch, matchChild,

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

const FormGroup = ({children, ...props}) => <div class="form-group">{children}</div>

const Input = (
  {
    children,
    type, id, label, placeholder, help,
    small, large,
    lg, md, sm, xs,
    ...props
  }) => {
  children = React.Children.toArray(children);

  const inputClass = []
  var {match: inputGroups = [], children} = matchChild(children, [InputAddon, InputButton])

  switch (type) {
    case 'checkbox':
      return (
        <div class="checkbox">
          <label>
            <input type={type} id={id}/> {label}
          </label>
        </div>
      )
      break;
    case 'file':
      break;
    default:
      inputClass.push('form-control')
  }

  if (small) inputClass.push('input-sm')
  if (large) inputClass.push('input-lg')

  let input = <input class={inputClass.join(' ')} type={type} id={id} placeholder={placeholder}/>

  if (inputGroups.length) {
    const inputGroupClass = ['input-group']
    if (small) inputGroupClass.push('input-group-sm')
    if (large) inputGroupClass.push('input-group-lg')

    input = (
      <div class={inputGroupClass.join(' ')}>
        {inputGroups.filter((inputGroup) => !inputGroup.props.right )}
        {input}
        {inputGroups.filter((inputGroup) => inputGroup.props.right )}
      </div>)
  }

  return (lg || md || sm || xs)
    ? <Col lg={lg} md={md} sm={sm} xs={xs}>{input}</Col>
    : <FormGroup>
        {label && <label for={id}>{label}</label>}
        {input}
        {help && <p class="help-block">{help}</p>}
      </FormGroup>

}
const InputAddon = ({children, value, right = false, ...props}) => <div class="input-group-addon">{children || value}</div>
const InputButton = ({children, value, right = false, ...props}) => <div class="input-group-btn">{children || value}</div>

const Button = ({children, id, context, label, submit, className, right, flat, toggle, ...props}) => {
  const buttonClass = ['btn']
  if (context) buttonClass.push(`btn-${context}`)
  if (right) buttonClass.push('pull-right')
  if (flat) buttonClass.push('btn-flat')
  if (toggle) buttonClass.push('dropdown-toggle')
  if (className) buttonClass.push(className)

  const type = submit ? 'submit' : 'button'

  return <button class={buttonClass.join(' ')} type={type} id={id} data-toggle={toggle && 'dropdown'}>{children || label}{toggle && <Icon name="fa-caret-down"/>}</button>
}

const H = ({children, title, h1, h2, h3, h4, h5, h6, margin, ...props}) => {
  switch (true) {
    case h1: return <h1>{title}{children}</h1>
    case h2: return <h2>{title}{children}</h2>
    case h3: return <h3>{title}{children}</h3>
    case h4: return <h4>{title}{children}</h4>
    case h5: return <h5>{title}{children}</h5>
    case h6: return <h6>{title}{children}</h6>
    case margin: return <p class="margin">{title}{children}</p>
  }
  return <span>{children}</span>
}

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
      <form class="form-horizontal">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email"/>
          </div>
        </div>

        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password"/>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox"/> Remember me
              </label>
            </div>
          </div>
        </div>

      </form>
    </BoxBody>
    <BoxFooter>
      <Button context="default" label="Cancel" submit/>
      <Button context="info" label="Sign in" submit right/>
    </BoxFooter>
  </Box>
const HorizontalForm_ = () =>
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Horizontal Form</h3>
    </div>
    <form class="form-horizontal">
      <div class="box-body">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email"/>
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password"/>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox"/> Remember me
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="box-footer">
        <button type="submit" class="btn btn-default">Cancel</button>
        <button type="submit" class="btn btn-info pull-right">Sign in</button>
      </div>
    </form>
  </div>

const GeneralElements = () =>
  <Box context="warning">
    <div class="box-header with-border">
      <h3 class="box-title">General Elements</h3>
    </div>
    <div class="box-body">
      <form role="form">
        <div class="form-group">
          <label>Text</label>
          <input type="text" class="form-control" placeholder="Enter ..."/>
        </div>
        <div class="form-group">
          <label>Text Disabled</label>
          <input type="text" class="form-control" placeholder="Enter ..." disabled/>
        </div>
        <div class="form-group">
          <label>Textarea</label>
          <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
        </div>
        <div class="form-group">
          <label>Textarea Disabled</label>
          <textarea class="form-control" rows="3" placeholder="Enter ..." disabled></textarea>
        </div>
        <div class="form-group has-success">
          <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Input with success</label>
          <input type="text" class="form-control" id="inputSuccess" placeholder="Enter ..."/>
          <span class="help-block">Help block with success</span>
        </div>
        <div class="form-group has-warning">
          <label class="control-label" for="inputWarning"><i class="fa fa-bell-o"></i> Input with warning</label>
          <input type="text" class="form-control" id="inputWarning" placeholder="Enter ..."/>
          <span class="help-block">Help block with warning</span>
        </div>
        <div class="form-group has-error">
          <label class="control-label" for="inputError"><i class="fa fa-times-circle-o"></i> Input with error</label>
          <input type="text" class="form-control" id="inputError" placeholder="Enter ..."/>
          <span class="help-block">Help block with error</span>
        </div>
        <div class="form-group">
          <div class="checkbox">
            <label>
              <input type="checkbox"/>
              Checkbox 1
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox"/>
              Checkbox 2
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" disabled/>
              Checkbox disabled
            </label>
          </div>
        </div>
        <div class="form-group">
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked/>
              Option one is this and that&mdash;be sure to include why it's great
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
              Option two can be something else and selecting it will deselect option one
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled/>
              Option three is disabled
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>Select</label>
          <select class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
        <div class="form-group">
          <label>Select Disabled</label>
          <select class="form-control" disabled>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
        <div class="form-group">
          <label>Select Multiple</label>
          <select multiple class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
        <div class="form-group">
          <label>Select Multiple Disabled</label>
          <select multiple class="form-control" disabled>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
      </form>
    </div>
  </Box>
const GeneralElements_ = () =>
  <div class="box box-warning">
    <div class="box-header with-border">
      <h3 class="box-title">General Elements</h3>
    </div>
    <div class="box-body">
      <form role="form">
        <div class="form-group">
          <label>Text</label>
          <input type="text" class="form-control" placeholder="Enter ..."/>
        </div>
        <div class="form-group">
          <label>Text Disabled</label>
          <input type="text" class="form-control" placeholder="Enter ..." disabled/>
        </div>
        <div class="form-group">
          <label>Textarea</label>
          <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
        </div>
        <div class="form-group">
          <label>Textarea Disabled</label>
          <textarea class="form-control" rows="3" placeholder="Enter ..." disabled></textarea>
        </div>
        <div class="form-group has-success">
          <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i> Input with success</label>
          <input type="text" class="form-control" id="inputSuccess" placeholder="Enter ..."/>
          <span class="help-block">Help block with success</span>
        </div>
        <div class="form-group has-warning">
          <label class="control-label" for="inputWarning"><i class="fa fa-bell-o"></i> Input with warning</label>
          <input type="text" class="form-control" id="inputWarning" placeholder="Enter ..."/>
          <span class="help-block">Help block with warning</span>
        </div>
        <div class="form-group has-error">
          <label class="control-label" for="inputError"><i class="fa fa-times-circle-o"></i> Input with error</label>
          <input type="text" class="form-control" id="inputError" placeholder="Enter ..."/>
          <span class="help-block">Help block with error</span>
        </div>
        <div class="form-group">
          <div class="checkbox">
            <label>
              <input type="checkbox"/>
              Checkbox 1
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox"/>
              Checkbox 2
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" disabled/>
              Checkbox disabled
            </label>
          </div>
        </div>
        <div class="form-group">
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked/>
              Option one is this and that&mdash;be sure to include why it's great
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
              Option two can be something else and selecting it will deselect option one
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled/>
              Option three is disabled
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>Select</label>
          <select class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
        <div class="form-group">
          <label>Select Disabled</label>
          <select class="form-control" disabled>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
        <div class="form-group">
          <label>Select Multiple</label>
          <select multiple class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
        <div class="form-group">
          <label>Select Multiple Disabled</label>
          <select multiple class="form-control" disabled>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </div>
      </form>
    </div>
  </div>




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
            <HorizontalForm/>
            <GeneralElements/>
          </Row>
          <Col md="6">
            <HorizontalForm_/>
            <GeneralElements_/>
          </Col>
        </Row>
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

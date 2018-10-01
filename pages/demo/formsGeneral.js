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

// TODO: On FormGroup if fromInput = true, each child, set fromGroup = true


const isArray = (test) => Array.isArray(test)
const isTrue = (test) => test || false;
const isDefined = (test) => test !== undefined
const isNull = (test) => test === null
const isNaN = (test) => test === NaN
const isEmpty = (test) => !isDefined(test) || isNull(test) || isNaN(test) || test === ''
const cloneFirst = (elements, additionalProps = {}) => isArray(elements) && elements.length ? React.cloneElement(elements[0], additionalProps) : null

const FormGroup = ({children, success, warning, error, fromInput = false, ...props}) => {
  const formGroupClass = builder('form-group')
    .append('has-success', isTrue(success))
    .append('has-warning', isTrue(warning))
    .append('has-error', isTrue(error))
    .toClassName()

  return <div {...formGroupClass}>{fromInput ? children : React.Children.map(child => React.cloneElement(child, {fromGroup: true}))}</div>
}

const Input = (
  {
    children,
    type, id,
    label, placeholder, help,
    // value, disabled, checked // Pass Down by Defualt
    small, large,
    lg, md, sm, xs,
    success, warning, error,
    horizontal,
    formGroup = false,
    ...props
  }) => {
  children = React.Children.toArray(children);
  var {match: inputGroups = [], children} = matchChild(children, [InputAddon, InputButton])
  var {match: inputLabels = [], children} = matchChild(children, InputLabel)
  var {match: inputHelps = [], children} = matchChild(children, InputHelp)

  if (type === 'checkbox' || type === 'radio') {
    const colProps = builder()
      .kvp('lg', 12 - lg, isTrue(lg))
      .kvp('md', 12 - md, isTrue(md))
      .kvp('sm', 12 - sm, isTrue(sm))
      .kvp('xs', 12 - xs, isTrue(xs))
      .kvp('lgOffset', lg, isTrue(lg))
      .kvp('mdOffset', md, isTrue(md))
      .kvp('smOffset', sm, isTrue(sm))
      .kvp('xsOffset', xs, isTrue(xs))
      .toObject()

    // Radio 'name' will get passed as props
    const input = <div class={type}><label><input {...props} type={type} id={id}/> {label}</label></div>
    const inputGroup = horizontal ? <Col {...colProps}>{input}</Col> : input

    return (formGroup)
      ? inputGroup
      : <FormGroup {...{success, warning, error} } fromInput={true}>{inputGroup}</FormGroup>
  }

  // Input
  const inputClass = builder()
    .append('form-control', (type !== 'file'))
    .append('input-sm', isTrue(small))
    .append('input-lg', isTrue(large))
    .toClassName()
  const input = (type == 'textarea')
    ? <textarea {...props} {...inputClass} type={type} id={id} placeholder={placeholder}></textarea>
    : <input {...props} {...inputClass} type={type} id={id} placeholder={placeholder}></input>

  // Input Group
  const inputGroupClass = builder()
    .append('input-group', inputGroups.length)
    .append('input-group-sm', isTrue(inputGroups.length && small))
    .append('input-group-lg', isTrue(inputGroups.length && large))
    .toClassName()
  const inputGroup = (
    <div {...inputGroupClass}>
      {inputGroups.filter((inputGroup) => !inputGroup.props.right)}
      {input}
      {inputGroups.filter((inputGroup) => inputGroup.props.right)}
    </div>)

  // If sized and not horizontal
  if ((lg || md || sm || xs) && !horizontal) return <Col {...{lg, md, sm, xs}}>{inputGroup}</Col>

  // Label
  const inputLabel = cloneFirst(inputLabels, {id, horizontal, lg, md, sm, xs}) || (label) && <InputLabel {...{id, horizontal, lg, md, sm, xs}}>{label}</InputLabel>

  // Help
  const inputHelp = cloneFirst(inputHelps) || (help) && <InputHelp>{help}</InputHelp>

  // FormGroup
  const horizontalClass = builder()
    .append(`col-lg-${12 - lg}`, isTrue(horizontal && lg))
    .append(`col-md-${12 - md}`, isTrue(horizontal && md))
    .append(`col-sm-${12 - sm}`, isTrue(horizontal && sm))
    .append(`col-xs-${12 - xs}`, isTrue(horizontal && xs))
    .toClassName()
  return (
    <FormGroup {...{success, warning, error}} fromInput={true}>
      {inputLabel}
      <div {...horizontalClass}>
        {inputGroup}
        {inputHelp}
      </div>
    </FormGroup>)

}
const InputLabel = ({children, id, horizontal, lg, md, sm, xs, ...props}) => {
  const labelClass = builder('control-label')
    .append(`col-lg-${lg}`, isTrue(horizontal && lg))
    .append(`col-md-${md}`, isTrue(horizontal && md))
    .append(`col-sm-${sm}`, isTrue(horizontal && sm))
    .append(`col-xs-${xs}`, isTrue(horizontal && xs))
    .toClassName()

  return <label for={id} {...labelClass}>{children}</label>
}
const InputHelp = ({children, ...props}) => <p class="help-block">{children}</p>
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

const Form = ({children, horizontal, lg, md, sm, xs, ...props}) => {
  children = React.Children.toArray(children)
  const formClass = builder()
    .append('form-horizontal', isTrue(horizontal))
    .toClassName()

  if (horizontal && !(lg || md || sm || xs)) xs = 2 // Default to xs = 2 if lg, md, sm or xs DNE

  return <form {...formClass}>{children.map(child => React.cloneElement(child, {horizontal, lg, md, sm, xs}))}</form>
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
      <Form horizontal sm="2">
        <Input type="email" id="horizontalFormEmail" label="Email" placeholder="Email" help="Help Block"/>
        <Input type="passsword" id="horizontalFormPassword" label="Password"/>
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
      <FormGroup>
        <Input formGroup={true} type="radio" id="generalElementsRadio1" name="generalElementsRadio" label="Option one is this and that&mdash;be sure to include why it's great"/>
        <Input formGroup={true} type="radio" id="generalElementsRadio2" name="generalElementsRadio" label="Option two can be something else and selecting it will deselect option one"/>
        <Input formGroup={true} type="radio" id="generalElementsRadio3" name="generalElementsRadio" label="Another 1"/>
        <Input formGroup={true} type="radio" id="generalElementsRadio4" name="generalElementsRadio" label="Another 2"/>
        <Input formGroup={true} type="radio" id="generalElementsRadio5" name="generalElementsRadio" label="Another 3"/>
        <Input formGroup={true} type="radio" id="generalElementsRadioDisabled" name="generalElementsRadio" label="Option three is disabled" disabled/>
      </FormGroup>

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
    </BoxBody>
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
            <GeneralElements/>
          </Row>
          <Col md="6">
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

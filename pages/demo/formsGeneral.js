import React, {Component} from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import {
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

const Input = ({children, type, id, label, placeholder, help, small, large, ...props}) => {
  const inputClass = []

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

  return (
    <FormGroup>
      {label && <label for={id}>{label}</label>}
      <input class={inputClass.join(' ')} type={type} id={id} placeholder={placeholder}/>
      {help && <p class="help-block">{help}</p>}
    </FormGroup>
  )
}

const Button = ({children, id, context, label, type = 'submit', ...props}) => {
  const buttonClass = ['btn']
  if (context) buttonClass.push(`btn-${context}`)

  return (
    <button class={buttonClass.join(' ')} type={type} id={id}>{label}</button>
  )
}

// Column 1
const QuickExample = () => (
  <Box context="primary">
    <BoxHeader title="Quick Example" bordered/>
    <BoxBody>
      <Input type="email" id="quickExampleEmail" label="Email address" placeholder="Enter email" help={null}/>
      <Input type="password" id="quickExamplePassword" label="Password" placeholder="Password" help={null}/>
      <Input type="file" id="quickExampleFile" label="File input" placeholder={null} help="Example block-level help text here."/>
      <Input type="checkbox" id="quickExampleCheckbox" label="Check me out" placeholder={null} help={null}/>
    </BoxBody>
    <BoxFooter>
      <Button id="quickExampleSubmit" label="Submit" context="primary"/>
    </BoxFooter>
  </Box>
)
const DifferentHeight = () => (
  <Box context="success">
    <BoxHeader title="Different Height" bordered/>
    <BoxBody>
      <Input type="text" id="differentHeightLarge" placeholder=".input-lg" large/>
      <Input type="text" id="differentHeightDefault" placeholder="Default height"/>
      <Input type="text" id="differentHeightSmall" placeholder=".input-sm" small/>
    </BoxBody>
  </Box>
)

const DifferentWidth = () => (
  <Box context="danger">
    <BoxHeader title="Different Width" bordered/>
    <BoxBody>
      <div class="row">
        <div class="col-xs-3">
          <input type="text" class="form-control" placeholder=".col-xs-3"/>
        </div>
        <div class="col-xs-4">
          <input type="text" class="form-control" placeholder=".col-xs-4"/>
        </div>
        <div class="col-xs-5">
          <input type="text" class="form-control" placeholder=".col-xs-5"/>
        </div>
      </div>
    </BoxBody>
  </Box>
)
const DifferentWidth_ = () => (
  <div class="box box-danger">
    <div class="box-header with-border">
      <h3 class="box-title">Different Width</h3>
    </div>
    <div class="box-body">
      <div class="row">
        <div class="col-xs-3">
          <input type="text" class="form-control" placeholder=".col-xs-3"/>
        </div>
        <div class="col-xs-4">
          <input type="text" class="form-control" placeholder=".col-xs-4"/>
        </div>
        <div class="col-xs-5">
          <input type="text" class="form-control" placeholder=".col-xs-5"/>
        </div>
      </div>
    </div>
  </div>
)
const InputAddon = () => (
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Input Addon</h3>
    </div>
    <div class="box-body">
      <div class="input-group">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" placeholder="Username"/>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control"/>
        <span class="input-group-addon">.00</span>
      </div>
      <br/>
      <div class="input-group">
        <span class="input-group-addon">$</span>
        <input type="text" class="form-control"/>
        <span class="input-group-addon">.00</span>
      </div>
      <h4>With icons</h4>
      <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
        <input type="email" class="form-control" placeholder="Email"/>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control"/>
        <span class="input-group-addon"><i class="fa fa-check"></i></span>
      </div>
      <br/>
      <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-dollar"></i></span>
        <input type="text" class="form-control"/>
        <span class="input-group-addon"><i class="fa fa-ambulance"></i></span>
      </div>
      <h4>With checkbox and radio inputs</h4>
      <div class="row">
        <div class="col-lg-6">
          <div class="input-group">
            <span class="input-group-addon">
              <input type="checkbox"/>
            </span>
            <input type="text" class="form-control"/>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="input-group">
            <span class="input-group-addon">
              <input type="radio"/>
            </span>
            <input type="text" class="form-control"/>
          </div>
        </div>
      </div>
      <h4>With buttons</h4>
      <p class="margin">Large: <code>.input-group.input-group-lg</code></p>
      <div class="input-group input-group-lg">
        <div class="input-group-btn">
          <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">
            Action
            <span class="fa fa-caret-down"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </div>
        <input type="text" class="form-control"/>
      </div>
      <p class="margin">Normal</p>
      <div class="input-group">
        <div class="input-group-btn">
          <button type="button" class="btn btn-danger">Action</button>
        </div>
        <input type="text" class="form-control"/>
      </div>
      <p class="margin">Small <code>.input-group.input-group-sm</code></p>
      <div class="input-group input-group-sm">
        <input type="text" class="form-control"/>
        <span class="input-group-btn">
          <button type="button" class="btn btn-info btn-flat">Go!</button>
        </span>
      </div>
    </div>
  </div>
)
const InputAddon_ = () => (
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Input Addon</h3>
    </div>
    <div class="box-body">
      <div class="input-group">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" placeholder="Username"/>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control"/>
        <span class="input-group-addon">.00</span>
      </div>
      <br/>
      <div class="input-group">
        <span class="input-group-addon">$</span>
        <input type="text" class="form-control"/>
        <span class="input-group-addon">.00</span>
      </div>
      <h4>With icons</h4>
      <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
        <input type="email" class="form-control" placeholder="Email"/>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control"/>
        <span class="input-group-addon"><i class="fa fa-check"></i></span>
      </div>
      <br/>
      <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-dollar"></i></span>
        <input type="text" class="form-control"/>
        <span class="input-group-addon"><i class="fa fa-ambulance"></i></span>
      </div>
      <h4>With checkbox and radio inputs</h4>
      <div class="row">
        <div class="col-lg-6">
          <div class="input-group">
            <span class="input-group-addon">
              <input type="checkbox"/>
            </span>
            <input type="text" class="form-control"/>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="input-group">
            <span class="input-group-addon">
              <input type="radio"/>
            </span>
            <input type="text" class="form-control"/>
          </div>
        </div>
      </div>
      <h4>With buttons</h4>
      <p class="margin">Large: <code>.input-group.input-group-lg</code></p>
      <div class="input-group input-group-lg">
        <div class="input-group-btn">
          <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">
            Action
            <span class="fa fa-caret-down"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </div>
        <input type="text" class="form-control"/>
      </div>
      <p class="margin">Normal</p>
      <div class="input-group">
        <div class="input-group-btn">
          <button type="button" class="btn btn-danger">Action</button>
        </div>
        <input type="text" class="form-control"/>
      </div>
      <p class="margin">Small <code>.input-group.input-group-sm</code></p>
      <div class="input-group input-group-sm">
        <input type="text" class="form-control"/>
        <span class="input-group-btn">
          <button type="button" class="btn btn-info btn-flat">Go!</button>
        </span>
      </div>
    </div>
  </div>
)

// Column 2
const HorizontalForm = () => (
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
)
const GeneralElements = () => (
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
)



class Page extends Component {
  title = 'General Form Elements'
  tagLine = 'Preview'
  componentDidMount()  { console.log(`componentDidMount (${this.title})`) }
  componentDidUpdate() { console.log(`componentDidUpdate (${this.title})`) }
  render() {
    return (
      <Layout title={this.title} tagLine={this.tagLine}>
        <Row>
          <Col md="6">
            <Row>
              <QuickExample/>
              <DifferentHeight/>
              <DifferentWidth/>
            </Row>
            <InputAddon/>
          </Col>
          <Col md="6">
            <Row>
              <QuickExample/>
              <DifferentHeight/>
            </Row>
            <DifferentWidth_/>
            <InputAddon_/>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <QuickExample/>
            <DifferentHeight/>
            <DifferentWidth/>
            <InputAddon/>
          </Col>
          <Col md="6">
            <HorizontalForm/>
            <GeneralElements/>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Page

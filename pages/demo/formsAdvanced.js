import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
// import $ from 'jquery'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'

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

{/*
<Box context="danger" collapsable removable>
  <BoxHeader title="Input masks"/>
  <BoxBody>
  </BoxBody>
</Box>
*/}

const Select2 = ({children, ...props }) =>
  <Box context="default" collapsable removable>
    <BoxHeader title="Select2"/>
    <BoxBody>
      <Row>
        <Col md="6">
          <Input type="select2" label="Minimal">
            <option>Alabama</option>
            <option>Alaska</option>
            <option>California</option>
            <option>Delaware</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Washington</option>
          </Input>
          <Input type="select2" label="Disabled" disabled>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>California</option>
            <option>Delaware</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Washington</option>
          </Input>
        </Col>
        <Col md="6">
          <Input type="select2" label="Multiple" placeholder="Select a State" multiple>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>California</option>
            <option>Delaware</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Washington</option>
          </Input>
          <Input type="select2" label="Disabled Result">
            <option>Alabama</option>
            <option>Alaska</option>
            <option disabled>California (disabled)</option>
            <option>Delaware</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Washington</option>
          </Input>
        </Col>
      </Row>
    </BoxBody>
    <BoxFooter>
      Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about the plugin.
    </BoxFooter>
  </Box>
const InputMasks = ({children, ...props }) =>
  <Box context="danger" collapsable removable>
    <BoxHeader title="Input masks"/>
    <BoxBody>
      <Input type="inputmask" label="Date masks:" inputmask={{mask: 'dd/mm/yyyy'}} placeholder="dd/mm/yyyy">
        <InputAddon><Icon name="fa-calendar"/></InputAddon>
      </Input>
      <Input type="inputmask"                     inputmask={{mask: 'mm/dd/yyyy'}} placeholder="mm/dd/yyyy">
        <InputAddon><Icon name="fa-calendar"/></InputAddon>
      </Input>
      <Input type="inputmask" label="US phone masks:" inputmask={{mask: '(999) 999-9999'}}>
        <InputAddon><Icon name="fa-phone"/></InputAddon>
      </Input>
      <Input type="inputmask" label="Intl US phone masks:" inputmask={{mask: ['999-999-9999 [x99999]', '+099 99 99 9999[9]-9999']}}>
        <InputAddon><Icon name="fa-phone"/></InputAddon>
      </Input>
      <Input type="inputmask" label="IP masks:" inputmask={{alias: 'ip'}}>
        <InputAddon><Icon name="fa-laptop"/></InputAddon>
      </Input>
    </BoxBody>
  </Box>
const ColorAndTimePickers = ({children, ...props }) =>
  <Box context="info" collapsable removable>
    <BoxHeader title="Color & Time Picker"/>
    <BoxBody>
      <Input type="colorpicker" label="Color picker:"/>
      <Input type="text" label="Color picker with addon:">
        <InputAddon right colorpicker><i></i></InputAddon>
      </Input>

      <Input type="timepicker" label="Time picker:" timepicker={{showInputs: false}}>
        <InputAddon right><Icon name="fa-clock-o"/></InputAddon>





      </Input>

      {/* Input Group must include 'bootstrap-timepicker' in order for popup */}
      {/*
      <div class="bootstrap-timepicker">
        <Input type="text" label="Time picker:" class="timepicker">
          <InputAddon right><Icon name="fa-clock-o"/></InputAddon>
        </Input>
      </div>
      */}

      <div>
        TODO: Update Colorpicker <a href="https://casesandberg.github.io/react-color/">React Colorpicker</a>
      </div>
    </BoxBody>
  </Box>
const DatePickers = ({children, ...props }) =>
  <Box context="primary" collapsable removable>
    <BoxHeader title="Date picker"/>
    <BoxBody>
      <Input type="datepicker" label="Date:" datepicker={{autoclose: true}}>
        <InputAddon><Icon name="fa-calendar"/></InputAddon>
      </Input>
      <Input type="daterangepicker" label="Date range:" class="pull-right">
        <InputAddon><Icon name="fa-calendar"/></InputAddon>
      </Input>
      <Input type="daterangepicker" label="Date and time range:" class="pull-right"  daterangepicker={{ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' }}>
        <InputAddon><Icon name="fa-clock-o"/></InputAddon>
      </Input>
      {/*
      <Input type="daterangepicker" label="Date range button:" class="pull-right" daterangepicker={
        {
          ranges : {
            'Today'       : [moment(),                                        moment()],
            'Yesterday'   : [moment().subtract(1, 'days'),                    moment().subtract(1, 'days')],
            'Last 7 Days' : [moment().subtract(6, 'days'),                    moment()],
            'Last 30 Days': [moment().subtract(29, 'days'),                   moment()],
            'This Month'  : [moment().startOf('month'),                       moment().endOf('month')],
            'Last Month'  : [moment().subtract(1, 'month').startOf('month'),  moment().subtract(1, 'month').endOf('month')]
          },
          startDate: moment().subtract(29, 'days'),
          endDate  : moment()
        },
        function (start, end) {
          console.log({start, end});
          $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
        }
      }>
        <div class="input-group">
          <button type="button" class="btn btn-default pull-right" id="daterange-btn">
            <span>
              <i class="fa fa-calendar"></i> Date range picker
            </span>
            <i class="fa fa-caret-down"></i>
          </button>
        </div>
      </Input>

      <div class="form-group">
        <label>Date range button:</label>
        <div class="input-group">
          <button type="button" class="btn btn-default pull-right" id="daterange-btn">
            <span>
              <i class="fa fa-calendar"></i> Date range picker
            </span>
            <i class="fa fa-caret-down"></i>
          </button>
        </div>
      </div>
    */}

    </BoxBody>
  </Box>
const IChecks = ({children, ...props }) =>
  <Box context="success" collapsable removable>
    <BoxHeader title="iCheck - Checkbox &amp; Radio Inputs"/>
    <BoxBody>
      <Col><H h3>Context Colors</H></Col>
      {[
        'primary',
        'default',
        'success',
        'info',
        'warning',
        'danger'
      ].map((color, key) =>
        <Col xs={2} key={color} context={color} solid>
          <H h4 class="text-center">{color}</H>
          <FormGroup class="text-center">
            <Input type="checkbox" id={`icheck-01-checkbox-${color}`} icheck={color} defaultChecked/>
            <Input type="checkbox" id={`icheck-02-checkbox-${color}`} icheck={color} />
            <Input type="checkbox" id={`icheck-03-checkbox-${color}`} icheck={color} disabled defaultChecked/>
            <Input type="checkbox" id={`icheck-04-checkbox-${color}`} icheck={color} disabled/>
            <Input type="radio" id={`icheck-01-radio-${color}`} name={`icheck-enabled-radio-${color}`} icheck={color} defaultChecked/>
            <Input type="radio" id={`icheck-02-radio-${color}`} name={`icheck-enabled-radio-${color}`} icheck={color}/>
            <Input type="radio" id={`icheck-03-radio-${color}`} name={`icheck-disabled-radio-${color}`} icheck={color} disabled defaultChecked/>
            <Input type="radio" id={`icheck-04-radio-${color}`} name={`icheck-disabled-radio-${color}`} icheck={color} disabled/>
          </FormGroup>
        </Col>
      )}
      <Col><H h3>Flat UI Colors</H></Col>
      {[
        'turquoise',
        'emerland',
        'peterriver',
        'amethyst',
        'wetasphalt',
        'greensea',
        'nephritis',
        'belizehole',
        'wisteria',
        'midnightblue',
        'sunflower',
        'carrot',
        'alizarin',
        'clouds',
        'concrete',
        'orange',
        'pumpkin',
        'pomegranate',
        'silver',
        'asbestos'
      ].map((color, key) =>
        <Col xs={3} key={color} context={color} solid>
          <H h4 class="text-center">{color}</H>
          <FormGroup class="text-center">
            <Input type="checkbox" id={`icheck-01-checkbox-${color}`} icheck={color} defaultChecked/>
            <Input type="checkbox" id={`icheck-02-checkbox-${color}`} icheck={color} />
            <Input type="checkbox" id={`icheck-03-checkbox-${color}`} icheck={color} disabled defaultChecked/>
            <Input type="checkbox" id={`icheck-04-checkbox-${color}`} icheck={color} disabled/>
            <Input type="radio" id={`icheck-01-radio-${color}`} name={`icheck-enabled-radio-${color}`} icheck={color} defaultChecked/>
            <Input type="radio" id={`icheck-02-radio-${color}`} name={`icheck-enabled-radio-${color}`} icheck={color}/>
            <Input type="radio" id={`icheck-03-radio-${color}`} name={`icheck-disabled-radio-${color}`} icheck={color} disabled defaultChecked/>
            <Input type="radio" id={`icheck-04-radio-${color}`} name={`icheck-disabled-radio-${color}`} icheck={color} disabled/>
          </FormGroup>
        </Col>
      )}
    </BoxBody>
    <BoxFooter>
      Many more skins available. <a href="https://bantikyan.github.io/icheck-bootstrap//">Documentation</a>
    </BoxFooter>
  </Box>

class Page extends Component {
  title = 'Advanced Form Elements'
  tagLine = 'Preview'
  constructor() {
    super()
  }
  componentDidMount()  {
    console.log(`componentDidMount (${this.title})`)
  }
  componentDidUpdate() {
    console.log(`componentDidUpdate (${this.title})`)  }

  render() {
    return (
      <Layout title={this.title} tagLine={this.tagLine}>
        <Row>
          <Select2/>
        </Row>
        <Row>
          <Col md="6">
            <Row>
              <InputMasks/>
              <ColorAndTimePickers/>
              <DatePickers/>
            </Row>
          </Col>
          <Col md="6">
            <Row>
              <IChecks/>
            </Row>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Page

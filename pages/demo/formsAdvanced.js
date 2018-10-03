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
          <Input type="select" label="Minimal" class="select2" style={{width: '100%'}}>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>California</option>
            <option>Delaware</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Washington</option>
          </Input>
          <Input type="select" label="Disabled" class="select2" style={{width: '100%'}} disabled>
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
          <Input type="select" label="Multiple" class="select2" style={{width: '100%'}} data-placeholder="Select a State" multiple>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>California</option>
            <option>Delaware</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Washington</option>
          </Input>
          <Input type="select" label="Disabled Result" class="select2" style={{width: '100%'}}>
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
      <Input type="text" label="Date masks:" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask>
        <InputAddon><Icon name="fa-calendar"/></InputAddon>
      </Input>
      <Input type="text" data-inputmask="'alias': 'mm/dd/yyyy'" data-mask>
        <InputAddon><Icon name="fa-calendar"/></InputAddon>
      </Input>
      <Input type="text" label="US phone masks:" data-inputmask='"mask": "(999) 999-9999"' data-mask>
        <InputAddon><Icon name="fa-phone"/></InputAddon>
      </Input>
      <Input type="text" label="Intl US phone masks:" data-inputmask="'mask': ['999-999-9999 [x99999]', '+099 99 99 9999[9]-9999']" data-mask>
        <InputAddon><Icon name="fa-phone"/></InputAddon>
      </Input>
      <Input type="text" label="IP masks:" data-inputmask="'alias': 'ip'" data-mask>
        <InputAddon><Icon name="fa-laptop"/></InputAddon>
      </Input>
    </BoxBody>
  </Box>

const ColorAndTimePickers_ = ({children, ...props }) => {
  return (
    <div class="box box-info">
      <div class="box-header">
        <h3 class="box-title">Color & Time Picker</h3>
      </div>

      <div class="box-body">
        <div class="form-group">
          <label>Color picker:</label>
          <input type="text" class="form-control my-colorpicker1"/>
        </div>

        <div class="form-group">
          <label>Color picker with addon:</label>
          <div class="input-group my-colorpicker2">
            <input type="text" class="form-control"/>
            <div class="input-group-addon">
              <i></i>
            </div>
          </div>
        </div>

        <div class="bootstrap-timepicker">
          <div class="form-group">
            <label>Time picker:</label>
            <div class="input-group">
              <input type="text" class="form-control timepicker"/>
              <div class="input-group-addon">
                <i class="fa fa-clock-o"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
const ColorAndTimePickers = ({children, ...props }) =>
  <Box context="info" collapsable removable>
    <BoxHeader title="Color & Time Picker"/>
    <BoxBody>
      <Input type="text" label="Color picker:" class="my-colorpicker1"/>
      <Input type="text" label="Color picker with addon:" class="my-colorpicker2">
        <InputAddon right><i></i></InputAddon>
      </Input>

      <div class="form-group">
        <label>Color picker with addon:</label>
        <div class="input-group my-colorpicker2">
          <input type="text" class="form-control"/>
          <div class="input-group-addon">
            <i></i>
          </div>
        </div>
      </div>


      {/* TODO: Allow passing the InputGroup to allow className */}

      <div class="bootstrap-timepicker">
        <Input type="text" label="Time picker:" class="timepicker">
          <InputAddon right><Icon name="fa-clock-o"/></InputAddon>
        </Input>
      </div>

    </BoxBody>
  </Box>
const DatePickers_ = ({children, ...props }) => {
  return (
    <div class="box box-primary">
      <div class="box-header">
        <h3 class="box-title">Date picker</h3>
      </div>
      <div class="box-body">
        <div class="form-group">
          <label>Date:</label>
          <div class="input-group date">
            <div class="input-group-addon">
              <i class="fa fa-calendar"></i>
            </div>
            <input type="text" class="form-control pull-right" id="datepicker"/>
          </div>
        </div>

        <div class="form-group">
          <label>Date range:</label>
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-calendar"></i>
            </div>
            <input type="text" class="form-control pull-right" id="reservation"/>
          </div>
        </div>

        <div class="form-group">
          <label>Date and time range:</label>
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-clock-o"></i>
            </div>
            <input type="text" class="form-control pull-right" id="reservationtime"/>
          </div>
        </div>

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

      </div>
    </div>
  )
}
const DatePickers = ({children, ...props }) =>
  <Box context="primary" collapsable removable>
    <BoxHeader title="Date picker"/>
    <BoxBody>
      <div class="form-group">
        <label>Date:</label>
        <div class="input-group date">
          <div class="input-group-addon">
            <i class="fa fa-calendar"></i>
          </div>
          <input type="text" class="form-control pull-right" id="datepicker"/>
        </div>
      </div>

      <div class="form-group">
        <label>Date range:</label>
        <div class="input-group">
          <div class="input-group-addon">
            <i class="fa fa-calendar"></i>
          </div>
          <input type="text" class="form-control pull-right" id="reservation"/>
        </div>
      </div>

      <div class="form-group">
        <label>Date and time range:</label>
        <div class="input-group">
          <div class="input-group-addon">
            <i class="fa fa-clock-o"></i>
          </div>
          <input type="text" class="form-control pull-right" id="reservationtime"/>
        </div>
      </div>

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

    </BoxBody>
  </Box>
const IChecks_ = ({children, ...props }) => {
  return (
    <div class="box box-success">
      <div class="box-header">
        <h3 class="box-title">iCheck - Checkbox &amp; Radio Inputs</h3>
      </div>
      <div class="box-body">

        <div class="form-group">
          <label>
            <input type="checkbox" class="minimal" checked/>
          </label>
          <label>
            <input type="checkbox" class="minimal"/>
          </label>
          <label>
            <input type="checkbox" class="minimal" disabled/> Minimal skin checkbox
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="radio" name="r1" class="minimal" checked/>
          </label>
          <label>
            <input type="radio" name="r1" class="minimal"/>
          </label>
          <label>
            <input type="radio" name="r1" class="minimal" disabled/> Minimal skin radio
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" class="minimal-red" checked/>
          </label>
          <label>
            <input type="checkbox" class="minimal-red"/>
          </label>
          <label>
            <input type="checkbox" class="minimal-red" disabled/> Minimal red skin checkbox
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="radio" name="r2" class="minimal-red" checked/>
          </label>
          <label>
            <input type="radio" name="r2" class="minimal-red"/>
          </label>
          <label>
            <input type="radio" name="r2" class="minimal-red" disabled/> Minimal red skin radio
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" class="flat-red" checked/>
          </label>
          <label>
            <input type="checkbox" class="flat-red"/>
          </label>
          <label>
            <input type="checkbox" class="flat-red" disabled/> Flat green skin checkbox
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="radio" name="r3" class="flat-red" checked/>
          </label>
          <label>
            <input type="radio" name="r3" class="flat-red"/>
          </label>
          <label>
            <input type="radio" name="r3" class="flat-red" disabled/> Flat green skin radio
          </label>
        </div>
      </div>
      <div class="box-footer">
        Many more skins available. <a href="http://fronteed.com/iCheck/">Documentation</a>
      </div>
    </div>
  )
}
const IChecks = ({children, ...props }) =>
  <Box context="success" collapsable removable>
    <BoxHeader title="iCheck - Checkbox &amp; Radio Inputs"/>
    <BoxBody>
      <div class="form-group">
        <label>
          <input type="checkbox" class="minimal" checked/>
        </label>
        <label>
          <input type="checkbox" class="minimal"/>
        </label>
        <label>
          <input type="checkbox" class="minimal" disabled/> Minimal skin checkbox
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="radio" name="r1" class="minimal" checked/>
        </label>
        <label>
          <input type="radio" name="r1" class="minimal"/>
        </label>
        <label>
          <input type="radio" name="r1" class="minimal" disabled/> Minimal skin radio
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" class="minimal-red" checked/>
        </label>
        <label>
          <input type="checkbox" class="minimal-red"/>
        </label>
        <label>
          <input type="checkbox" class="minimal-red" disabled/> Minimal red skin checkbox
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="radio" name="r2" class="minimal-red" checked/>
        </label>
        <label>
          <input type="radio" name="r2" class="minimal-red"/>
        </label>
        <label>
          <input type="radio" name="r2" class="minimal-red" disabled/> Minimal red skin radio
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" class="flat-red" checked/>
        </label>
        <label>
          <input type="checkbox" class="flat-red"/>
        </label>
        <label>
          <input type="checkbox" class="flat-red" disabled/> Flat green skin checkbox
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="radio" name="r3" class="flat-red" checked/>
        </label>
        <label>
          <input type="radio" name="r3" class="flat-red"/>
        </label>
        <label>
          <input type="radio" name="r3" class="flat-red" disabled/> Flat green skin radio
        </label>
      </div>

    </BoxBody>
    <BoxFooter>
      Many more skins available. <a href="http://fronteed.com/iCheck/">Documentation</a>
    </BoxFooter>
  </Box>

// const Select2 = ({children, ...props }) => {
//   return (
//
//   )
// }

const legacyCode = () => {
  //Initialize Select2 Elements
  $('.select2').select2()

  //Datemask dd/mm/yyyy
  $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
  //Datemask2 mm/dd/yyyy
  $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
  //Money Euro
  $('[data-mask]').inputmask()

  //Date range picker
  $('#reservation').daterangepicker()
  //Date range picker with time picker
  $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
  //Date range as a button
  $('#daterange-btn').daterangepicker(
    {
      ranges   : {
        'Today'       : [moment(), moment()],
        'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month'  : [moment().startOf('month'), moment().endOf('month')],
        'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate  : moment()
    },
    function (start, end) {
      $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }
  )

  //Date picker
  $('#datepicker').datepicker({
    autoclose: true
  })

  //iCheck for checkbox and radio inputs
  $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass   : 'iradio_minimal-blue'
  })
  //Red color scheme for iCheck
  $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
    checkboxClass: 'icheckbox_minimal-red',
    radioClass   : 'iradio_minimal-red'
  })
  //Flat red color scheme for iCheck
  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass   : 'iradio_flat-green'
  })

  //Colorpicker
  $('.my-colorpicker1').colorpicker()
  //color picker with addon
  $('.my-colorpicker2').colorpicker()

  //Timepicker
  $('.timepicker').timepicker({
    showInputs: false
  })
}

class Page extends Component {
  title = 'Advanced Form Elements'
  tagLine = 'Preview'
  componentDidMount()  {
    console.log(`componentDidMount (${this.title})`)
    legacyCode()
  }
  componentDidUpdate() {
    console.log(`componentDidUpdate (${this.title})`)
    legacyCode()
  }
  render() {
    return (
      <Layout title={this.title} tagLine={this.tagLine}>
        <Row>
          <Col md="6">
            <Row>
              <ColorAndTimePickers/>
              <DatePickers/>
              <IChecks/>
            </Row>
          </Col>
          <Col md="6">
            <ColorAndTimePickers_/>
            <DatePickers_/>
            <IChecks_/>
          </Col>
        </Row>

        {/* WIP Above */}
        <Row>
          <Select2/>
        </Row>
        <Row>
          <Col md="6">
            <Row>
              <InputMasks/>
              <ColorAndTimePickers/>
            </Row>
          </Col>
          <Col md="6">
            <Row>
              <DatePickers/>
              <IChecks/>
            </Row>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Page

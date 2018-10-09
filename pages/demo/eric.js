import React from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'

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

class Page extends React.Component {
  title = 'The Page Title'
  tagLine = 'Tag Line'
  // static async getInitialProps() {
  //   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  //   const data = await res.json()
  //   console.log(`Show data fetched. Count: ${data.length}`)
  //   return {shows: data}
  // }
  constructor() {
    super()

    this.clickHandler = this.clickHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)

    this.state = {
      componentType: {
        id: null,
        name: null,
        category: null,
        version: null
      },
      componentTypes: []
    }
  }
  componentDidMount() {
    console.log(`componentDidMount (${this.title})`);
    this.componentTypeRead()
  }
  componentDidUpdate() {
    console.log(`componentDidUpdate (${this.title})`);
  }

  componentTypeRead() {
    return axios.get('/api/componentType')
      .then((res) => {
        console.log({res});
        if (window) { window.res = res }
        this.setState({...this.state, componentTypes: res.data})
      })
      .catch((err) => {
        console.log({err});
      })
  }
  componentTypeCreate(componentType) {
    console.log({f: 'componentTypeCreate', componentType});
    return axios.post('/api/componentType', componentType)
      .then((res) => {
        console.log({res});
        return this.componentTypeRead()
      })
      .catch((err) => {
        console.log({err});
      })
  }
  componentTypeUpdate(componentType) {}
  componentTypeDelete(componentType) {}
  componentTypeClear() {
    const stateNew = {...this.state}

    Object.keys(stateNew['componentType']).map((key) => {
      stateNew['componentType'][key] = null
    })

    console.log({f: 'componentTypeClear', stateNew});

    this.setState(stateNew)
  }
  componentTypeSelected(componentType) {
    const stateNew = {...this.state, componentType}
    console.log({f: 'componentTypeSelected', stateNew});
    this.setState(stateNew)
  }


  clickHandler = (modelName, model, action) => (element) => {
    const key = element.target.id
    const value = element.target.value

    console.log({
      element,
      key,
      value,

      action,
      model
    });

    switch (action || value) {
      case 'create':
        return modelName == 'componentType' ? this.componentTypeCreate(model).then(() => this.componentTypeClear()) : null
      case 'update':
        break;
      case 'delete':
        break;
      case 'clear':
        return modelName == 'componentType' ? this.componentTypeClear() : null
      case 'selected':
        return modelName == 'componentType' ? this.componentTypeSelected(model) : null
    }
  }

  changeHandler = (modelName, columnName) => (element) => {
    const key = element.target.id
    const value = element.target.value

    const stateNew = {...this.state}
    stateNew[modelName][columnName] = element.target.value

    // console.log({
    //   state: this.state,
    //   stateNew,
    //   element,
    //   key,
    //   value,
    //
    //   modelName,
    //   columnName
    // });

    this.setState(stateNew)
  }

  render() {
    const componentType = this.state.componentType
    const componentTypeColumns = Object.keys(componentType)
    const componentTypes = this.state.componentTypes
    const componentTypesColumns = componentTypes && componentTypes.length ? Object.keys(componentTypes[0]) : []

    console.log({componentType, componentTypeColumns, componentTypes, componentTypesColumns});

    return (
      <Layout title="Eric's Test Page" tagLine="My Tests">
        <Row>
          <Box context="success">
            <BoxHeader>Add</BoxHeader>
            <BoxBody>
              {componentTypeColumns.map((componentTypeColumn) =>
                <Input
                  type="text"
                  id={componentTypeColumn}
                  label={componentTypeColumn}
                  value={componentType[componentTypeColumn] || ''}
                  onChange={this.changeHandler('componentType', componentTypeColumn)} />
              )}
            </BoxBody>
            <BoxFooter>
              <Button id="create" label="Create" context="success" onClick={this.clickHandler('componentType', componentType)} value="create" class="pull-right" />
              <Button id="update" label="Update" context="warning" onClick={this.clickHandler('componentType', componentType)} value="update" class="pull-right" />
              <Button id="delete" label="Delete" context="danger" onClick={this.clickHandler('componentType', componentType)} value="delete" class="pull-right" />
              <Button id="clear" label="Clear" context="info" onClick={this.clickHandler('componentType', componentType)} value="clear"/>
            </BoxFooter>
          </Box>
          <Box context="primary">
            <BoxHeader>Data</BoxHeader>
            <BoxBody>
              {componentTypes && componentTypes.length &&
                  <table class="table table-bordered table-condensed table-hover">
                    <thead>
                      <tr>
                        {componentTypesColumns.map((componentTypesColumn) => <th key={componentTypesColumn}>{componentTypesColumn}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {componentTypes.map((componentType, componentTypeKey) =>
                        <tr key={componentTypeKey} onClick={this.clickHandler('componentType', componentType, 'selected')}>
                          {componentTypesColumns.map((componentTypesColumn, componentTypesColumnKey) => <td key={`${componentTypeKey}-${componentTypesColumnKey}`}>{componentType[componentTypesColumn]}</td>)}
                        </tr>
                      )}
                    </tbody>
                  </table>
                  || null
                }
            </BoxBody>
            <BoxFooter>
              My Footer
            </BoxFooter>
          </Box>

        </Row>
      </Layout>)
  }
}

export default Page

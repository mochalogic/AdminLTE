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

const componentTypeVM = {
  id: {
    title: 'ID',
    description: 'The Name',
    isReadonly: true,
    isHidden: false,
  },
  name: {
    title: 'Name',
    description: 'The Name',
    isReadonly: false,
    isHidden: false,
  },
  category: {
    title: 'Category',
    description: 'The Category',
    isReadonly: false,
    isHidden: false,
  },
  version: {
    title: 'Version',
    description: 'The Version',
    isReadonly: false,
    isHidden: false,
  },
  createdAt: {
    title: 'Created On',
    description: 'The Version',
    isReadonly: true,
    isHidden: false,
  },
  updatedAt: {
    title: 'Updated On',
    description: 'The Version',
    isReadonly: true,
    isHidden: false,
  }
}

const localStorageRepo = (key, value) => value ? localStorage.setItem(key, JSON.stringify(value)) : JSON.parse(localStorage.setItem(key))

class Page extends React.Component {
  title = 'The Page Title'
  tagLine = 'Tag Line'
  ls = []
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
        // name: null,
        // category: null,
        // version: null
      },
      componentTypes: []
    }
  }
  componentDidMount() {
    console.log(`componentDidMount (${this.title})`);
    this.ls = localStorage
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
  componentTypeUpdate(componentType) {
    console.log({f: 'componentTypeUpdate', componentType});
    return new Promise(
      (resolve, reject) => {
        if (!componentType.id) reject('ID Missing')
        resolve(componentType.id)
      })
      .then((id) => {
        console.log({id});
        const componentTypeUpdate = {...componentType}
        return axios.put(`/api/componentType/${id}`, componentTypeUpdate)
      })
      .then((res) => {
        console.log({res});
        return this.componentTypeRead()
      })
  }
  componentTypeDelete(componentType) {
    console.log({f: 'componentTypeDelete', componentType});

    return new Promise(
      (resolve, reject) => {
        if (!componentType.id) reject('ID Missing')
        resolve(componentType.id)
      })
      .then((id) => {
        console.log({id});
        const componentTypeUpdate = {...componentType}
        return axios.delete(`/api/componentType/${id}`)
      })
      .then((res) => {
        console.log({res});
        return this.componentTypeRead()
      })
  }
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
        return modelName == 'componentType' ? this.componentTypeUpdate(model).then(() => this.componentTypeClear()).catch((e) => console.log({f: 'catch', e})) : null
      case 'delete':
        return modelName == 'componentType' ? this.componentTypeDelete(model).then(() => this.componentTypeClear()) : null
      case 'clear':
        return modelName == 'componentType' ? this.componentTypeClear() : null
      case 'selected':
        return modelName == 'componentType' ? this.componentTypeSelected(model) : null
      case 'refresh':
        return this.componentTypeRead()
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
    const componentTypeSelected = this.state.componentType
    const componentTypes = this.state.componentTypes
    // const keyValue(componentTypeVM) = componentTypes &&vm ? Object.keys(componentTypes[0]) : []

    const keyValue = (obj) => Object.keys(obj).map(key => {return {key, value: obj[key]}})

    console.log({componentType, componentTypes, componentTypeVM});

    const ls = this.ls

    return (
      <Layout title="Eric's Test Page" tagLine="My Tests">
        <style jsx global>{`
          div button:not(:first-child) {
            margin-left: 10px;
          }
        `}</style>
        <Row>
          <Box context="success">
            <BoxHeader>Add</BoxHeader>
            <BoxBody>
              {keyValue(componentTypeVM)
                .filter(filter => !filter.value.isReadonly)
                .map((column) =>
                  <Input
                    type="text"
                    key={column.key}
                    id={column.key}
                    label={column.value.title}
                    value={componentType[column.key] || ''}
                    onChange={this.changeHandler('componentType', column.key)} />
                )
              }
            </BoxBody>
            <BoxFooter>
              <Button id="clear" label="Clear" context="info" onClick={this.clickHandler('componentType', componentType)} value="clear"/>
              <Button id="refresh" label="Refresh" context="default" onClick={this.clickHandler('componentType', componentType)} value="refresh"/>
              {componentType.id && <Button id="update" label="Update" context="warning" onClick={this.clickHandler('componentType', componentType)} value="update" class="pull-right" />}
              {componentType.id && <Button id="delete" label="Delete" context="danger" onClick={this.clickHandler('componentType', componentType)} value="delete" class="pull-right" />}
              {!componentType.id && <Button id="create" label="Create" context="success" onClick={this.clickHandler('componentType', componentType)} value="create" class="pull-right" />}
            </BoxFooter>
          </Box>
          <Box context="primary">
            <BoxHeader>Data</BoxHeader>
            <BoxBody>
              {componentTypes && componentTypes.length &&
                  <table class="table table-bordered table-condensed table-hover">
                    <thead>
                      <tr>
                        {keyValue(componentTypeVM)
                          .filter(filter => !filter.value.isHidden)
                          .map((vm) => <th key={vm.key}>{vm.value.title}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {componentTypes.map((componentType, componentTypeKey) =>
                        <tr key={componentTypeKey} onClick={this.clickHandler('componentType', componentType, 'selected')} class={componentType === componentTypeSelected ? 'success' : ''}>
                          {keyValue(componentTypeVM)
                            .filter(filter => !filter.value.isHidden)
                            .map((vm) => <td key={`${componentTypeKey}-${vm.key}`}>{componentType[vm.key]}</td>)}
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
          <Box context="primary">
            <BoxHeader>LocalStorage Viewer</BoxHeader>
            <BoxBody>
                  <table class="table table-bordered table-condensed table-hover">
                    <thead>
                      <tr>Key</tr>
                      <tr>Value</tr>
                    </thead>
                    <tbody>
                      {keyValue(ls).map(kv =>
                        <tr>
                          <td>{kv.key}</td>
                          <td>{kv.value}</td>
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

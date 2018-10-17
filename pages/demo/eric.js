import React from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import {connect} from 'react-redux'


import {componentType} from '../../redux/reducers'


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
    isHidden: true,
  },
  updatedAt: {
    title: 'Updated On',
    description: 'The Version',
    isReadonly: true,
    isHidden: true,
  }
}

const localStorageRepo = (key, value = undefined) => value ? localStorage.setItem(key, JSON.stringify(value)) : JSON.parse(localStorage.getItem(key))

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchs: {
      componentType: componentType.dispatchs(dispatch)
    }
  }
}

const mapStateToProps = (state) => {
  // console.log({f: 'mapStateToProps', state})
  return state
  // return {componentType: state.componentType}
}

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
  constructor(props) {
    super(props)

    this.clickHandler  = this.clickHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)

    this.componentTypeClickHandler  = this.clickHandler(componentType.name).bind(this)
    this.componentTypeChangeHandler = this.changeHandler(componentType.name).bind(this)

    // this.state = {}
  }
  componentDidMount() {
    // console.log(`componentDidMount (${this.title})`);
    this.props.dispatchs.componentType.init()

    this.ls = localStorage

    const apiCaller = localStorageRepo('apiCaller')
    console.log({apiCaller});
    this.setState({...this.state, apiCaller})

    this.loading = false
  }
  componentDidUpdate() {
    // console.log(`componentDidUpdate (${this.title})`);
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
  // componentTypeSelected(componentType) {
  //   const stateNew = {...this.state, componentType}
  //   console.log({f: 'componentTypeSelected', stateNew});
  //   this.setState(stateNew)
  // }

  clickHandler = reducerName => (model, action) => ({target: {id, value, ...target}, ...element}) => {
    // const id = element.target.id
    // const value = element.target.value

    console.log({element, id, value, action, model});

    if (reducerName == componentType.name) {
      switch (action || value) {
        case 'saveAll':   break
        case 'cancelAll': break

        case 'save':      return this.props.dispatchs.componentType.save()
        case 'delete':      return this.props.dispatchs.componentType.delete()
        case 'copy':      return this.props.dispatchs.componentType.copy()
        case 'new':       return this.props.dispatchs.componentType.new()
        case 'cancel':    return this.props.dispatchs.componentType.cancel()
        case 'active':    return this.props.dispatchs.componentType.active(model)
        case 'select':    return this.props.dispatchs.componentType.select(model)
        case 'clear':     return this.props.dispatchs.componentType.clear()
        case 'list':      return this.props.dispatchs.componentType.list()
      }
    }

  }

  changeHandler = reducerName => columnName => ({target: {id, value, ...target}, ...element}) => {
    // const id = element.target.id
    // const value = element.target.value

    // console.log('changeHandler', {id, value, target, element});

    if (reducerName == componentType.name) {
      this.props.dispatchs.componentType.edit({column: id, value})
    }
  }

  render() {
    const keyValue = (obj) => Object.keys(obj).map(key => {return {key, value: obj[key]}})

    const componentType = this.props.componentType
    const rows = keyValue(componentType.muons)

    console.log('eric:render', {
      muons: this.props.componentType.muons,
      state: this.state,
      props: this.props,
      componentTypeVM,
      rows,
    });

    const ls = this.ls



    const ComponentTypeList = () => (
      <Box context="primary" xs="6">
        <BoxHeader>Data</BoxHeader>
        <BoxBody>
          <table class="table table-bordered table-condensed table-hover">
            <thead>
              <tr>
                {keyValue(componentTypeVM)
                  .filter(filter => !filter.value.isHidden)
                  .map((col) => <th key={col.key}>{col.value.title}</th>)}
              </tr>
            </thead>
            {rows.length
              &&
                <tbody>
                  {rows.map((row) =>
                    <tr key={row.key}
                        onClick={this.componentTypeClickHandler(row.value, 'active')}
                        class={false
                            || row.value.isNew && 'success'
                            || row.value.isDirty && 'warning'
                            || row.key == componentType.active && 'info'
                            || row.value.isSelected && 'active'
                            || ''}
                        >
                      {keyValue(componentTypeVM)
                        .filter(filter => !filter.value.isHidden)
                        .map((col) => <td key={`${row.key}-${col.key}`}>{row.value.current[col.key]}</td>)}
                    </tr>
                  )}
                </tbody>
              ||
                <tbody>
                  <tr>
                    <td colSpan={keyValue(componentTypeVM).filter(filter => !filter.value.isHidden).length}><strong>No Records Found</strong></td>
                  </tr>
                </tbody>
            }
            </table>
        </BoxBody>
        <BoxFooter>
          <Button id="list" label="List" context="primary" onClick={this.componentTypeClickHandler()} value="list"/>
          <Button id="clear" label="Clear" context="danger" onClick={this.componentTypeClickHandler()} value="clear"/>
          {rows.some(rows => rows.value.isDirty) &&
            <>
              <Button id="saveAll" label="Save All" context="success" onClick={this.componentTypeClickHandler()} value="saveAll" class="pull-right"/>
              <Button id="cancelAll" label="Cancel All" context="default" onClick={this.componentTypeClickHandler()} value="cancelAll" class="pull-right"/>
            </>
          }
        </BoxFooter>
      </Box>
    )

    const ComponentTypeEntity = (
      <Box context="success" xs="6">
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
                readOnly={!componentType.active && 'readonly'}
                value={componentType.active && componentType.muons[componentType.active].current[column.key] || ''}
                onChange={this.componentTypeChangeHandler()} />
            )
          }
        </BoxBody>
        <BoxFooter>
          {componentType.active
            && <Button id="cancel" label="Cancel" context="default" onClick={this.componentTypeClickHandler()} value="cancel"/>}
          {componentType.active
            && componentType.active != 'NEW'
            && <Button id="remove" label="Remove" context="danger" onClick={this.componentTypeClickHandler()} value="remove"/>}


          {!componentType.active && <Button id="new" label="New" context="success" onClick={this.componentTypeClickHandler()} value="new" class="pull-right"/>}
          {componentType.active && <Button id="save" label="Save" context="success" onClick={this.componentTypeClickHandler()} value="save" class="pull-right"/>}
          {componentType.active
            && componentType.active != 'NEW'
            && <Button id="copy" label="Copy" context="warning" onClick={this.componentTypeClickHandler()} value="copy" class="pull-right"/>}

          {/*
          {componentType.selected.id && <Button id="update" label="Update" context="warning" onClick={this.clickHandler('componentType', componentType.selected)} value="update" class="pull-right" />}
          {componentType.selected.id && <Button id="delete" label="Delete" context="danger" onClick={this.clickHandler('componentType', componentType.selected)} value="delete" class="pull-right" />}
          {!componentType.selected.id && <Button id="create" label="Create" context="success" onClick={this.clickHandler('componentType', componentType.selected)} value="create" class="pull-right" />}
           */}
        </BoxFooter>
      </Box>
    )

    const LocalStorageViewer = () => (
      <Box context="primary">
        <BoxHeader>LocalStorage Viewer</BoxHeader>
        <BoxBody>
          <table class="table table-bordered table-condensed table-hover">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {keyValue(ls).map((kv, k) =>
                <tr key={k}>
                  <td>{kv.key}</td>
                  <td>{kv.value}</td>
                </tr>
              )}
            </tbody>
          </table>
        </BoxBody>
        <BoxFooter>
          My Footer
        </BoxFooter>
      </Box>
    )

    return (
      <Layout title="Eric's Test Page" tagLine="My Tests">
        <style jsx global>{`
          div button:not(:first-child) {
            margin-left: 10px;
          }
        `}</style>
        <Row>
          <ComponentTypeList/>
          {ComponentTypeEntity}
          <LocalStorageViewer/>
        </Row>
      </Layout>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)




{/*
<Box context="success" xs="6">
  <BoxHeader>Entry Points</BoxHeader>
  <BoxBody>
    {this.props.count}
  </BoxBody>
  <BoxFooter>
    <table class="table table-bordered table-condensed table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Method</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>

    <Input type="text" label="Name" value={this.state.entryPoint && this.state.entryPoint.name} onChange={this.changeHandler('entryPoint', 'name')}>
      <InputButton right>
        <Button id="create" label="Create" context="success" onClick={this.clickHandler('entryPoint')} value="create" class="pull-right" />
      </InputButton>
    </Input>
  </BoxFooter>
</Box>

<Box context="success" xs="6">
  <BoxHeader>API Caller</BoxHeader>
  <BoxBody>
    <Input type="text" label="URL" />
    <Input type="text" label="Header" />
    <Input type="text" label="Parameter: Name" />
    <Input type="textarea" label="JSON" rows="10" />
  </BoxBody>
  <BoxFooter>
    <Button id="reduxTest" label="reduxTest" context="warning" onClick={this.clickHandler('reduxTest')} value="reduxTest" class="pull-right" />
  </BoxFooter>
</Box>
 */}

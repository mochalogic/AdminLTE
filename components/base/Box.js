import library, {typeMatch} from '../library.js'
import Icon from './Icon'
import {Row, Col} from './Grid'

//BoxSmall
//BoxInfo
//BoxWidget

export const Box = ({
    children,
    //Types
    small = false,
    info = false,
    widget = false,
    //Behavior
    collapsable = false,
    collapsed = false,
    removable = false,
    loading = false,

    title = null,
    tagline = null,
    value = null,

    className = null,
    bg = null,
    solid = false,
    context = null,

    ...props
  }) => {
  className = className ? [className] : [];

  // Child Controls
  let box = null;
  let boxHeader = null; //Only One!
  let boxToolbox = [];
  let boxBody = [];
  let boxProgress = null; //Only One!
  let boxFooter = null; //Only One!
  let icon = null;

  const ch = React.Children.toArray(children);
  console.log({ch});

  const matchChild = (children, type) => children.reduce((acc, child) => {
    (typeMatch(child, type)) ? acc.children.push(child) : acc.remainder.push(child)
    return acc;
  }, {children: [], remainder: []})

  const ret = matchChild(ch, BoxHeader)
  console.log({ret});

  React.Children.forEach(
    children,
    (child) => {
      switch (true) {
        case typeMatch(child, Icon):
          icon = child; //Only One!
          break;
        case typeMatch(child, BoxHeader):
          boxHeader = child; //Only One!
          break;
        case typeMatch(child, BoxTool):
          boxToolbox.push(child);
          break;
        case typeMatch(child, BoxBody):
          boxBody.push(child);
          break;
        case typeMatch(child, BoxProgress):
          boxProgress = child;
          break;
        case typeMatch(child, BoxFooter):
          boxFooter = child; //Only One!
          break;
      }
    }
  )

  switch (true) {
    case small:
      className.push('small-box')
      if (bg) { className.push(`bg-${bg}`)}

      if (icon) icon = <div class="icon">{icon}</div>

      if (boxFooter) boxFooter = <a href="#" class="small-box-footer">{boxFooter} <Icon name="fa-arrow-circle-right"/></a>

      box = (
        <div class={className.join(' ')}>
          <div class="inner">
            <h3>{boxBody}</h3>
            <p>{boxHeader.props.title || boxHeader}</p>
          </div>
          {icon}
          {boxFooter}
        </div>)
      break;
    case info:
      className.push('info-box')
      if (bg) { className.push(`bg-${bg}`)}

      // console.log({f: 'box', boxProgress, icon, p: icon && icon.props});

      if (boxProgress) {
        boxProgress = <>
          <div class="progress"><div class="progress-bar" style={{width: `${boxProgress.props.value}%`}}></div></div>
          <span class="progress-description">{boxProgress.props.description}</span>
        </>
      }

      if (icon) icon = <span class={`info-box-icon ${icon.props.bg && `bg-${icon.props.bg}`}`}>{icon}</span>

      box = (
        <div class={className.join(' ')}>
          {icon}
          <div class="info-box-content">
            <span class="info-box-text">{boxHeader.props.title || boxHeader}</span>
            <span class="info-box-number">{boxBody}</span>
            {boxProgress}
          </div>
        </div>)
      break;
    case widget:
      className.push('box')
      className.push('box-widget')

      box = (
        <div class={className.join(' ')}>
          {boxHeader}
          {React.Children.map(boxBody, (item) => <div class={'box-body ' + (item.props && item.props.className)}>{item}</div> )}
          {boxFooter}
        </div>
      )

      break;
    default:
      className.push('box')

      if (context) className.push(`box-${context}`)
      if (solid) className.push(`box-solid`)

      // See AdminLTE/.../build/js/BoxWidget.js
      if (collapsable) {
        if (collapsed) className.push('collapsed-box')
        const collapsableIcon = collapsed ? <Icon name="fa-plus"/> : <Icon name="fa-minus"/>
        boxToolbox.push(<button type="button" class="btn btn-box-tool" data-widget="collapse" key="collapsable">{collapsableIcon}</button>)
      }

      if (removable) {
        boxToolbox.push(<button type="button" class="btn btn-box-tool" data-widget="remove" key="removable"><Icon name="fa-times"/></button>)
      }

      if (loading) {
        loading = <div class="overlay"><Icon name="fa-refresh fa-spin"/></div>
      }

      if (boxHeader) {
        const boxHeaderClass = ['box-header']
        if (boxHeader.props.bordered) boxHeaderClass.push('with-border')
        if (boxHeader.props.className) boxHeaderClass.push(boxHeader.props.className)

        boxHeader = (
          <div class={boxHeaderClass.join(' ')}>
            {(boxHeader.props.title && <h3 class="box-title">{boxHeader.props.title}</h3>) || boxHeader}
            {boxToolbox && <div class="box-tools pull-right">{boxToolbox}</div>}
          </div>
        )
      }

      if (boxFooter) {
        const boxFooterClass = ['box-footer']
        if (boxFooter.props.className) boxFooterClass.push(boxFooter.props.className)

        boxFooter = <div class={boxFooterClass.join(' ')}>{boxFooter}</div>
      }

      box = (
        <div class={className.join(' ')}>
          {boxHeader}
          {React.Children.map(boxBody, (item) => <div class={'box-body ' + (item.props && item.props.className)}>{item}</div> )}
          {boxFooter}
          {loading}
        </div>
      )
  }

  return <Col {...props}>{box}</Col>
}
export const BoxHeader = ({children, title, tagLine, icon, ...props}) => <>{children}</>
export const BoxTool = ({children, ...props}) => <>{children}</>
export const BoxBody = ({children, ...props}) => <>{children}</>
export const BoxFooter = ({children, ...props}) => <>{children}</>
export const BoxProgress = ({value, description = null, ...props}) => <></>

export default {
  Box,
  BoxHeader,
  BoxTool,
  BoxBody,
  BoxFooter,
  BoxProgress,
}

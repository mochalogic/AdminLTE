import React, {Component} from 'react'

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
} from '../'

export const isArray = (test) => Array.isArray(test)
export const isTrue = (test) => test || false;
export const isDefined = (test) => test !== undefined
export const isNull = (test) => test === null
export const isNaN = (test) => test === NaN
export const isEmpty = (test) => !isDefined(test) || isNull(test) || isNaN(test) || test === ''
export const cloneFirst = (elements, additionalProps = {}) => isArray(elements) && elements.length ? React.cloneElement(elements[0], additionalProps) : null

export const FormGroup = ({children, success, warning, error, wrapInFormGroup = true, ...props}) => {
  //NOTE: Additional props are passed to each child. Can pass 'name' for radio buttons
  children = wrapInFormGroup
    ? React.Children.map(children, child => React.cloneElement(child, {wrapInFormGroup: false, ...props}))
    : children

  const formGroupClass = builder('form-group')
    .append('has-success', isTrue(success))
    .append('has-warning', isTrue(warning))
    .append('has-error', isTrue(error))
    .toClassName()

  return <div {...formGroupClass}>{children}</div>
}

//TODO: Grid.Col should be using this const
export const gridBuilder = (lg = null, md = null, sm = null, xs = null, lgOffset = null, mdOffset = null, smOffset = null, xsOffset = null) => {
  const gridBuilderWrapper = {
    value: {
      lg,
      md,
      sm,
      xs,
      lgOffset,
      mdOffset,
      smOffset,
      xsOffset
    },
    clone: () => {
      const clone = gridBuilder() //Creates new instance
      clone.value = Object.assign({}, gridBuilderWrapper.value) //Clones previous instance values (is recursiveable because this instance could be a clone)
      return clone
    },
    generateOffset: (swapOffset = false) => {
      const clone = gridBuilderWrapper.clone()
      clone.value.lgOffset = clone.value.lg ? 12 - clone.value.lg : null
      clone.value.mdOffset = clone.value.md ? 12 - clone.value.md : null
      clone.value.smOffset = clone.value.sm ? 12 - clone.value.sm : null
      clone.value.xsOffset = clone.value.xs ? 12 - clone.value.xs : null

      return clone
    },
    swapOffset: () => {
      const clone = gridBuilderWrapper.clone()
      lg = clone.value.lg
      md = clone.value.md
      sm = clone.value.sm
      xs = clone.value.xs
      clone.value.lg = clone.value.lgOffset
      clone.value.md = clone.value.mdOffset
      clone.value.sm = clone.value.smOffset
      clone.value.xs = clone.value.xsOffset
      clone.value.lgOffset = lg
      clone.value.mdOffset = md
      clone.value.smOffset = sm
      clone.value.xsOffset = xs
      return clone
    },
    invert: () => {
      const clone = gridBuilderWrapper.clone()
      clone.value.lg = clone.value.lg ? 12 - clone.value.lg : null
      clone.value.md = clone.value.md ? 12 - clone.value.md : null
      clone.value.sm = clone.value.sm ? 12 - clone.value.sm : null
      clone.value.xs = clone.value.xs ? 12 - clone.value.xs : null
      clone.value.lgOffset = clone.value.lgOffset ? 12 - clone.value.lgOffset : null
      clone.value.mdOffset = clone.value.mdOffset ? 12 - clone.value.mdOffset : null
      clone.value.smOffset = clone.value.smOffset ? 12 - clone.value.smOffset : null
      clone.value.xsOffset = clone.value.xsOffset ? 12 - clone.value.xsOffset : null

      return clone
    },
    hasValue: () => ((lg || md || sm || xs) && true) || false,
    toClassName: (asClassNameObject) => {
      const className = Object
        .keys(gridBuilderWrapper.value)
        .reduce(
          (acc, key) => gridBuilderWrapper.value[key] ? acc.push(`col-${key}-${gridBuilderWrapper.value[key]}`) && acc : acc,
          [])
          .join(' ')
          .replace('Offset', '-offset')
      return asClassNameObject ? {className} : className
    }
  }
  return gridBuilderWrapper
}

export const Input = (
  {
    children,
    type, id,
    label, placeholder, help,
    // value, disabled, checked // Pass Down by Defualt
    small, large,
    lg, md, sm, xs,
    success, warning, error,
    horizontal,
    wrapInFormGroup = true,
    ...props
  }) => {
  children = React.Children.toArray(children);
  var {match: inputGroups = [], children} = matchChild(children, [InputAddon, InputButton])
  var {match: inputLabels = [], children} = matchChild(children, InputLabel)
  var {match: inputHelps = [], children} = matchChild(children, InputHelp)

  const inputGrid = gridBuilder(lg, md, sm, xs)
  // console.log({
  //   hasValue: inputGrid.hasValue(),
  //   invert: inputGrid.invert().value,
  //   inputGrid: inputGrid.value,
  //   generateOffset: inputGrid.generateOffset().value,
  //   swapOffset: inputGrid.swapOffset().value,
  //   generateOffsetSwapOffset: inputGrid.generateOffset().swapOffset().value,
  //   inputGrid2: inputGrid.value,
  // });
  let formGroup

  if (type === 'checkbox' || type === 'radio') {
    // Label
    label = (inputLabels.length && inputLabels[0].props.children) || label

    // Help Block
    const inputHelp = cloneFirst(inputHelps) || (help) && <InputHelp>{help}</InputHelp>

    // Input
    // Radio 'name' will get passed as props
    const input = <div class={type}><label><input {...props} type={type} id={id}/> {label}{inputHelp}</label></div>

    // Input Group
    const inputGroup = input

    // Horizontal Group (Input Group & Help Block)
    const horizontalClass = horizontal ? inputGrid.generateOffset().swapOffset().toClassName(true) : null
    const horizontalGroup = horizontalClass
      ? <div {...horizontalClass}>{inputGroup}</div>
      : <>{inputGroup}</>

    // Form Group
    formGroup = horizontalGroup
  } else {
    // Label
    const inputLabel = cloneFirst(inputLabels, {id, horizontal, ...inputGrid.value}) || (label && <InputLabel {...{id, horizontal, ...inputGrid.value}}>{label}</InputLabel>)

    // Help Block
    const inputHelp = cloneFirst(inputHelps) || (help) && <InputHelp>{help}</InputHelp>

    // Input
    const inputClass = builder()
      .append('form-control', (type !== 'file'))
      .append('input-sm', isTrue(small))
      .append('input-lg', isTrue(large))
      .toClassName()
    let input
    switch (type) {
      case 'textarea':
        input = <textarea {...props} {...inputClass} type={type} id={id} placeholder={placeholder}></textarea>
        break;
      case 'select':
        input = <select {...props} {...inputClass} id={id}>{children}</select>
        break;
      default:
        input = <input {...props} {...inputClass} type={type} id={id} placeholder={placeholder}></input>
    }

    // Input Group
    const inputGroupClass = builder()
      .append('input-group', inputGroups.length)
      .append('input-group-sm', isTrue(inputGroups.length && small))
      .append('input-group-lg', isTrue(inputGroups.length && large))
      .toClassName()
    const inputGroup = inputGroups.length
      ? <div {...inputGroupClass}>
          {inputGroups.filter((inputGroup) => !inputGroup.props.right)}
          {input}
          {inputGroups.filter((inputGroup) => inputGroup.props.right)}
        </div>
      : input

    // If sized and not horizontal
    //NOTE: SHUNT
    if (inputGrid.hasValue() && !horizontal) return <Col {...inputGrid.value}>{inputGroup}</Col>

    // Horizontal Group (Input Group & Help Block)
    const horizontalClass = horizontal ? inputGrid.invert().toClassName(true) : null
    const horizontalGroup = horizontalClass
      ? <div {...horizontalClass}>{inputGroup}{inputHelp}</div>
      : <>{inputGroup}{inputHelp}</>

    // Form Group
    formGroup = <>{inputLabel}{horizontalGroup}</>
  }

  return (wrapInFormGroup)
    ? <FormGroup {...{success, warning, error}} wrapInFormGroup={false}>{formGroup}</FormGroup>
    : formGroup

}
export const InputLabel = ({children, id, horizontal, lg, md, sm, xs, ...props}) => {
  const labelClass = builder('control-label')
    .append(`col-lg-${lg}`, isTrue(horizontal && lg))
    .append(`col-md-${md}`, isTrue(horizontal && md))
    .append(`col-sm-${sm}`, isTrue(horizontal && sm))
    .append(`col-xs-${xs}`, isTrue(horizontal && xs))
    .toClassName()

  return <label for={id} {...labelClass}>{children}</label>
}
export const InputHelp = ({children, ...props}) => <p class="help-block">{children}</p>
export const InputAddon = ({children, value, right = false, ...props}) => <div class="input-group-addon">{children || value}</div>
export const InputButton = ({children, value, right = false, ...props}) => <div class="input-group-btn">{children || value}</div>

export const Button = ({children, id, context, label, submit, className, right, flat, toggle, ...props}) => {
  const buttonClass = ['btn']
  if (context) buttonClass.push(`btn-${context}`)
  if (right) buttonClass.push('pull-right')
  if (flat) buttonClass.push('btn-flat')
  if (toggle) buttonClass.push('dropdown-toggle')
  if (className) buttonClass.push(className)

  const type = submit ? 'submit' : 'button'

  return <button class={buttonClass.join(' ')} type={type} id={id} data-toggle={toggle && 'dropdown'}>{children || label}{toggle && <Icon name="fa-caret-down"/>}</button>
}

export const Form = ({children, horizontal, lg, md, sm, xs, ...props}) => {
  children = React.Children.toArray(children)
  const formClass = builder()
    .append('form-horizontal', isTrue(horizontal))
    .toClassName()

  if (horizontal && !(lg || md || sm || xs)) xs = 2 // Default to xs = 2 if lg, md, sm or xs DNE

  return <form {...formClass}>{children.map(child => React.cloneElement(child, {horizontal, lg, md, sm, xs}))}</form>
}

export const H = ({children, title, h1, h2, h3, h4, h5, h6, margin, ...props}) => {
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

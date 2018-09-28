import library, {typeMatch, matchChild} from './library.js'

import {Row, Col} from './base/Grid'
import Icon from './base/Icon';
import {Box, BoxHeader, BoxTool, BoxBody, BoxProgress, BoxFooter} from './base/Box'


const Percentage = ({value}) => <span>{value}<sup style={{fontSize: '20px'}}>%</sup></span>

const imgRoot = '/adminlte/'
const Image = ({title, src, className, ...props}) => (<img class={className} src={`${imgRoot}${src}`} alt={title}/>)
const Badge = ({children, tooltip, bg, className, value}) => {
  className = className ? [className] : []
  className.push('badge');
  if (bg) className.push(`bg-${bg}`)
  if (!value) value = children

  return (<span data-toggle="tooltip" title={tooltip} class={className.join(' ')}>{value}</span>)
}

export {
  library, typeMatch, matchChild,

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
}

export const Row = ({children, lg, md, sm, xs, className, ...props}) => {
  const rowClass = ['row']
  if (className) rowClass.push(className)

  const row = <div class={rowClass.join(' ')}>{children}</div>

  return (lg || md || sm || xs) ? <Col lg={lg} md={md} sm={sm} xs={xs}>{row}</Col> : row
}

export const Col = ({children, lg, md, sm, xs, lgOffset, mdOffset, smOffset, xsOffset, className, ...props}) => {

  className = className ? [className] : []
  if (lg) { className.push(`col-lg-${lg}`) }
  if (md) { className.push(`col-md-${md}`) }
  if (sm) { className.push(`col-sm-${sm}`) }
  if (xs) { className.push(`col-xs-${xs}`) }
  if (lgOffset) { className.push(`col-lg-offset-${lgOffset}`) }
  if (mdOffset) { className.push(`col-md-offset-${mdOffset}`) }
  if (smOffset) { className.push(`col-sm-offset-${smOffset}`) }
  if (xsOffset) { className.push(`col-xs-offset-${xsOffset}`) }
  if (className.length == 0) { className.push('col-xs-12') }
  return <div class={className.join(' ')}>{children}</div>
}

export default {
  Row,
  Col
}

export const Row = ({children}) => <div class="row">{children}</div>

export const Col = ({children, lg, md, sm, xs, className, ...props}) => {
  className = className ? [className] : []
  if (lg) { className.push(`col-lg-${lg}`) }
  if (md) { className.push(`col-md-${md}`) }
  if (sm) { className.push(`col-sm-${sm}`) }
  if (xs) { className.push(`col-xs-${xs}`) }
  if (className.length == 0) { className.push('col-xs-12') }
  return <div class={className.join(' ')}>{children}</div>
}

export default {
  Row,
  Col
}

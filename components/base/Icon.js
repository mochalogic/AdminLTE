export const Icon = ({name, className, color = null, bg = null}) => {
  if (!name) return null;

  switch (true) {
    case name.startsWith('ion-'):
      className = `ion ${name} ${className}`
    case name.startsWith('fa-'):
      className = `fa ${name} ${className}`
  }

  return <i class={className}/>
}

export default Icon

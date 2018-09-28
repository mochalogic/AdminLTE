export const Icon = ({name, color = null, bg = null}) => {
  if (!name) return null;

  switch (true) {
    case name.startsWith('ion-'):
      return <i class={`ion ${name}`}/>
    case name.startsWith('fa-'):
      return <i class={`fa ${name}`}/>
    default:
  }
}

export default Icon

export default Component => {
  return ({ className, ...other }) => (
    <Component className={`warpper-component ${className || ""}`} {...other} />
  )
}

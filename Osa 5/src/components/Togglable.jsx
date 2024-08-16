import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  // useImperativeHandle = hook, jota on mahdollista kutsua sen ulkopuolella
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  // Määritellään pakolliseksi kentäksi, antaa errorin konsoliin
  Togglable.displayName = 'Togglable'
  Togglable.propTypes = {
    buttonlabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}create new blog</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable
/*
  Jos siirtää tänne, create ei toimi mutta sivu ei fressaa
        <button type="submit" onClick={toggleVisibility}>create</button>

        button cancel näkyy blogiformis
*/
// EI VVIELÄ KÄYTÖSSÄ || VAPAAEHTOINEN

const LoginForm = (props) => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={props.notification}/>
      <form onSubmit={props.handleLogin}>
        <div>
          username{" "}
          <input type="text" value={props.username} name="Username" onChange={({ target }) => 
            setUsername(props.target.value)}/>
        </div>
        <div>
          password{" "}
            <input type="password" value={props.password} name="Password" onChange={({ target }) => 
              setPassword(props.target.value)}/>
        </div>
      <button type="submit">login</button>
      </form>
    </div>      
  )

  export default LoginForm
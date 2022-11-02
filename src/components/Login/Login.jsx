import React from 'react'
import axios from "axios";
import { useState } from 'react'

const Login = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [username, setUseername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})

  //點擊登入，取得使用者名稱
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/1")
      setUser(data)
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className='container'>
      <span className='user'> {user.name}</span>
      <form action="">
        <input type="text" placeholder='username' value={username} onChange={e => setUseername(e.target.value)} />
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={!username || !password} onClick={handleClick}>{loading ? "Please Wait" : "Login"}</button>
        <span
          data-testid='error'
          style={{ visibility: error ? "visible" : "hidden" }}>
          Need to check form input!
        </span>
      </form>
    </div>
  )
}

export default Login

import React from 'react'
import { Link } from 'react-router-dom'
export default function index () {
  return (
    <div>
        <Link to="/">首页</Link>
        <Link to="/My">我的</Link>
    </div>
  )
}

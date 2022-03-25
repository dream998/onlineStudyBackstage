import React from 'react'

import { AppHeaderWrapper } from './style'

export default function Header() {
  return (
    <AppHeaderWrapper>
        <h2>在线教学管理系统(教师端)</h2>
        <h2 className='login'>登录/退出</h2>
    </AppHeaderWrapper>
  )
}

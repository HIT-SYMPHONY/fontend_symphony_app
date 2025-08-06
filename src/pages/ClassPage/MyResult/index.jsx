import React, { useState, useEffect, useRef, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Route, Routes, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../../dataContext'
import icon from './../../../assets/img/Ellipse.png'
import logo from './../../../assets/img/logo.png'
import TableResult from '../../../components/StartClassPage/StartTableResult/TableResult'
import TableCompetition from '../../../components/StartClassPage/StartTableResult/TableCompetition'
import Logout from '../../../components/Logout'
import './style.scss'

const ListMember = () => {
  const [sub, setSub] = useState(true)

  return <>{sub ? <TableResult onSetSub={setSub} /> : <TableCompetition onSetSub={setSub} />}</>
}

export default ListMember

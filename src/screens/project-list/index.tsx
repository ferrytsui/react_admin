import React from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useMount, useDebounce} from '../../utils/'
import * as qs from 'qs'

const url = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debounceParam = useDebounce(param, 200)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${url}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  },[debounceParam])

  useMount(() => {
    fetch(`${url}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list}/>
  </div>
}



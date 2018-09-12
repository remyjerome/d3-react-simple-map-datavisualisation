import C from '../constants'
import { combineReducers } from 'redux'

export const level = (state=3, action) =>
  (action.type === C.SET_LEVEL) ?
    action.payload :
    state

export const center = (state=[0 ,0], action) =>
  (action.type === C.SET_CENTER) ?
    action.payload :
    state

export const zoom = (state=0, action) =>
  (action.type === C.SET_ZOOM) ?
    action.payload :
    state

export const options = (state=[], action) => {
  switch (action.type) {

    case C.ADD_OPTION :
      return [
        ...state,
        action.payload
      ]

    case C.CLEAR_OPTION:
      return state.filter((option, i) => i!==action.payload)

    default:
      return state
  }
}

export const dr = (state=null, action) => {
  switch (action.type) {

    case C.SET_DR:
      return action.payload

    case C.CLEAR_DR:
      return null

    default:
      return state
  }
}

export const dgr = (state=null, action) => {
  switch (action.type) {

    case C.SET_DGR:
      return action.payload

    case C.CLEAR_DGR:
      return null

    default:
      return state
  }
}

export const hoverInfo = (state=null, action) => {
  switch (action.type) {

    case C.SET_HOVER_INFO:
      return action.payload

    case C.CLEAR_HOVER_INFO:
      return null

    default:
      return state
  }
}

export const hoverAgency = (state=null, action) => {
  switch (action.type) {

    case C.SET_HOVER_AGENCY:
      return action.payload

    case C.CLEAR_HOVER_AGENCY:
      return null

    default:
      return state
  }
}

export const map = (state=null, action) =>
  (action.type === C.SET_MAP) ?
    action.payload :
    state


export const data = (state=null, action) => {
  switch (action.type) {

    case C.SET_DATA:
      return action.payload

    case C.CLEAR_DATA:
      return null

    default:
      return state
  }
}


export default combineReducers({
  level,
  center,
  zoom,
  options,
  dr,
  dgr,
  hoverInfo,
  hoverAgency,
  map,
  data
})
import C from './constants'

export function setLevel(level) {
  return {
    type: C.SET_LEVEL,
    payload: level
  }
}

export function addOption(option) {
  return {
    type: C.ADD_OPTION,
    payload: option
  }
}

export function clearOption(option) {
  return {
    type: C.CLEAR_OPTION,
    payload: option
  }
}
export function setDgr(dgr) {
  return {
    type: C.SET_DGR,
    payload: dgr
  }
}

export function clearDgr() {
  return {
    type: C.CLEAR_DGR
  }
}

export function setDr(dr) {
  return {
    type: C.SET_DR,
    payload: dr
  }
}

export function clearDr() {
  return {
    type: C.CLEAR_DR
  }
}

export function setZoom(zoom) {
  return {
    type: C.SET_ZOOM,
    payload: zoom
  }
}

export function setCenter(center) {
  return {
    type: C.SET_CENTER,
    payload: center
  }
}

export function setHoverInfo(info) {
  return {
    type: C.SET_HOVER_INFO,
    payload: info
  }
}

export function clearHoverInfo() {
  return {
    type: C.CLEAR_HOVER_INFO
  }
}

export function setHoverAgency(agency) {
  return {
    type: C.SET_HOVER_AGENCY,
    payload: agency
  }
}

export function clearHoverAgency() {
  return {
    type: C.CLEAR_HOVER_AGENCY
  }
}

export function setMap(map) {
  return {
    type: C.SET_MAP,
    payload: map
  }
}

export function setData(data) {
  return {
    type: C.SET_DATA,
    payload: data
  }
}

export function clearData() {
  return {
    type: C.CLEAR_DATA
  }
}




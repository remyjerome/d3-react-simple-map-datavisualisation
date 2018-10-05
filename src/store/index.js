import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  result = next(action)

  // let { level, options, dgr, dr, zoom, center, hoverInfo, hoverAgency, map, data } = store.getState()

  /*console.log(`
    level: ${level}
    options: ${options}
    dgr: ${dgr}
    dr: ${dr}
    zoom: ${zoom}
    center: ${center}
    info: ${hoverInfo}
    agency: ${hoverAgency}
    map: ${map}
    data: ${data}
    `)*/

  console.log(store.getState())

  console.groupEnd()
  return result
}
export default (initialSate={}) => {
  return applyMiddleware(consoleMessages)(createStore)(appReducer, initialSate)
}
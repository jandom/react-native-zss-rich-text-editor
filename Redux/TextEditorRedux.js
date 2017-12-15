import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  textEditorRequest: ['images'],
  textEditorSuccess: ['imgUrl', 'imgLocalId'],
  textEditorFailure: ['errorMessage'],
})

export const TextEditorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Map({
  data: Map(),
  fetching: false,
  hasError: null,
  errorMessage: '',
})

/* ------------- Reducers ------------- */

export const request = (state, { images }) => 
  state
    .merge({
      fetching: true,
    })
  

export const success = (
  state,
  { imgUrl, imgLocalId }
) => {
  return state
    .merge({
      fetching: false,
      hasError: false,
      errorMessage: '',
      imgUrl,
      imgLocalId,
    })
  }

export const failure = (state, errorMessage ) =>
  state
    .merge({
      fetching: false,
      hasError: true,
      errorMessage,
    })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TEXT_EDITOR_REQUEST]: request,
  [Types.TEXT_EDITOR_SUCCESS]: success,
  [Types.TEXT_EDITOR_FAILURE]: failure,
})

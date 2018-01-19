import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import TextEditorActions from '../Redux/TextEditorRedux'

const indexOf = require('ramda/src/indexOf')
const path = require('ramda/src/path')
const pathOr = require('ramda/src/pathOr')
const prop = require('ramda/src/prop')

export function * uploadImage (api, { images }) {
  try {
    const response = yield call(api.uploadImage, images)

    // TODO: update response path later
    const imageResponse = path(['data', 'images'], response) 
    const imageInfo = imageResponse[0]
    let imgUrls = []

    const imgUrl = prop('url', imageInfo)
    const mediaId = prop('mediaId', imageInfo)
    const imgLocalId = prop('localId', images[0])
    
    if (response.ok) {
      yield put(
        TextEditorActions.textEditorSuccess(
          imgUrl,
          mediaId,
          imgLocalId
        )
      )
    } else {
      const errorCodes = pathOr([], ['data', 'errors'], response)
      // only use first error code for error message
      const firstErrorCode = pathOr(null, ['data', 'errors', 0], response)
      yield put(
        TextEditorActions.textEditorFailure(
          pathOr(null, ['data'], response)
        )
      )
    }
  } catch(e) {
    // TODO: handle error
    console.log('uploadImage error :', e)
  }
}

// ApiClient for new API
import apisauce from 'apisauce'
import Config from 'react-native-config'
import { select } from 'redux-saga/effects'
import apiEndpoints from '../Config/TextEditorEndpoints'
import type { ApiClient } from '../types/api'

const userJwtSelector = state => state.session.getIn(['profile', 'userJwt'])

const compose = require('ramda/src/compose')
const map = require('ramda/src/map')

const create = (baseURL = Config.UGC_API_BASE_URL): ApiClient => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  const uploadImage = function * (images) {
    const userJwt = yield select(userJwtSelector)
    api.setHeader('Authorization', `Bearer ${userJwt}`)
    api.setHeader('Content-Type', `multipart/form-data`)
    api.setHeader('Accept', `application/json`)

    const data = new FormData()

    images.map(image => {
      data.append('images[]', {
        uri: image.sourceURL, 
        name: image.filename, 
        type: image.mime
      })
    })

    return yield api.post(apiEndpoints.uploadImage, data)
  }

  return {
    uploadImage,
  }
}

export default {
  create
}

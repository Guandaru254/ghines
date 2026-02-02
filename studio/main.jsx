import React from 'react'
import {render} from 'react-dom'
import {Studio} from 'sanity'
import config from './sanity.config'

render(
  <Studio config={config} />,
  document.getElementById('sanity')
)
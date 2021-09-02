

import {money, moneyWithoutDecimals } from '~/plugins/filters/money'
import { truncate } from '~/plugins/filters/truncate'
import Vue from 'vue'

Vue.filter('money', money)
Vue.filter('moneyWithoutDecimals', moneyWithoutDecimals)
Vue.filter('truncate', truncate)


import auth from './auth'
import account from './account'
import business from './business'
import subscriber from './subscriber'
import campaign from './campaign'
import legaldoc from './legaldoc'
import otp from './otp'
import gateway from './gateway'
import bank from './bank'
import bankAccount from './bankAccount'

export default ($axios) => ({
  auth: auth($axios),
  bank: bank($axios),
  bankAccount: bankAccount($axios),
  account: account($axios),
  business: business($axios),
  subscriber: subscriber($axios),
  campaign: campaign($axios),
  legaldoc: legaldoc($axios),
  otp: otp($axios),
  gateway: gateway($axios)
})

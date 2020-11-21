import db from '../../db/config'
import { createTenantAuthToken } from '../../utils'
import { update } from '../../helpers'

const stripe = require('stripe')(
  'sk_test_51HQeTTKidNakGSiuzmUO3jqbAAF8BssCsJTlo2NJAEpDHKi1d3Repti4WzqYI01JIodArtM09BWdGYGrXI1Rp4rr00EQE5NrIP'
)

type CreateStripeAccountArgs = {
  name: string
  address: string
  city: string
  country_region: string
  phone: string
  website_url: string
  postal_code: string
  sub_address: string
  province: string
}

export default class StripeRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  // async getAllTenants() {
  //   const query = `SELECT * FROM "fm"."tenants"`

  //   try {
  //     const result = await db.query(query)
  //     return result.rows
  //   } catch (error) {
  //     //console.log(error)
  //     throw error
  //   }
  // }

  ////////////////////
  ///////WRITES///////
  ////////////////////

  async createStripeAccount(args: CreateStripeAccountArgs) {
    const { name, address, city, country_region, phone, website_url, postal_code, sub_address, province } = args

    const account = await stripe.accounts.create({
      type: 'standard',
    })

    console.log(account)

    return account.id
  }

  async connectStripeAccount(args: { account_id: number }) {
    const { account_id } = args

    const accountLinks = await stripe.accountLinks.create({
      account: account_id,
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    })

    console.log(accountLinks)

    return accountLinks.url
  }

  async makePayment() {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        payment_method_types: ['card'],
        amount: 1000,
        currency: 'cad',
        application_fee_amount: 123,
      },
      {
        stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
      }
    )
  }
}

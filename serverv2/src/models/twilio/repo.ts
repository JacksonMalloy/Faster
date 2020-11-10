import db from '../../db/config'

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACff76739e48202f12a1c5477f161f4a9e'
const authToken = '953cb4b2dfd385f76e60102f0c059d76'
const client = require('twilio')(accountSid, authToken)

type CreateMessageArgs = {
  phone: string
  customer_id: number
}

export default class TwilioRepository {
  ////////////////////
  ///////READS////////
  ////////////////////

  // async getAllOrganizations() {
  //   const query = `SELECT * FROM "fm"."organizations"`

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

  async createMessage({ phone, customer_id }: CreateMessageArgs) {
    function generateAccessCode() {
      return shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).join('').substring(0, 4)
    }

    function shuffle(values: string[]) {
      for (
        var j, x, i = values.length;
        i;
        j = Math.floor(Math.random() * i), x = values[--i], values[i] = values[j], values[j] = x
      );
      return values
    }

    const pin = generateAccessCode()

    try {
      const data = await client.messages
        .create({
          body: pin,
          from: '+12182969080',
          to: phone,
        })
        .then((message: any) => message)

      const { body, sid, direction } = data

      const query = `INSERT INTO "fm"."sms" (body, sid, phone, direction, customer_id) VALUES ($1, $2, $3, $4, $5)
                      ON CONFLICT (phone) DO UPDATE SET body = excluded.body RETURNING *`

      const params = [body, sid, phone, direction, customer_id]

      const result = await db.query(query, params)

      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }
}

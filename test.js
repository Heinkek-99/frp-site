import 'dotenv/config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)


async function main() {
  const result = await resend.emails.send({
    from: 'Face Aux Risques <test@faceauxrisques.com>',
    to: 'heidy.kengne@faceauxrisques.com',
    subject: 'Test sdsdfds Resend',
    html: '<p>Test sdsdsdsdfsdfOK</p>'
  })

  console.log(result)
}

main()

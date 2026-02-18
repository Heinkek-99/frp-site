import 'dotenv/config'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: 'Face Aux Risques <test@faceauxrisques.com>',
      to: 'heidy.kengne@faceauxrisques.com',
      subject: 'TEST DIRECT VERCEL',
      html: '<p>Test depuis Vercel</p>'
    })

    console.log('RESEND RESULT:', result)

    return NextResponse.json({ ok: true, result })
  } catch (error) {
    console.error('RESEND ERROR:', error)
    return NextResponse.json({ ok: false, error }, { status: 500 })
  }
}

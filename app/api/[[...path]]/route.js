import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// POST /api/contact - Handle contact form submission
export async function POST(request) {
  try {
    const { pathname } = new URL(request.url)
    
    if (pathname === '/api/contact') {
      const body = await request.json()
      const { nom, email, telephone, entreprise, service, message } = body

      // Validation
      if (!nom || !email || !telephone || !service || !message) {
        return NextResponse.json(
          { error: 'Tous les champs obligatoires doivent être remplis' },
          { status: 400 }
        )
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Email invalide' },
          { status: 400 }
        )
      }

      // Service labels
      const serviceLabels = {
        inspection: 'Inspection / Audit',
        formation: 'Formation SSI',
        audit: 'Audit de Conformité',
        installation: 'Installation Systèmes',
        maintenance: 'Maintenance Préventive',
        autre: 'Autre / Devis Général'
      }

      const serviceLabel = serviceLabels[service] || service

      // Send email using Resend
      const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF5722 0%, #E64A19 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #FF5722; margin-bottom: 5px; }
    .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #FF5722; }
    .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">🔥 Nouvelle Demande de Devis</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Face Aux Risques SA - Sécurité Industrielle</p>
    </div>
    <div class="content">
      <p style="font-size: 16px; margin-bottom: 20px;">Vous avez reçu une nouvelle demande de contact depuis le site web.</p>
      
      <div class="field">
        <div class="label">👤 Nom complet</div>
        <div class="value">${nom}</div>
      </div>

      <div class="field">
        <div class="label">📧 Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>

      <div class="field">
        <div class="label">📱 Téléphone</div>
        <div class="value"><a href="tel:${telephone}">${telephone}</a></div>
      </div>

      ${entreprise ? `
      <div class="field">
        <div class="label">🏢 Entreprise</div>
        <div class="value">${entreprise}</div>
      </div>
      ` : ''}

      <div class="field">
        <div class="label">🔧 Service demandé</div>
        <div class="value">${serviceLabel}</div>
      </div>

      <div class="field">
        <div class="label">💬 Message</div>
        <div class="value">${message.replace(/\n/g, '<br>')}</div>
      </div>

      <div style="margin-top: 30px; padding: 15px; background: #fff3e0; border-left: 4px solid #FF5722; border-radius: 4px;">
        <strong>⚡ Action requise :</strong> Répondre sous 24h pour maintenir notre engagement qualité.
      </div>
    </div>
    <div class="footer">
      <p>Face Aux Risques SA - Expert Sécurité Incendie & Risques Industriels</p>
      <p>📍 Bassa, 373 Rue 3W709, Douala, Cameroun</p>
      <p>📞 +237 699 699 522 | +33 6 74 15 18 45</p>
    </div>
  </div>
</body>
</html>
      `

      await resend.emails.send({
        from: 'Face Aux Risques <onboarding@resend.dev>',
        to: 'faceauxrisques@faceauxrisques.com',
        replyTo: email,
        subject: `🔥 Nouvelle demande : ${serviceLabel} - ${nom}`,
        html: emailContent
      })

      return NextResponse.json(
        { 
          success: true, 
          message: 'Votre message a été envoyé avec succès. Nous vous contacterons sous 24h.' 
        },
        { status: 200 }
      )
    }

    // 404 for unknown routes
    return NextResponse.json(
      { error: 'Route not found' },
      { status: 404 }
    )

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer plus tard.' },
      { status: 500 }
    )
  }
}

// GET /api/health - Health check
export async function GET(request) {
  const { pathname } = new URL(request.url)
  
  if (pathname === '/api/health') {
    return NextResponse.json(
      { status: 'ok', timestamp: new Date().toISOString() },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { error: 'Route not found' },
    { status: 404 }
  )
}
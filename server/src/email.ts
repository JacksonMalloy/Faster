import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID!)

export async function sendPasswordResetEmail(email: string) {
  const msg = {
    to: 'jacksmalloy@gmail.com', // Change to your recipient
    from: 'admin@faster.menu', // Change to your verified sender
    subject: 'Password Reset - faster.menu',
    html: '<strong>AAAAAAAAAAAHhhhhhhhhhhhhhhh</strong>',
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent')
    return {
      code: 200,
      message: `An email was sent to ${email}`,
      success: true,
    }
  } catch (error) {
    console.error(error.response.body)
    return {
      code: 500,
      message: `Sorry having troubles sending emails, please try again soon!`,
      success: false,
    }
  }
}

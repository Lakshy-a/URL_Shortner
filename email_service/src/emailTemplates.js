export const welcomeEmail = (userName) => ({
    body: {
        subject: `Welcome to URL Shortener, ${userName}!`,
        name: `${userName}`,
        intro: `Welcome to URL Shortener Service, ${userName}! We're thrilled to have you on board and can't wait to help you manage your links efficiently.`,
        action: {
            instructions:
                'To get started with shortening and tracking your URLs, please confirm your account by clicking the button below:',
            button: {
                color: '#22BC66',
                text: 'Confirm My Account',
                // link: 'https://yourapp.com/confirm?s=d9729feb74992cc3482b350163a1a010' // replace with actual dynamic link
            },
        },
        outro: 'If you have any questions or need assistance, just reply to this email—we’re always happy to help. Enjoy shortening!',
    },
})

export const resetPasswordEmail = (userName, resetUrl) => ({
    body: {
        subject: `Password Reset Request`,
        name: `${userName}`,
        intro: `You have requested to reset your password, ${userName}. Click the button below to proceed with resetting your password.`,
        action: {
            instructions: 'To reset your password, please click the button below:',
            button: {
                color: '#FF4136',
                text: 'Reset My Password',
                link: resetUrl, // dynamic link passed as argument
            },
        },
        outro: 'If you did not request a password reset, please ignore this email. If you have any questions, feel free to reply to this email.',
    },
})

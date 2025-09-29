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

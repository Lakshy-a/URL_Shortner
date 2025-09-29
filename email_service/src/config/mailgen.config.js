import mailgen from 'mailgen'

export const mailGenerator = new mailgen({
    theme: 'default',
    product: {
        name: 'URL Shortner Service',
        link: 'https://urlShortner.js/',
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    },
})

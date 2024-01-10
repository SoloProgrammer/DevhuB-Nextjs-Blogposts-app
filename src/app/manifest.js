export default function manifest() {
    return {
        name: 'Next_DEV_Blog',
        short_name: 'Next_DEV_Blog',
        description: 'A FullStack NextJs DEV_Blog App',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#fff',
        icons: [
            {
                src: '/public/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
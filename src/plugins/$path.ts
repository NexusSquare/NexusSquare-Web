export const pagesPath = {
    login: {
        $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash }),
    },
    privacy: {
        $url: (url?: { hash?: string }) => ({ pathname: '/privacy' as const, hash: url?.hash }),
    },
    profile: {
        _id: (id: string | number) => ({
            $url: (url?: { hash?: string }) => ({ pathname: '/profile/[id]' as const, query: { id }, hash: url?.hash }),
        }),
    },
    qa: {
        _id: (id: string | number) => ({
            $url: (url?: { hash?: string }) => ({ pathname: '/qa/[id]' as const, query: { id }, hash: url?.hash }),
        }),
        post: {
            $url: (url?: { hash?: string }) => ({ pathname: '/qa/post' as const, hash: url?.hash }),
        },
        result: {
            $url: (url?: { hash?: string }) => ({ pathname: '/qa/result' as const, hash: url?.hash }),
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/qa' as const, hash: url?.hash }),
    },
    register: {
        step1: {
            $url: (url?: { hash?: string }) => ({ pathname: '/register/step1' as const, hash: url?.hash }),
        },
        step2: {
            $url: (url?: { hash?: string }) => ({ pathname: '/register/step2' as const, hash: url?.hash }),
        },
        step3: {
            $url: (url?: { hash?: string }) => ({ pathname: '/register/step3' as const, hash: url?.hash }),
        },
    },
    rule: {
        $url: (url?: { hash?: string }) => ({ pathname: '/rule' as const, hash: url?.hash }),
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash }),
}

export type PagesPath = typeof pagesPath

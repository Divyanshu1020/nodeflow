export const ROUTES = {
    SIGN_IN: "/signIn",
    SIGN_UP: "/signUp",
    WORKFLOWS: "/workflows",
    CREDENTIALS: "/credentials",
    EXECUTIONS: "/executions",
    HOME: "/"
} as const

export const PROJECT_NAME = "NodeFlow"

export const PAGINATION = {
    DEFAULT_PAGE : 1,
    DEFAULT_PAGE_SIZE : 5,
    MAX_PAGE_SIZE : 100,
    MIN_PAGE_SIZE : 1,
} as const
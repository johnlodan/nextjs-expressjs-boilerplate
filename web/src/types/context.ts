export interface IAppContext {
    socket?: ISocket
    theme?: ITheme;
}

export type ITheme = "light" | "dark" | "green"

export interface ISocket {
    on?: boolean
}
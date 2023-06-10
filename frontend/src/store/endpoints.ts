export const backendEndpoint = `http://localhost:4000/`;
export const routes = {
    message: "message/",
    user: "user/",
    channel: "channel/"
}

export const endpoints = {
    messageEndpoint: `${backendEndpoint}${routes.message}`,
    messageEndpointParametrized: (parameter: string) => (`${endpoints.messageEndpoint}${parameter}`),

    userEndpoint: `${backendEndpoint}${routes.user}`,
    userEndpointParametrized: (parameter: string) => (`${endpoints.userEndpoint}${parameter}`),

    channelEndpoint: `${backendEndpoint}${routes.channel}`,
    channelEndpointParametrized: (parameter: string) => (`${endpoints.channelEndpoint}${parameter}`),
}
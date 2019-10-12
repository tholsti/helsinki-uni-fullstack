export const getInputProperties = properties => {
    const { reset, ...restProperties } = properties;
    return restProperties;
}

import queryString from 'query-string';

export const sortQuery = (query: any) => {
    return queryString.stringify({ ...query }, { sort: (a, b) => a.localeCompare(b) })
}
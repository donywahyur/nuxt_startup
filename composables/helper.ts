
export function transformResponse (resp: any) {
    return {
        data: resp.data,
        meta: resp.meta
    }
}

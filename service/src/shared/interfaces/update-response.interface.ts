export interface IUpdateResponse {
    acknowledged?: boolean
    modifiedCount?: number
    upsertedId?: any
    upsertedCount?: number
    matchedCount?: number
}
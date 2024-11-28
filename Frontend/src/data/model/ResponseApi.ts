interface objError {
    message: string
    field: string
}

export default interface ResponseApi {
    success: boolean
    status: number
    json: any
    errors?: objError[]
}
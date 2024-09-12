interface ICar {
    id: number,
    license_plate: string,
    model: {
        brand: number,
        id: number,
        name: string
    },
    vin: string,
}
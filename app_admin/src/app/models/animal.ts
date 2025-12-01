export interface Animal{
    _id: string,    // internal primary key in MongoDB
    code: string,
    name: string,
    reserved: boolean,
    gender: string,
    age: string,
    weight: string,
    acquisitionDate: Date,
    acquisitionCountry: string,
    trainingStatus: string,
    inServiceCountry: string,
    animalType: string
}

export interface Dog extends Animal{
    breed: string,
}

export interface Monkey extends Animal{
    tailLength: string,
    bodyHeight: string,
    bodyLength: string,
    species: string
}

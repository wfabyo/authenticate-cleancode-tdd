import {Name} from '../../src/entities/User/Name'

describe('Entity Name tests', () => {
    it('Should return Entity Name when name is valid', async () => {
        const paramName = 'Wellynnson Fabyo da Costa Venancio'
        
        const name = Name.create(paramName)
        if(name instanceof Error)
            return
        expect(name).toBeInstanceOf(Name)
        expect(name.name).toBe(paramName)
    })
    it('Should return Invalid Name Error when name is not valid', async () => {
        const paramName = 'Wellynnson'
        
        const name = Name.create(paramName)
        if(name instanceof Name)
            return
        expect(name).toBeInstanceOf(Error)
        expect(name.message).toBe('Invalid Name.')
    })
})
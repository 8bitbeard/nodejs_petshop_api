import { expect } from "chai";
import sinon, { createSandbox, createStubInstance, SinonSandbox, stub } from "sinon";
import { Repository, getCustomRepository } from "typeorm";
import "typeorm/repository/Repository";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { UsersService } from "../../services/UsersService";

import * as typeorm from 'typeorm'

describe('UsersService', () => {
    // let sandbox: SinonSandbox

    beforeEach(async () => {
        // sandbox = createSandbox()
        const getCustomRepositoryMock = sinon.stub(typeorm, 'getCustomRepository');
    })

    afterEach(() => {
        // sandbox.restore()
    })

    describe('create', () => {
        it('should return an error when no email is informed', async() => {
            // const getCustomRepositoryMock = createStubInstance(getCustomRepository)
            // stub(typeorm, 'getCustomRepository').withArgs(UsersRepositories).returns(true);
            // const getCustomRepositoryMock = sinon.replace(typeorm, 'getCustomRepository', sinon.fake.returns(true))

            const usersService = new UsersService()
            const user = await usersService.create('Mock User', null, '1234').catch(error => {
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.eql('teste')
            })

        })

        it ('should return an error when trying to create an already existing user', async() => {

        })

        it('should return an error when trying to create an user with a password that contains chars', async() => {

        })

        it('should return an error when trying to create an user with a password smaller than 4 digits', async() => {

        })

        it('should return an error when trying to create an user with a password bigger than 4 digits', async() => {

        })

        it('should create an user successfylly', async() => {

        })
    })

    describe('index', () => {
        it('should return a list of users', async() => {

        })
    })
})
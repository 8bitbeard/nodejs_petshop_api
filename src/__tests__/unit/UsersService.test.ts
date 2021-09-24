import { Repository, getCustomRepository } from "typeorm";
import "typeorm/repository/Repository";
import { mocked } from "ts-jest/utils";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { UsersService } from "../../services/UsersService";

jest.mock('typeorm', () => ({
    __esModule: true,
    getCustomRepository: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(),
    PrimaryColumn: jest.fn(),
    Column: jest.fn(),
    CreateDateColumn: jest.fn(),
    UpdateDateColumn: jest.fn(),
    Entity: jest.fn(),
    EntityRepository: jest.fn(),
    Repository: jest.fn()
}));

describe('UsersService', () => {
    const getCustomRepositoryMock = mocked(getCustomRepository);
    const findOneMock = jest.fn();
    const findMock = jest.fn();
    const createMock = jest.fn();
    const saveMock = jest.fn();
    const updateMock = jest.fn();
    const deleteMock = jest.fn();
    let usersRepositories: UsersRepositories;

    beforeAll(async () => {
        jest.mock("typeorm/repository/Repository");
        Repository.prototype.findOne = findOneMock;
        Repository.prototype.find = findMock;
        Repository.prototype.create = createMock;
        Repository.prototype.save = saveMock;
        Repository.prototype.update = updateMock;
        Repository.prototype.delete = deleteMock;
        usersRepositories = new UsersRepositories();
    })

    beforeEach(async () => {
        jest.resetAllMocks();
    })

    describe('create', () => {
        it('should return an error when no email is informed', async() => {
            getCustomRepositoryMock.mockReturnValue(usersRepositories);
            const usersService = new UsersService();
            await usersService.create('Mock User', null, '1234').catch(error => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Email incorrect!')
            })
            expect(getCustomRepository).toBeCalledTimes(1);
        })

        it ('should return an error when trying to create an already existing user', async() => {
            getCustomRepositoryMock.mockReturnValue(usersRepositories);
            const usersService = new UsersService();
            findOneMock.mockReturnValueOnce(true)
            await usersService.create('Mock User', 'mock_user@example.com', '1234').catch(error => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('User already exists')
            })
            expect(getCustomRepository).toBeCalledTimes(1);
        })

        it('should return an error when trying to create an user with a password that contains chars', async() => {
            getCustomRepositoryMock.mockReturnValue(usersRepositories);
            const usersService = new UsersService();
            findOneMock.mockReturnValueOnce(false);
            await usersService.create('Mock User', 'mock_user@example.com', 'abcd').catch(error => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Password must contain only numbers!')
            })
            expect(getCustomRepository).toBeCalledTimes(1);
        })

        it('should return an error when trying to create an user with a password smaller than 4 digits', async() => {
            getCustomRepositoryMock.mockReturnValue(usersRepositories);
            const usersService = new UsersService();
            findOneMock.mockReturnValueOnce(false);
            await usersService.create('Mock User', 'mock_user@example.com', '123').catch(error => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Password size must be equal to 4!')
            })
            expect(getCustomRepository).toBeCalledTimes(1);
        })

        it('should return an error when trying to create an user with a password bigger than 4 digits', async() => {
            getCustomRepositoryMock.mockReturnValue(usersRepositories);
            const usersService = new UsersService();
            findOneMock.mockReturnValueOnce(false);
            await usersService.create('Mock User', 'mock_user@example.com', '12345').catch(error => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Password size must be equal to 4!')
            })
            expect(getCustomRepository).toBeCalledTimes(1);
        })

        it('should create an user successfylly', async() => {
            getCustomRepositoryMock.mockReturnValueOnce(usersRepositories);
            const usersService = new UsersService();
            findOneMock.mockReturnValueOnce(false);
            saveMock.mockReturnValueOnce(true);
            createMock.mockReturnValueOnce({
                id: "453eea87-7416-40f4-9e37-e064e5fed963",
                name: "Wilton2",
                email: "wilton2@example.com",
                admin: true,
                created_at: "2021-07-06T17:20:34.000Z",
                updated_at: "2021-07-06T17:20:34.000Z"
            })
            await usersService.create('Mock User', 'mock_user@example.com', '1234')
            expect(getCustomRepository).toBeCalledTimes(1);
            expect(findOneMock).toBeCalledTimes(1);
            expect(createMock).toBeCalledTimes(1);
            expect(saveMock).toBeCalledTimes(1);
        })
    })

    describe('index', () => {
        it('should return a list of users', async() => {
            getCustomRepositoryMock.mockReturnValue(usersRepositories);
            const usersService = new UsersService();
            findMock.mockReturnValue([]);
            const users = await usersService.index();
            expect(getCustomRepository).toBeCalledTimes(1);
            expect(findMock).toBeCalledTimes(1)
            expect(users).toBeInstanceOf(Array)
        })
    })
})
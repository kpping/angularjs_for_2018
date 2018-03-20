import { greetOnInit } from './helpers';

describe('greetOnInit', () => {
    test('should be exported as a function', () => {
        expect(typeof greetOnInit).toBe('function');
    });

    test('should log "foo"', () => {
        const mockLogger = jest.fn();
        greetOnInit(mockLogger);

        // called 1 time
        expect(mockLogger.mock.calls.length).toBe(1);
        // or called at least once
        expect(mockLogger).toBeCalled();

        // [0][0] 1st time 1st args
        expect(mockLogger.mock.calls[0][0]).toBe('foo');
        // or called at least once with args
        expect(mockLogger).toBeCalledWith('foo');
    });
});

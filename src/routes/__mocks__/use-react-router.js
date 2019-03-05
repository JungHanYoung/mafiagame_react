import sinon from 'sinon'

export const push = sinon.spy();

// push.calledOnce

export default function useReactRouter() {
    return {
        history: {
            push
        }
    }
}
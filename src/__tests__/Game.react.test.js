import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect'
// import Game from '../routes/Game';
import Counter from '../testing/Counter'
import { minPropsByGame } from '../mockData';
import Game from '../routes/Game';

afterEach(cleanup)



it('<Counter /> 컴포넌트 < react-testing-library', () => {
    const { getByText, getByTestId } = render(<Counter />)
    expect(getByTestId("count")).toHaveTextContent('0')
    fireEvent.click(getByText('Up'))
    expect(getByTestId("count")).toHaveTextContent('1')

})

it('기본 세팅', () => {
    const { getByTestId } = render(<Game {...minPropsByGame} />)
    expect(getByTestId('game-title')).toHaveTextContent('hello mafia')
    // expect(getByTestId('game-content'))
    expect(getByTestId('game-content-description')).toHaveTextContent('낮 토론 시간입니다. 토론을 통해 마피아를 찾으세요.')
    expect(getByTestId('game-button')).toHaveTextContent('투표로 이동')

})

describe('낮토론 -> 낮투표', () => {

    const moveToVoteTime = (getFunc) => {
        fireEvent.click(getFunc('game-button'))
    }

    const moveToResult = (players = [], getFunc) => {
        players.forEach(player => {
            fireEvent.click(getFunc(/vote-button-/i)[0])
        })
    }

    it('낮투표로 화면 이동 후', () => {
        const { getByTestId } = render(<Game {...minPropsByGame} />)
        moveToVoteTime(getByTestId) // 낮토론 -> 낮투표 state에 따른 화면 이동
        expect(getByTestId('game-content-description')).toHaveTextContent('마피아로 의심되는 사람을 투표합니다.')
    })
    it('낮투표화면 > 투표버튼 확인', () => {
        const { getByTestId, getAllByTestId, debug } = render(<Game {...minPropsByGame} />)
        moveToVoteTime(getByTestId) // 낮토론 -> 낮투표 state에 따른 화면 이동
        getAllByTestId(/vote-button-/i).forEach(el => {
            // debug(el)
            const mapOfNames = minPropsByGame.history.location.state.players.map(player => player.name)
            expect(mapOfNames).toContain(el.textContent)
        })
    })

    it('낮투표화면 > 투표버튼 클릭 후 결과메세지', () => {
        const { getAllByTestId, getByTestId } = render(<Game {...minPropsByGame} />)
        moveToVoteTime(getByTestId) // 낮토론 -> 낮투표 state에 따른 화면 이동
        moveToResult(minPropsByGame.history.location.state.players, getAllByTestId) // 투표

        expect(getByTestId('game-content-description')).toHaveTextContent('투표 결과')

    })

    it('낮투표화면 > 투표버튼 클릭 후 결과 메세지', () => {
        const { getAllByTestId, getByTestId } = render(<Game {...minPropsByGame} />)
        moveToVoteTime(getByTestId) // 낮토론 -> 낮투표 state에 따른 화면 이동
        moveToResult(minPropsByGame.history.location.state.players, getAllByTestId)

    })
})

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from './context/GameContext'

import logoImg from './assets/logo.png'

export default function App() {
	const [{ people }] = useContext(GameContext)

	return (
		<main className="main-container">
			<img alt="로고" src={logoImg} className="main-img" />
			<h1 className="main-title">HELLO MAFIA</h1>
			{people.length > 0 && (
				<Link className="btn-main" to="/check">
					게임 시작
				</Link>
			)}
			<Link className="btn-main" to="/setting">
				게임 설정
			</Link>

			<Link className="btn-main" to="/about">
				게임 설명
			</Link>
		</main>
	)
}
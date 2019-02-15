import React, { Component } from 'react';
import { useGame } from '../../context/GameContext';
import classNames from 'classnames'
// import _ from 'lodash'
// import { SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END } from '../../contants/Setting';

import minusImg from '../../assets/btn-minus.png'
import plusImg from '../../assets/btn-plus.png'


// const range = _.range(SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END)


class InputPeople extends Component {
    constructor(props) {
        super(props)

        this.state = {
            num: props.people.length
        }
    }
    onPeopleChange = (input) => {
        const { num } = this.state
        const { setPeopleNum } = this.props;
        const value = num + input;
        if (value >= 0) {
            setPeopleNum(value)

            this.setState({
                num: value
            })
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {

    //     // return this.state.num !== nextState.num && this.state.fade !== nextState.fade
    // }
    componentDidUpdate() {
        // const { num } = this.state
        // this.refs['people-container'].addEventListener('scroll', () => {
        //     Array.from({ length: num }, (v, k) => k).forEach(number => {
        //         console.log(this.refs[`name-${number}`].)
        //     })
        // })

        this.refs.scroll.addEventListener('scroll', () => {
            // 스크롤을 끝까지 내렸을 때, fadeAfter를 적용시키지 않음.
            if (this.refs.scroll.scrollHeight - this.refs.scroll.clientHeight === this.refs.scroll.scrollTop) {
                this.refs.fade.classList.remove('fadeAfter')
            } else {    // 만약 스크롤이 끝에 있지 않다면 fade적용
                if (!this.refs.fade.classList.contains('fadeAfter')) {
                    this.refs.fade.classList.add('fadeAfter')
                }
            }
            // 스크롤이 맨위에서 조금 내리면, fadeBefore적용
            if (this.refs.scroll.scrollTop > 0) {
                if (!this.refs.fade.classList.contains('fadeBefore')) {
                    this.refs.fade.classList.add('fadeBefore')
                }
            } else {
                this.refs.fade.classList.remove('fadeBefore')
            }
            console.log(
                this.refs.scroll.scrollTop
            )
            // console.log(
            //     this.refs['people-container'].clientHeight,
            //     this.refs['people-container'].scrollHeight,

            // )
            // console.log(this.refs['people-container'].scrollTop)
        })
        // console.log(
        //     this.refs['people-scroll-container'].clientHeight
        // )
        if (this.refs.scroll.scrollHeight - this.refs.scroll.clientHeight > 0) {
            if (!this.refs.fade.classList.contains('fadeAfter')) {
                this.refs.fade.classList.add('fadeAfter')
            }
        } else {
            this.refs.fade.classList.remove('fadeAfter')
        }
    }

    render() {
        const { people, onChangePeopleName } = this.props
        const { num } = this.state

        return (
            <div className="setting-container" ref="setting-container">
                <h3 className="setting-subtitle">
                    인원 수 및 이름을<br /> 선택해주세요.
                </h3>
                <div className="input-container">
                    <span
                        className="btn minus"
                        onClick={() => this.onPeopleChange(-1)}>
                        <img src={minusImg} alt="button" />
                    </span>

                    <span className="peopleNum">{num}</span>
                    <span
                        className="btn minus"
                        onClick={() => this.onPeopleChange(1)}>
                        <img src={plusImg} alt="button" />
                    </span>

                </div>
                <div className="fade-wrapper" ref="fade">
                    <div className={classNames("setting-people-name-container")} ref="scroll">
                        <div className="setting-people-wrapper">
                            {people.map((person, i) => (
                                <div
                                    key={`setting__people-name__${i}`}
                                    ref={`name-${i}`}
                                    className="setting-people-name">
                                    <span className="people-name-placeholder">{`PLAYER ${i + 1}`}</span>
                                    <input
                                        type="text"
                                        name={`person_${i}`}
                                        value={person}
                                        autoComplete="off"
                                        onChange={(e) => onChangePeopleName(i, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

export default useGame(({ state, actions }) => ({
    people: state.people,
    setPeopleNum: actions.setPeopleNum,
    onChangePeopleName: actions.onChangePeopleName
}))(InputPeople);

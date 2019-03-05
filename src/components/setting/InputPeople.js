import React, { useContext, useEffect, useRef, useState, forwardRef } from 'react';
import { useGame, GameContext } from '../../context/GameContext';
import classNames from 'classnames'
// import _ from 'lodash'
// import { SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END } from '../../contants/Setting';

import CountInput from './common/CountInput';


// const range = _.range(SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END)

export default function InputPeople() {
    const [{ people }, dispatch] = useContext(GameContext);
    const [num, setNum] = useState(people.length);
    const [fadeAfter, setFadeAfter] = useState(false);
    const [fadeBefore, setFadeBefore] = useState(false);
    const [isScrollEnd, setIsScrollEnd] = useState(false);
    const scrollRef = useRef(null);
    const fadeRef = useRef(null);

    function onPeopleChange(value) {
        if (value >= 0) {
            dispatch({ type: 'SET_PEOPLE_NUM', value })
            setNum(value)
        }
    }

    function onChangePeopleName(index, value) {
        dispatch({ type: 'ON_CHANGE_PEOPLE_NAME', index, value })
    }

    function onScrollOpacity() {
        console.log("scrollHeight:", scrollRef.current.scrollHeight)
        console.log("clientHeight:", scrollRef.current.clientHeight)
        console.log("scrollTop:", scrollRef.current.scrollTop)
        // 스크롤을 끝까지 내렸을 때, fadeAfter를 적용시키지 않음.
        if (scrollRef.current.scrollHeight - scrollRef.current.clientHeight <= scrollRef.current.scrollTop + 10) {
            setFadeAfter(false)
            setIsScrollEnd(true)
        } else {    // 만약 스크롤이 끝에 있지 않다면 fade적용
            setFadeAfter(true)
            setIsScrollEnd(false)
        }
        // 스크롤이 맨위에서 조금 내리면, fadeBefore적용
        if (scrollRef.current.scrollTop > 0) {
            setFadeBefore(true)
        } else {
            setFadeBefore(false)
        }
    }

    useEffect(() => {
        scrollRef.current.addEventListener('scroll', onScrollOpacity)
        return () => scrollRef.current.removeEventListener('scroll', onScrollOpacity)
    }, [])

    useEffect(() => {
        // 인원수가 추가되며 이름을 적을 엘리먼트가 추가됨에 따라 스크롤이 생겼을 때
        if (scrollRef.current.scrollHeight - scrollRef.current.clientHeight > 0 && !isScrollEnd) {
            setFadeAfter(true)
        }
    }, [isScrollEnd, num])

    return (
        <div className="setting-container">
            <h3 className="setting-subtitle">
                인원 수 및 이름을<br /> 선택해주세요.
                </h3>
            <CountInput count={num} handler={onPeopleChange} />
            <div className={classNames('fade-wrapper', { fadeAfter, fadeBefore })} ref={fadeRef}>
                <div className={classNames("setting-people-name-container")} ref={scrollRef}>
                    <div className="setting-people-wrapper">
                        {people.map((person, i) => (
                            <div
                                key={`setting__people-name__${i}`}
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
    )
}


// class InputPeople extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             num: props.people.length
//         }
//     }
//     onPeopleChange = (value) => {

//         const { setPeopleNum } = this.props;

//         if (value >= 0) {
//             setPeopleNum(value)

//             this.setState({
//                 num: value
//             })
//         }
//     }
//     // shouldComponentUpdate(nextProps, nextState) {

//     //     // return this.state.num !== nextState.num && this.state.fade !== nextState.fade
//     // }
//     componentDidUpdate() {
//         // const { num } = this.state
//         // this.refs['people-container'].addEventListener('scroll', () => {
//         //     Array.from({ length: num }, (v, k) => k).forEach(number => {
//         //         console.log(this.refs[`name-${number}`].)
//         //     })
//         // })

//         this.refs.scroll.addEventListener('scroll', () => {
//             // 스크롤을 끝까지 내렸을 때, fadeAfter를 적용시키지 않음.
//             if (this.refs.scroll.scrollHeight - this.refs.scroll.clientHeight === this.refs.scroll.scrollTop) {
//                 this.refs.fade.classList.remove('fadeAfter')
//             } else {    // 만약 스크롤이 끝에 있지 않다면 fade적용
//                 if (!this.refs.fade.classList.contains('fadeAfter')) {
//                     this.refs.fade.classList.add('fadeAfter')
//                 }
//             }
//             // 스크롤이 맨위에서 조금 내리면, fadeBefore적용
//             if (this.refs.scroll.scrollTop > 0) {
//                 if (!this.refs.fade.classList.contains('fadeBefore')) {
//                     this.refs.fade.classList.add('fadeBefore')
//                 }
//             } else {
//                 this.refs.fade.classList.remove('fadeBefore')
//             }
//         })
//         // 인원수가 추가되며 이름을 적을 엘리먼트가 추가됨에 따라 스크롤이 생겼을 때
//         if (this.refs.scroll.scrollHeight - this.refs.scroll.clientHeight > 0) {
//             if (!this.refs.fade.classList.contains('fadeAfter')) {
//                 this.refs.fade.classList.add('fadeAfter')
//             }
//         } else {
//             this.refs.fade.classList.remove('fadeAfter')
//         }
//     }

//     render() {
//         const { people, onChangePeopleName } = this.props
//         const { num } = this.state

//         return (
//             <div className="setting-container" ref="setting-container">
//                 <h3 className="setting-subtitle">
//                     인원 수 및 이름을<br /> 선택해주세요.
//                 </h3>
//                 <CountInput count={num} handler={this.onPeopleChange} />
//                 <div className="fade-wrapper" ref="fade">
//                     <div className={classNames("setting-people-name-container")} ref="scroll">
//                         <div className="setting-people-wrapper">
//                             {people.map((person, i) => (
//                                 <div
//                                     key={`setting__people-name__${i}`}
//                                     ref={`name-${i}`}
//                                     className="setting-people-name">
//                                     <span className="people-name-placeholder">{`PLAYER ${i + 1}`}</span>
//                                     <input
//                                         type="text"
//                                         name={`person_${i}`}
//                                         value={person}
//                                         autoComplete="off"
//                                         onChange={(e) => onChangePeopleName(i, e.target.value)}
//                                     />
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 </div>
//             </div >
//         );
//     }
// }

// export default useGame(({ state, actions }) => ({
//     people: state.people,
//     setPeopleNum: actions.setPeopleNum,
//     onChangePeopleName: actions.onChangePeopleName
// }))(InputPeople);

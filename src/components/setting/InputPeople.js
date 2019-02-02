import React, { Component } from 'react';
import { useGame } from '../../context/GameContext';
import _ from 'lodash'
import { SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END } from '../../contants/Setting';


const range = _.range(SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END)


class InputPeople extends Component {
    constructor(props) {
        super(props)

        this.state = {
            num: props.people.length
        }
    }
    onPeopleChange = (e) => {
        const { setPeopleNum } = this.props;
        const value = Number(e.target.value);

        this.setState(
            {
                num: value
            },
            () => {
                setPeopleNum(value);
            }
        );
    }

    render() {
        const { people, onChangePeopleName } = this.props
        const { num } = this.state

        return (
            <div className="setting-container">
                <h3 className="setting-subtitle">
                    인원 수 및 이름을<br /> 선택해주세요.
                </h3>
                <select className="setting-people-select" value={num} onChange={this.onPeopleChange}>
                    <option>SELECT NUMBER</option>
                    {range.map(number => (
                        <option key={`people_select__${number}`} value={number}>{number}</option>
                    ))}
                </select>
                <div className="setting-people-name">
                    {people.map((person, i) => (
                        <input type="number" name={`person_${i}`} value={person} onChange={(e) => onChangePeopleName(i, e.target.value)} />
                    ))}
                </div>
            </div>
        );
    }
}

export default useGame(({ state, actions }) => ({
    people: state.people,
    setPeopleNum: actions.setPeopleNum,
    onChangePeopleName: actions.onChangePeopleName
}))(InputPeople);

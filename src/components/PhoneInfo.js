import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-1234-5678',
      id: 0
    }
  }

  state = {
    editing: false,
    name: '',
    phone: ''
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if (!this.state.editing
      && !nextState.editing
      && nextProps.info === this.props.info) {
      return false;
    }
    // 나머지 경우엔 리렌더링함
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.

    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      // editing 값이 false -> true 로 전환 될 때
      // info 의 값을 state 에 넣어준다
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if (prevState.editing && !this.state.editing) {
      // editing 값이 true -> false 로 전환 될 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  render() {
    console.log('render PhoneInfo ' + this.props.info.id);
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };
    const { editing } = this.state;


    if (editing) { // 수정모드
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }
    const {
      name, phone, id
    } = this.props.info;
    return(
      <div style={style}>
        <div>{id}</div>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
        <button onClick={this.handleRemove}>삭제</button>

      </div>
    );
  }
}

export default PhoneInfo;
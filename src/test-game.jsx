import React, { Component } from 'react'

class Stars extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentStars: null,
            currentStarCount: 0,
            selectedNumbers: [],
            selectedNumbersJSX: [],
            selectableNumbs: null,
            disabledList: []
        }
    }

    componentDidMount() {
        const nums = []
        for (let i=1; i<=10; i++) {
            nums.push(this.buttons(i))
        }
        this.setState({
            selectableNumbs: nums
        })
        this.renderRandomStars()
    }

    renderRandomStars = () => {
        const stars = []
        const r = Math.floor(Math.random() * 10)
        for (let i=1; i<=r; i++) {
            stars.push(
                <span> * </span>
            )
        }
        this.setState({ currentStars: stars, currentStarCount: r })
    }

    addNumSelection = num => {
        this.setState({
            error: ''
        })
        const s = [...this.state.selectedNumbers, num]
        this.setState({
            selectedNumbers: [...new Set(s)]
        }, () => this.renderSelected())
    }

    renderSelected = () => {
        const x = []
        this.state.selectedNumbers.forEach(n => {
            x.push(<span style={this.style.buttons} onClick={() => this.removeNumSelection(n)}>{ n }</span>)
        })
        this.setState({
            selectedNumbersJSX: x
        })
    }

    buttons = num => (
        <span style={this.style.buttons} onClick={() => this.addNumSelection(num)}>
            {num}
        </span>
    )

    removeNumSelection = num => {
        this.setState({
            selectedNumbers: [...this.state.selectedNumbers].filter(v => (v!==num))
        }, () => this.renderSelected())
    }

    checkEquals = () => {
        let sum = 0
        this.state.selectedNumbers.forEach(i => {
            sum += i
        })
        if (sum === this.state.currentStarCount) {
            this.setState({
                selectedNumbers: []
            }, () => {
                this.renderRandomStars()
                this.renderSelected()
            })
        } else {
            this.setState({
                error: 'Wrong !!!'
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                {this.state.currentStars}
                </div>
                <button onClick={this.checkEquals}> Equals </button>
                <button onClick={this.renderRandomStars}> Refresh </button>

                <div style={this.style.box}>
                    {this.state.selectableNumbs}
                </div>

                <div style={{ float: "right" }}>
                    {
                        this.state.selectedNumbersJSX
                    }
                </div>

                <div style={this.style.errorBox}>
                    {this.state.error}
                </div>
            </div>
        )
    }

    style = {
        buttons: {
            backgroundColor: 'grey',
            padding: 10,
            margin: 10,
            color: 'black'
        },
        box: {
            margin: 30
        },
        errorBox: {
            textAlign: 'center',
            color: 'red',
            fontSize: 20,
            padding: 10
        }
    }
}

export default Stars
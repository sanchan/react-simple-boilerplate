import React, { Component } from 'react'
import cx from 'classnames'
import styles from './styles.css'

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            date: '2045-12-20'
        }

        this.handleServiceChange = this.handleServiceChange.bind(this)
    }

    handleServiceChange(e) {
        this.setState({
            service: e.target.value
        })
    }

    render() {
        return (
            <>
                <h1 className={cx(styles.title, 'static-class')}>Bus Status</h1>
                <p>Some text</p>

                <input placeholder="Name" value={this.state.service} onChange={this.handleServiceChange}  />
                <input placeholder="Date" />

                <button type="submit">Submit</button>
            </>
        )
    }
}

export default Home

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {accounts: []};
    }

    // TODO: write componentDidMount()

    render() {
        return (
            <AccountList accounts={this.state.accounts}/>
        )
    }
}

class Account extends React.Component {
    render() {
        return (
            <tr>
                <td>this.props.account.name</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
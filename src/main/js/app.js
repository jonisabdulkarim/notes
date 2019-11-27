const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {accounts: []};
    }

    componentDidMount() {
        fetch("http://localhost:8080/api")
        .then(res => res.json())
        .then((data) => {
            this.setState({ accounts: data })
        })
        .catch(console.log)
    }

    render() {
        return (
            <AccountData accounts={this.state.accounts}/>
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
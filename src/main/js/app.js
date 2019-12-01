import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {accounts: []};
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/accounts")
        .then(res => res.json())
        .then((data) => {
            this.setState({ accounts: data._embedded.accounts })
        })
        .catch(console.log)
    }

    render() {
        return (
            <AccountData accounts={this.state.accounts}/>
        )
    }
}

class AccountData extends React.Component {
    render() {
        const accounts = this.props.accounts.map((account) => 
            <Account key={account._links.self.href} account={account} />
        );

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                    </tr>
                    {accounts}
                </tbody>
            </table>
        )
    }
}

class Account extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.account.name}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
import React from 'react';
import ReactDOM from 'react-dom';
import { finished } from 'stream';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.root = "/api";
        this.state = {
            accounts: [],
            notes: []
        };
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    
    loadFromServer(pageSize) {
        // fetch "account" relation
        var request = new Request(this.root + "/accounts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetch(request)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                accounts: data._embedded.accounts,
                pageSize: pageSize,
                links: data._links
            })
        })
        .catch(console.log);

        // fetch "notes" relation
        var request = new Request(this.root + "/notes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetch(request)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                accounts: data._embedded.notes,
                pageSize: pageSize,
                links: data._links
            })
        })
        .catch(console.log);
    }

    render() {
        return (
            <div>
                <AccountData accounts={this.state.accounts}/>
                <NoteData notes={this.state.notes}/>
            </div>
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

class NoteData extends React.Component {
    render() {
        const notes = this.props.notes.map((note) =>
        <Note key={note._links.self.href} note={note} />
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Priority</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                    {notes}
                </tbody>
            </table>
        )
    }
}

class Note extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.notes.priority}</td>
                <td>{this.props.notes.title}</td>
                <td>{this.props.notes.content}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
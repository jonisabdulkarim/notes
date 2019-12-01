import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            notes: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/accounts")
        .then(res => res.json())
        .then((data) => {
            this.setState({ accounts: data._embedded.accounts })
        })
        .catch(console.log);

        fetch("http://localhost:8080/api/notes")
        .then(res => res.json())
        .then((data) => {
            this.setState({ notes: data._embedded.notes})
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
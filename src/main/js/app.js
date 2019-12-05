import React from 'react';
import ReactDOM from 'react-dom';
import { finished } from 'stream';

class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            accounts: [],
            notes: [],
            attributes: [],
            links: []
        };
        
        this.root = "/api";
        this.onCreate = this.onCreate.bind(this);
    }

    // TODO: check attributes for errors
    onCreate(newAccount) {
        var request = new Request(this.root + "/accounts", {
            method:'POST',
            body: newAccount,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                accounts: data._embedded.accounts,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: data._links
            })
        })
        .catch(console.log)
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
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
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

class CreateDialog extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newAccount = {};

        this.props.attributes.forEach(attribute => {
            newAccount[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newAccount);

        // clear old attributes
        this.props.attributes.forEach(attribute => {
            newAccount[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        window.location = '#';
    }

    render() {
        const inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
            </p>
        );

        return (
            <div>
                <a href="#createAccount">Create</a>

                <div id="createAccount" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new employee</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
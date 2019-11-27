class AccountData extends React.Component {
    render() {
        const accounts = this.props.accounts.map(account => 
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
class AccountData extends React.Component {
    render() {
        const accounts = this.props.accounts.map(accounts => 
            <Account key = {accounts._links.self.href} 
            employee = {employee} />
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
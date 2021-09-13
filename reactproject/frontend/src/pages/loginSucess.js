import '../App.css';

function LoginSucess({ userId, message }) {
    if ((userId === 0 || userId === null || userId === '') && (message === 0 || message === null || message === '')) {
        return (
            <div className="sucessMessage">
                <h2>
                    Welcome
                </h2>
            </div>
        );
    }
    else if (userId === 0) {
        return (
            <div className="errorMessage">
                <p> Login was not sucessful </p>
                {message}
            </div>
        );
    }
    else {
        return (
            <div className="sucessMessage">
                <p> Welcome {message}. </p>
                To delete a user <a href="/delete">click here</a>. <br />
                To change your password <a href="/password/">cilck here </a>

            </div>
        );
    }
}

export default LoginSucess;
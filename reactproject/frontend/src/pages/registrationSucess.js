import '../App.css';


function RegistrationSucess({ username, message, status }) {
    if ((username === 0 || username === null || username === '') && (message === 0 || message === null || message === '')) {
        return (
            <div className="sucessMessage">
                <h2> Welcome </h2>
            </div>
        );
    }
    else if (status === "error") {
        return (
            <div className="errorMessage">
               <p> Registration was not sucessful </p>
                {message}
            </div>
        );
    }
    else {
        return (
            <div className="sucessMessage">
                <h2>Welcome {username}</h2>
                <h4>Registration was sucessful</h4>
                
            </div>

        );
    }
}

export default RegistrationSucess;
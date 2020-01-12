import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';


const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (authUser) {
            this.props.firebase.user(authUser.uid)
              .once('value')
              .then(snapshot => {
                this.setState({ 
                  authUser: {
                    authUser: authUser,
                    username: snapshot.val().username,
                    org: snapshot.val().org,
                    role: snapshot.val().role
                  }
                })
              })
              .catch(error => console.error(error))
          } else {
            this.setState({ authUser: null })
          }
          // authUser
          //   ? this.setState({ authUser })
          //   : this.setState({ authUser: null });
        },
      );
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};


export default withAuthentication;
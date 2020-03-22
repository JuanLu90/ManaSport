// DEPENDENCES
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction } from "../redux/actions/tournamentActions";

const Management = props => {

  const { tournamentsByUserAction, user } = props;

  useEffect(() => {
    tournamentsByUserAction(user.id);
  })

  return (
    <div>
      MANAGEMENT
    </div>
  );
};

const mapStateToProps = state => {
  const { userReducer } = state;
  return {
    user: userReducer.user
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);

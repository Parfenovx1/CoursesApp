import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			return rest.user.role === 'admin' ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
					}}
				/>
			);
		}}
	/>
);

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, null)(PrivateRoute);

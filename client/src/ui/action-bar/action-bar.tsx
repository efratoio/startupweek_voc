import * as React from "react";
import { external, inject } from "tsdi";
import bind from "bind-decorator";
import { History } from "history";

import { routeAdd } from "routing";

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import ContentAddCircleOutlineIcon from 'material-ui/svg-icons/content/add-circle-outline';

@external
export class ActionBar extends React.Component {
	@inject private browserHistory: History;

	@bind
	private handleAdd() {
		this.browserHistory.push(routeAdd());
	}

	@bind
	private handleMenu() {

	}

	public render(): JSX.Element {
		return (
			<AppBar
				iconElementRight={<IconButton><ContentAddCircleOutlineIcon/></IconButton>}
				onRightIconButtonTouchTap={this.handleAdd}
				onLeftIconButtonTouchTap={this.handleMenu}
			/>
		);
	}
}
